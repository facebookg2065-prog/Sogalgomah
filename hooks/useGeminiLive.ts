import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createBlob, decodeAudioData, decodeBase64ToUint8Array } from '../utils/audioUtils';

interface UseGeminiLiveProps {
  apiKey: string | undefined;
}

export const useGeminiLive = ({ apiKey }: UseGeminiLiveProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Audio Contexts
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  
  // Audio Processing
  const inputNodeRef = useRef<GainNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Playback queue
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Session
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsSpeaking(false);
    
    // Close media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    // Stop processor
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }

    // Stop source
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    // Stop all playing audio
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();

    // Close contexts
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    // Close session if possible (Live API doesn't expose explicit close on promise easily, but we drop ref)
    sessionPromiseRef.current = null;
  }, []);

  const start = useCallback(async () => {
    if (!apiKey) {
      setError("API Key is missing");
      return;
    }

    try {
      setIsActive(true);
      setError(null);

      // Initialize Audio Contexts
      // Input: 16kHz required for Gemini
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      // Output: 24kHz required for Gemini response
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      inputNodeRef.current = inputAudioContextRef.current.createGain();
      outputNodeRef.current = outputAudioContextRef.current.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current.destination);

      // Get Microphone Access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey });
      
      // Connect to Live API
      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Connected');
            if (!inputAudioContextRef.current || !stream) return;

            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current = source;

            // Process audio in chunks
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              if (!isActive) return; // Guard
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              
              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then((session: any) => {
                   session.sendRealtimeInput({ media: pcmBlob });
                });
              }
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
             
             if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                setIsSpeaking(true);
                const ctx = outputAudioContextRef.current;
                
                // Sync timing
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

                const audioBuffer = await decodeAudioData(
                    decodeBase64ToUint8Array(base64Audio),
                    ctx,
                    24000,
                    1
                );

                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                
                source.addEventListener('ended', () => {
                    sourcesRef.current.delete(source);
                    if (sourcesRef.current.size === 0) {
                        setIsSpeaking(false);
                    }
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
             }
             
             const interrupted = message.serverContent?.interrupted;
             if (interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setIsSpeaking(false);
             }
          },
          onclose: () => {
            console.log('Gemini Live Disconnected');
            stop();
          },
          onerror: (e) => {
            console.error('Gemini Live Error', e);
            setError("Connection error occurred.");
            stop();
          }
        },
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
            },
            systemInstruction: "You are a helpful assistant for 'Souq Al-Juma', an online marketplace in the Middle East. You speak Arabic and English. Help users find products, understand categories, and navigate the site. Be brief and friendly."
        }
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start audio session");
      stop();
    }
  }, [apiKey, isActive, stop]);

  return {
    isActive,
    isSpeaking,
    error,
    start,
    stop
  };
};
