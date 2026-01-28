
import React, { useState, useRef, useEffect } from 'react';
import { analyzeVoiceConfidence } from '../services/gemini';
import { VoiceAnalysis } from '../types';
import { Mic, Square, Loader2, Sparkles, AlertCircle, TrendingUp, Zap, Clock, Volume2 } from 'lucide-react';

const VoiceAnalyzerPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VoiceAnalysis | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Use standard webm/opus which Gemini handles well, or wav if browser supports
      const options = { mimeType: 'audio/webm' };
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsLoading(true);
          try {
            // We pass the base64 to our Gemini service
            const analysis = await analyzeVoiceConfidence(base64Audio);
            setResult(analysis);
          } catch (err) {
            console.error("Analysis Error:", err);
            alert("Speech analysis failed. Gemini might be busy. Please try a shorter clip.");
          } finally {
            setIsLoading(false);
          }
        };
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Microphone access denied or not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-900">Voice Confidence Analyzer</h1>
        <p className="text-slate-500 italic">"It's not just what you say, it's how you say it."</p>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm text-center space-y-8 relative overflow-hidden">
        {isRecording && (
          <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 animate-pulse"></div>
        )}

        {!result && !isLoading && (
          <div className="space-y-6">
            <div className={`w-36 h-36 mx-auto rounded-full flex items-center justify-center transition-all duration-500 relative ${isRecording ? 'bg-rose-500 scale-110 shadow-2xl shadow-rose-200' : 'bg-indigo-600 shadow-xl shadow-indigo-100'}`}>
              {isRecording ? (
                <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-20"></div>
              ) : null}
              <Mic className="text-white relative z-10" size={56} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">
                {isRecording ? `Recording... ${formatTime(timer)}` : 'Ready to Analyze?'}
              </h2>
              <p className="text-slate-500 max-w-sm mx-auto">
                {isRecording 
                  ? "Speak clearly. Try to avoid 'um', 'ah', and long pauses." 
                  : "Pick a common interview question and record your 30-60 second answer."}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`px-12 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                  isRecording 
                    ? 'bg-rose-100 text-rose-600 border border-rose-200 hover:bg-rose-200' 
                    : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95'
                }`}
              >
                {isRecording ? <><Square size={20} fill="currentColor" /> Stop Recording</> : <><Mic size={20} /> Start Recording</>}
              </button>
              
              {!isRecording && (
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Volume2 size={12} /> Requires microphone access
                </div>
              )}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="py-20 space-y-8">
            <div className="relative w-24 h-24 mx-auto">
              <Loader2 className="animate-spin text-indigo-600 w-full h-full" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Decoding Speech Patterns...</h3>
              <p className="text-slate-500 italic">"Gemini is analyzing your vocal cadence and linguistic fillers."</p>
            </div>
          </div>
        )}

        {result && (
          <div className="text-left space-y-8 animate-in zoom-in duration-500">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Vocal DNA Results</h3>
                <p className="text-sm text-slate-500">Based on your last recorded session</p>
              </div>
              <button 
                onClick={() => setResult(null)} 
                className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Record New Clip
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard 
                icon={<TrendingUp className="text-indigo-600" />} 
                label="Confidence Score" 
                value={`${result.confidenceScore}%`} 
                trend={result.confidenceScore > 80 ? 'Elite' : 'Improving'}
              />
              <MetricCard 
                icon={<Zap className="text-amber-500" />} 
                label="Filler Word Frequency" 
                value={result.fillerWordCount} 
                trend={result.fillerWordCount < 3 ? 'Minimal' : 'Significant'}
              />
              <MetricCard 
                icon={<Clock className="text-emerald-500" />} 
                label="Speech Pace" 
                value={result.speakingSpeed} 
                trend="Tempo"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <AlertCircle size={20} className="text-rose-500" /> Speech Observations
                </h4>
                <p className="text-slate-600 leading-relaxed italic">"{result.hesitationNotes}"</p>
              </div>
              <div className="bg-indigo-50/50 p-8 rounded-[32px] border border-indigo-100 space-y-4">
                <h4 className="font-bold text-indigo-900 flex items-center gap-2 text-lg">
                  <Sparkles size={20} className="text-indigo-600" /> Communication Strategy
                </h4>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="text-indigo-800 text-sm flex items-start gap-3 bg-white/50 p-3 rounded-xl border border-indigo-100/50">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; trend: string }> = ({ icon, label, value, trend }) => (
  <div className="bg-white p-6 rounded-3xl text-center border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">{icon}</div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-slate-900">{value}</p>
    <span className="inline-block mt-2 px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 rounded-full border border-slate-100 uppercase tracking-widest">
      {trend}
    </span>
  </div>
);

export default VoiceAnalyzerPage;
