
import React from 'react';
import { ShieldCheck, Zap, Heart, Code2, Users, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Mission Driven AI</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          CareerCraft AI was built to democratize professional growth by turning the "Black Box" of hiring into a transparent roadmap for students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Rocket size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">The Problem</h3>
          <p className="text-slate-600 leading-relaxed">
            Most students don't know why they're getting rejected. They have the "General" skills but miss the "Specific" industry needs. We bridge this gap using Generative AI.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">The AI Ethics</h3>
          <p className="text-slate-600 leading-relaxed">
            We prioritize skills over stickers. Our AI analyzes technical DNA and merit, offering a Bias-Free mode for recruiters to ensure equality.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 p-12 rounded-[40px] text-white">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Zap className="text-amber-400" />
          Platform Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="mt-1"><Code2 className="text-indigo-400" /></div>
            <div>
              <h4 className="font-bold text-lg">Skill-First Matching</h4>
              <p className="text-slate-400 text-sm">We don't look at GPA. We look at Git repos, projects, and specific tech stack competencies.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mt-1"><Users className="text-indigo-400" /></div>
            <div>
              <h4 className="font-bold text-lg">Guided Mentorship</h4>
              <p className="text-slate-400 text-sm">Every gap we find is accompanied by a solution. No student is left without a path forward.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mt-1"><Heart className="text-indigo-400" /></div>
            <div>
              <h4 className="font-bold text-lg">User Privacy</h4>
              <p className="text-slate-400 text-sm">Data is used only for analysis. We believe your career data belongs to you.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mt-1"><Rocket className="text-indigo-400" /></div>
            <div>
              <h4 className="font-bold text-lg">Future Scale</h4>
              <p className="text-slate-400 text-sm">Currently supporting Tech domains, scaling to Design, Marketing and Finance soon.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-slate-100">
        <p className="text-slate-400 italic">Built with ❤️ for the Hackathon 2024</p>
      </div>
    </div>
  );
};

export default AboutPage;
