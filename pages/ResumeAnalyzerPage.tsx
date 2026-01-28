
import React, { useState } from 'react';
import { analyzeResume } from '../services/gemini';
import { ResumeAnalysis } from '../types';
import { Upload, FileText, CheckCircle2, XCircle, Lightbulb, Loader2, Sparkles } from 'lucide-react';

interface ResumeAnalyzerPageProps {
  onAnalyzed: (data: ResumeAnalysis) => void;
}

const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({ onAnalyzed }) => {
  const [resumeText, setResumeText] = useState('');
  const [domain, setDomain] = useState('Web Development');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsLoading(true);
    try {
      const analysis = await analyzeResume(resumeText, domain);
      setResult(analysis);
      onAnalyzed(analysis);
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-slate-900">Resume Intelligence</h1>
        <p className="text-slate-500">Upload your resume or paste your experience to get an instant AI evaluation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Select Domain</label>
              <select 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-medium"
              >
                <option>Web Development</option>
                <option>AI / Machine Learning</option>
                <option>Data Science</option>
                <option>Cybersecurity</option>
                <option>Mobile App Dev</option>
                <option>Cloud Architecture</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Experience Details</label>
              <textarea 
                placeholder="Paste your resume text here..."
                className="w-full h-80 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-sm leading-relaxed"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isLoading || !resumeText}
              className="w-full bg-indigo-600 disabled:bg-slate-300 hover:bg-indigo-700 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <ScoreCard label="Overall Score" score={result.score} color="text-indigo-600" />
                <ScoreCard label="ATS Readiness" score={result.atsScore} color="text-purple-600" />
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-500" />
                    Key Strengths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.strengths.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <XCircle size={20} className="text-rose-500" />
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {result.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0"></span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <Lightbulb size={20} className="text-indigo-600" />
                    Strategic Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-indigo-800 text-sm font-medium">
                        <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">{i+1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <FileText size={40} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-400">Analysis Results Will Appear Here</h3>
              <p className="text-slate-400 mt-2 max-w-xs">Fill in your resume details and click "Analyze" to see your score and insights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScoreCard: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
    <div className={`text-5xl font-black ${color}`}>{score}%</div>
    <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
      <div 
        className={`h-full bg-current ${color}`} 
        style={{ width: `${score}%` }}
      ></div>
    </div>
  </div>
);

export default ResumeAnalyzerPage;
