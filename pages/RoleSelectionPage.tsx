
import React from 'react';
import { GraduationCap, Briefcase, ArrowLeft, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionPageProps {
  userName: string;
  onSelectRole: (role: UserRole) => void;
  onBack: () => void;
}

const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ userName, onSelectRole, onBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-4xl space-y-12 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors mb-4"
          >
            <ArrowLeft size={20} /> Back to Login
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Welcome, <span className="text-indigo-600">{userName}</span>!
          </h1>
          <p className="text-xl text-slate-500">How would you like to use CareerCraft AI today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard 
            icon={<GraduationCap size={48} />}
            title="I am a Student"
            description="I want to analyze my resume, find skill gaps, and land internships or jobs."
            onClick={() => onSelectRole('student')}
            color="bg-indigo-600"
          />
          <RoleCard 
            icon={<Briefcase size={48} />}
            title="I am a Recruiter"
            description="I want to post jobs and find high-quality candidates through bias-free AI analysis."
            onClick={() => onSelectRole('recruiter')}
            color="bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
};

const RoleCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; color: string }> = ({ icon, title, description, onClick, color }) => (
  <button 
    onClick={onClick}
    className="group bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all text-left flex flex-col items-start gap-6"
  >
    <div className={`w-20 h-20 ${color} text-white rounded-[24px] flex items-center justify-center transition-transform group-hover:scale-110`}>
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
    <div className="mt-auto flex items-center gap-2 font-bold text-indigo-600">
      Get Started <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
    </div>
  </button>
);

export default RoleSelectionPage;
