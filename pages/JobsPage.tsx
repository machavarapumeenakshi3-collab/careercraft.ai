
import React from 'react';
import { Job } from '../types';
import { Search, Briefcase, MapPin, DollarSign, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

interface JobsPageProps {
  userSkills: string[];
}

const JobsPage: React.FC<JobsPageProps> = ({ userSkills }) => {
  const jobs: Job[] = [
    {
      id: '1',
      company: 'TechFlow Solutions',
      role: 'Senior React Developer',
      salary: '$120k - $150k',
      location: 'San Francisco (Hybrid)',
      status: 'Ready',
      skillsRequired: ['React', 'TypeScript', 'Node.js', 'AWS'],
      matchScore: 92
    },
    {
      id: '2',
      company: 'DataViz Inc',
      role: 'Fullstack Engineer',
      salary: '$100k - $130k',
      location: 'New York (Remote)',
      status: 'Almost Ready',
      skillsRequired: ['React', 'Python', 'Docker', 'PostgreSQL'],
      matchScore: 78
    },
    {
      id: '3',
      company: 'CyberGuard',
      role: 'Security Engineer',
      salary: '$110k - $140k',
      location: 'London (Onsite)',
      status: 'Needs Preparation',
      skillsRequired: ['Network Security', 'Pentesting', 'Go', 'Kubernetes'],
      matchScore: 35
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Career Matcher</h1>
          <p className="text-slate-500">Job matches prioritized by your technical competency.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search roles, companies..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium"
          />
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center gap-8 group">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl font-black text-slate-300 group-hover:text-indigo-600 transition-colors">
                  {job.company[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                  <div className="flex items-center gap-3 text-slate-500 text-sm mt-1">
                    <span className="font-semibold text-indigo-600">{job.company}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:w-80 flex flex-col md:flex-row items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-8">
              <div className="text-center md:text-left">
                <div className="text-3xl font-black text-indigo-600">{job.matchScore}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skill Match Score</div>
              </div>
              
              <div className="flex-1 space-y-2 w-full">
                <span className={`block w-full text-center py-2 rounded-xl text-xs font-bold uppercase tracking-widest border ${
                  job.status === 'Ready' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                  job.status === 'Almost Ready' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                  'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                  {job.status}
                </span>
                <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                  Apply Now <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-indigo-600 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl shadow-indigo-200">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-4">Want to unlock 15+ more matches?</h2>
          <p className="text-indigo-100 text-lg mb-8">Your profile is currently missing 3 "High Priority" skills that could double your visibility to recruiters.</p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            <Sparkles size={20} /> Improve My Readiness
          </button>
        </div>
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default JobsPage;
