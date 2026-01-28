
import React, { useState } from 'react';
import { convertJDToInterview } from '../services/gemini';
import { InterviewPrep } from '../types';
import { BookOpen, FileText, Sparkles, Loader2, ChevronRight, HelpCircle } from 'lucide-react';

const InterviewPrepPage: React.FC = () => {
  const [jdText, setJdText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prep, setPrep] = useState<InterviewPrep | null>(null);

  const handleGenerate = async () => {
    if (!jdText.trim()) return;
    setIsLoading(true);
    try {
      const result = await convertJDToInterview(jdText);
      setPrep(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-900">JD-to-Interview Converter</h1>
        <p className="text-slate-500">Paste a Job Description. Gemini generates role-specific interview questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Job Description</label>
              <textarea 
                className="w-full h-80 p-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-2 focus:ring-indigo-100 outline-none text-sm leading-relaxed resize-none"
                placeholder="Paste the full job requirements here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isLoading || !jdText.trim()}
              className="w-full bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-100"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              Convert to Prep Guide
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {prep ? (
            <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
              <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900">{prep.role} Prep</h3>
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">AI Curated</span>
                </div>

                <div className="space-y-4">
                  {prep.questions.map((q, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-indigo-600">
                          <HelpCircle size={20} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                              q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-600' : 
                              q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                              {q.difficulty}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Focus: {q.focus}</span>
                          </div>
                          <p className="text-slate-800 font-bold leading-relaxed">{q.question}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-[40px] border border-dashed border-slate-200 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                <BookOpen size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-400">Preparation Guide will appear here</h3>
              <p className="text-slate-400 max-w-xs text-sm">Fill in the job details on the left to see questions tailored to that specific role.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;
