
import { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createBlob, decodeAudioData, decodeBase64ToUint8Array } from '../utils/audioUtils';

export const useGeminiLive = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsSpeaking(false);
    if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(track => track.stop());
    if (scriptProcessorRef.current) scriptProcessorRef.current.disconnect();
    if (sourceRef.current) sourceRef.current.disconnect();
    sourcesRef.current.forEach(source => { try { source.stop(); } catch(e){} });
    sourcesRef.current.clear();
    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    sessionPromiseRef.current = null;
  }, []);

  const start = useCallback(async () => {
    // التأكد من اختيار مفتاح API في حال استخدام ميزات متقدمة
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
      // ملاحظة: بعد الاستدعاء نفترض النجاح حسب القواعد
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey && !window.aistudio) {
      setError("الرجاء إعداد مفتاح API_KEY في إعدادات Vercel");
      return;
    }

    try {
      setIsActive(true);
      setError(null);

      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // إنشاء مثيل جديد دائماً قبل الاتصال لضمان تحديث المفتاح من Vercel/AI Studio
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            if (!inputAudioContextRef.current || !stream) return;
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current = source;
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session: any) => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
             if (base64Audio && outputAudioContextRef.current) {
                setIsSpeaking(true);
                const ctx = outputAudioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                const audioBuffer = await decodeAudioData(decodeBase64ToUint8Array(base64Audio), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(ctx.destination);
                source.onended = () => {
                    sourcesRef.current.delete(source);
                    if (sourcesRef.current.size === 0) setIsSpeaking(false);
                };
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
             }
             if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setIsSpeaking(false);
             }
          },
          onclose: () => stop(),
          onerror: (e) => {
            console.error(e);
            if (e.message?.includes("Requested entity was not found")) {
                window.aistudio?.openSelectKey();
            }
            setError("حدث خطأ في الاتصال");
            stop();
          }
        },
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
            systemInstruction: "أنت مساعد ذكي لسوق الجمعة، مدعوم بواسطة PARON GROUP. ساعد المستخدمين في تصفح الموقع باللغة العربية."
        }
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (err: any) {
      setError(err.message || "فشل بدء الجلسة الصوتية");
      stop();
    }
  }, [stop]);

  return { isActive, isSpeaking, error, start, stop };
};
