
import React from 'react';
import { View, UserRole } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  Zap, 
  Map, 
  Briefcase, 
  Mic, 
  BookOpen, 
  RefreshCw,
  LogOut,
  Flame,
  ListChecks
} from 'lucide-react';

interface SidebarProps {
  currentView: View;
  navigate: (view: View) => void;
  onSignOut: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, navigate, onSignOut, userRole }) => {
  const studentItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'resume', label: 'Resume Analyzer', icon: <FileText size={20} /> },
    { id: 'skillgap', label: 'Skill Gap Analysis', icon: <Zap size={20} /> },
    { id: 'roadmap', label: 'Learning Roadmap', icon: <Map size={20} /> },
    { id: 'voice-analyzer', label: 'Voice Confidence', icon: <Mic size={20} /> },
    { id: 'interview-prep', label: 'Interview Prep', icon: <BookOpen size={20} /> },
    { id: 'skill-sync', label: 'Unified Profile', icon: <RefreshCw size={20} /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={20} /> },
  ];

  const recruiterItems = [
    { id: 'recruiter', label: 'Talent Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'recruiter-heatmap', label: 'Talent Heatmap', icon: <Flame size={20} /> },
    { id: 'auto-shortlist', label: 'AI Shortlist', icon: <ListChecks size={20} /> },
    { id: 'interview-prep', label: 'JD-to-Interview', icon: <BookOpen size={20} /> },
  ];

  const currentMenuItems = userRole === 'recruiter' ? recruiterItems : studentItems;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">C</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">CareerCraft</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1">
        {currentMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id as View)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button onClick={onSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut size={20} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
