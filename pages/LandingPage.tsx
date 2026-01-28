
import React from 'react';
import { FileText, Zap, GraduationCap, Briefcase, ArrowRight, ShieldCheck, PieChart, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onRecruiterLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onRecruiterLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl">C</div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            CareerCraft AI
          </span>
        </div>
        <button 
          onClick={onGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold tracking-tight">
            <Sparkles size={16} /> 
            AI-POWERED CAREER CATALYST
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-tight">
            CareerCraft <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">AI</span>
          </h1>
          <p className="text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The next generation professional intelligence platform. Fix your skill gaps, evaluate resumes, and find talent using bias-free AI.
          </p>
          <div className="pt-8">
            <button 
              onClick={onGetStarted}
              className="group relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white px-12 py-6 rounded-[32px] font-black text-2xl shadow-2xl shadow-indigo-200 transition-all hover:scale-105 mx-auto"
            >
              Get Started <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<FileText size={32} />}
            title="Resume Evaluation"
            description="Deep analysis of your professional experience with ATS optimization tips."
          />
          <FeatureCard 
            icon={<Zap size={32} />}
            title="Skill Gaps"
            description="Identify exactly what you're missing for your dream role and get roadmaps."
          />
          <FeatureCard 
            icon={<ShieldCheck size={32} />}
            title="Bias-Free Hiring"
            description="Recruiter tools designed to evaluate candidates purely on technical merit."
          />
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-slate-400 font-medium">
        <p>© 2024 CareerCraft AI. Building the future of work.</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center space-y-4">
    <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
