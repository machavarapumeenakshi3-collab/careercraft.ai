
import React, { useState } from 'react';
import { Internship } from '../types';
import { Search, Filter, MapPin, DollarSign, Clock, CheckCircle2, Star } from 'lucide-react';

interface InternshipsPageProps {
  userSkills: string[];
}

const InternshipsPage: React.FC<InternshipsPageProps> = ({ userSkills }) => {
  const [filter, setFilter] = useState('All');

  const internships: Internship[] = [
    {
      id: '1',
      company: 'Google',
      role: 'STEP Intern 2024',
      domain: 'Web Development',
      type: 'Paid',
      location: 'Remote',
      duration: '3 Months',
      skillsRequired: ['Python', 'Data Structures', 'Algorithms'],
      matchScore: 85
    },
    {
      id: '2',
      company: 'Stripe',
      role: 'Software Engineering Intern',
      domain: 'Backend',
      type: 'Paid',
      location: 'Onsite',
      duration: '6 Months',
      skillsRequired: ['Ruby on Rails', 'PostgreSQL', 'System Design'],
      matchScore: 45
    },
    {
      id: '3',
      company: 'Vercel',
      role: 'Frontend Engineering Intern',
      domain: 'Web Development',
      type: 'Paid',
      location: 'Remote',
      duration: '4 Months',
      skillsRequired: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      matchScore: 95
    },
    {
      id: '4',
      company: 'Auth0',
      role: 'Identity Security Intern',
      domain: 'Cybersecurity',
      type: 'Paid',
      location: 'Remote',
      duration: '3 Months',
      skillsRequired: ['Security Basics', 'Node.js', 'OAuth'],
      matchScore: 20
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Internship Finder</h1>
          <p className="text-slate-500">Discover opportunities that match your current skill level.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-11 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium appearance-none"
            >
              <option>All Opportunities</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Remote</option>
              <option>Onsite</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internships.map((intern) => (
          <div key={intern.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                  <span className="text-xl font-black text-indigo-600">{intern.company[0]}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{intern.role}</h3>
                  <p className="text-indigo-600 font-medium">{intern.company}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Star size={12} fill="currentColor" /> {intern.matchScore}% Match
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={16} /> {intern.location}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <DollarSign size={16} /> {intern.type}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={16} /> {intern.duration}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {intern.skillsRequired.map((skill, idx) => {
                  const hasSkill = userSkills.includes(skill);
                  return (
                    <span 
                      key={idx} 
                      className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
                        hasSkill ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-600'
                      }`}
                    >
                      {hasSkill && <CheckCircle2 size={12} />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium italic">Posted 2 days ago</span>
              <button className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold transition-all">
                Quick Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipsPage;
