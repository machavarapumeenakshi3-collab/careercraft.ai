
import React, { useState, useEffect } from 'react';
import { View, ResumeAnalysis, SkillGapAnalysis, RoadmapStep, UserRole } from './types';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import JobsPage from './pages/JobsPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import RecruiterHeatmapPage from './pages/RecruiterHeatmapPage';
import AutoShortlistPage from './pages/AutoShortlistPage';
import AboutPage from './pages/AboutPage';
import VoiceAnalyzerPage from './pages/VoiceAnalyzerPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import SkillSyncPage from './pages/SkillSyncPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [resumeData, setResumeData] = useState<ResumeAnalysis | null>(null);
  const [skillGapData, setSkillGapData] = useState<SkillGapAnalysis | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapStep[] | null>(null);
  const [targetRole, setTargetRole] = useState<string>('Fullstack Developer');
  const [history, setHistory] = useState<View[]>(['home']);

  useEffect(() => {
    const saved = localStorage.getItem('career-craft-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserName(parsed.userName);
      setUserRole(parsed.userRole);
      setResumeData(parsed.resume);
      setSkillGapData(parsed.skillGap);
      setRoadmapData(parsed.roadmap);
      setTargetRole(parsed.targetRole || 'Fullstack Developer');
    }
  }, []);

  const saveAppData = (data: any) => {
    localStorage.setItem('career-craft-data', JSON.stringify({
      resume: resumeData,
      skillGap: skillGapData,
      roadmap: roadmapData,
      targetRole,
      userName,
      userRole,
      ...data
    }));
  };

  const navigate = (view: View) => {
    setHistory(prev => [...prev, currentView]);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevView = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentView(prevView);
    } else {
      setCurrentView('home');
    }
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    navigate('role-selection');
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'recruiter') navigate('recruiter');
    else navigate('dashboard');
  };

  const handleSignOut = () => {
    setUserName(null);
    setUserRole(null);
    localStorage.removeItem('career-craft-data');
    setHistory(['home']);
    navigate('home');
  };

  const renderContent = () => {
    if (currentView === 'home') return <LandingPage onGetStarted={() => navigate('login')} onRecruiterLogin={() => navigate('recruiter')} />;
    if (currentView === 'login') return <LoginPage onLogin={handleLogin} onBack={goBack} />;
    if (currentView === 'role-selection') return <RoleSelectionPage userName={userName || 'User'} onSelectRole={handleSelectRole} onBack={goBack} />;

    switch (currentView) {
      case 'dashboard': return <DashboardPage userName={userName || 'Alex'} resumeData={resumeData} skillGapData={skillGapData} navigate={navigate} />;
      case 'resume': return <ResumeAnalyzerPage onAnalyzed={(data) => { setResumeData(data); saveAppData({ resume: data }); }} />;
      case 'skillgap': return <SkillGapPage resumeData={resumeData} targetRole={targetRole} setTargetRole={setTargetRole} onAnalyzed={(data) => { setSkillGapData(data); saveAppData({ skillGap: data }); }} />;
      case 'roadmap': return <RoadmapPage skillGapData={skillGapData} targetRole={targetRole} onGenerated={(data) => { setRoadmapData(data); saveAppData({ roadmap: data }); }} existingRoadmap={roadmapData} />;
      case 'voice-analyzer': return <VoiceAnalyzerPage />;
      case 'interview-prep': return <InterviewPrepPage />;
      case 'skill-sync': return <SkillSyncPage />;
      case 'jobs': return <JobsPage userSkills={resumeData?.skills || []} />;
      case 'recruiter': return <RecruiterDashboardPage navigate={navigate} />;
      case 'recruiter-heatmap': return <RecruiterHeatmapPage />;
      case 'auto-shortlist': return <AutoShortlistPage />;
      case 'about': return <AboutPage />;
      default: return <LandingPage onGetStarted={() => navigate('login')} onRecruiterLogin={() => navigate('recruiter')} />;
    }
  };

  const isInitialFlow = ['home', 'login', 'role-selection'].includes(currentView);

  if (isInitialFlow) return renderContent();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentView={currentView} navigate={navigate} onSignOut={handleSignOut} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header navigate={navigate} userName={userName || 'Alex'} goBack={goBack} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
