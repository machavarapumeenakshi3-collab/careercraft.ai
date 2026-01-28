
import React from 'react';
import { Bell, Search, UserCircle, ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  navigate: (view: View) => void;
  userName: string;
  goBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigate, userName, goBack }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-6">
        <button 
          onClick={goBack}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 font-bold text-sm"
          title="Go Back"
        >
          <ArrowLeft size={18} /> <span className="hidden md:inline">Back</span>
        </button>

        <div className="hidden lg:flex items-center bg-slate-50 rounded-full px-4 py-1.5 w-80 border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search skills, jobs..." 
            className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <button 
          className="flex items-center gap-2 p-1 pl-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full transition-all"
          onClick={() => navigate('about')}
        >
          <span className="text-sm font-medium">{userName}</span>
          <UserCircle size={28} />
        </button>
      </div>
    </header>
  );
};

export default Header;
