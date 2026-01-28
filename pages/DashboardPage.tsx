
import React from 'react';
import { ResumeAnalysis, SkillGapAnalysis, View } from '../types';
import { PieChart, BarChart2, TrendingUp, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface DashboardPageProps {
  userName: string;
  resumeData: ResumeAnalysis | null;
  skillGapData: SkillGapAnalysis | null;
  navigate: (view: View) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userName, resumeData, skillGapData, navigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Onward to Mastery, {userName}! 🚀</h1>
          <p className="text-slate-500">Your professional evolution is trending upward. Keep the momentum.</p>
        </div>
        <button 
          onClick={() => navigate('resume')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100"
        >
          Refine Profile <ChevronRight size={18} />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<PieChart className="text-indigo-600" />} 
          label="Profile Strength" 
          value={`${resumeData?.score || 0}%`} 
          desc="Overall resume effectiveness"
        />
        <StatCard 
          icon={<TrendingUp className="text-emerald-600" />} 
          label="Job Readiness" 
          value={`${skillGapData?.matchPercentage || 0}%`} 
          desc="Based on target role requirements"
        />
        <StatCard 
          icon={<BarChart2 className="text-purple-600" />} 
          label="Skills Missing" 
          value={skillGapData?.missingSkills.length || 0} 
          desc="Priority skills to acquire"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Sections */}
        <div className="space-y-6">
          {/* Current Skills Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 size={22} className="text-emerald-500" />
              Verified Core Competencies
            </h3>
            {resumeData ? (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.slice(0, 10).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">Analyze your resume to see extracted skills.</p>
            )}
            <button 
              onClick={() => navigate('resume')}
              className="mt-6 text-indigo-600 font-medium hover:underline flex items-center gap-1"
            >
              Explore detailed insights <ChevronRight size={16} />
            </button>
          </div>

          {/* Activity/History */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Chronicle of Progress</h3>
            <div className="space-y-4">
              <ActivityItem 
                title="Application Sent" 
                detail="Frontend Developer at TechNova" 
                time="2 hours ago" 
                type="app"
              />
              <ActivityItem 
                title="Skillset Expanded" 
                detail="Mastered 'React Native' via roadmap" 
                time="Yesterday" 
                type="skill"
              />
              <ActivityItem 
                title="AI Profile Audit" 
                detail="Domain: Web Development" 
                time="3 days ago" 
                type="doc"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Dashboard Content */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">The Next Frontier</h3>
              <p className="text-indigo-100 mb-6">You're just 3 technical milestones away from elite status in your field.</p>
              <button 
                onClick={() => navigate('roadmap')}
                className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                Launch Roadmap <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle size={22} className="text-amber-500" />
              High-Impact Gaps
            </h3>
            {skillGapData ? (
              <ul className="space-y-3">
                {skillGapData.prioritizedMissingSkills.filter(s => s.priority === 'High').slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-700">{item.skill}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded">Priority Alpha</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 italic">No gaps identified yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; desc: string }> = ({ icon, label, value, desc }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
    <div className="p-3 bg-slate-50 rounded-2xl">
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h4 className="text-3xl font-black text-slate-900 my-1">{value}</h4>
      <p className="text-slate-400 text-xs">{desc}</p>
    </div>
  </div>
);

const ActivityItem: React.FC<{ title: string; detail: string; time: string; type: string }> = ({ title, detail, time, type }) => (
  <div className="flex gap-4 p-2">
    <div className="w-1.5 h-auto rounded-full bg-slate-100 flex-shrink-0"></div>
    <div>
      <h5 className="font-bold text-slate-800 text-sm">{title}</h5>
      <p className="text-slate-500 text-sm">{detail}</p>
      <p className="text-slate-400 text-xs mt-1">{time}</p>
    </div>
  </div>
);

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default DashboardPage;
