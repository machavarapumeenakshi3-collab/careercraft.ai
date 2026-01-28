
import React, { useState } from 'react';
import { User, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      onLogin(name);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl -z-10 opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100">
          <div className="text-center space-y-4 mb-10">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg text-white font-black text-2xl shadow-lg shadow-indigo-200 mb-2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
              onClick={onBack}
            >
              C
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">Forge Your Professional Destiny</h1>
            <p className="text-slate-500">Resume your evolution and bridge the gap to greatness.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white outline-none font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white outline-none font-medium transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white outline-none font-medium transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading || !name.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Enter Workspace <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
              <ShieldCheck size={16} className="text-emerald-500" />
              Secure, merit-based access
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-sm">
          New to CareerCraft? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Begin your odyssey</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
