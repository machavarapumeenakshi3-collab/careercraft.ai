
import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  CheckCircle, 
  Code2, 
  Rocket, 
  Save, 
  ChevronRight, 
  List, 
  BookOpen, 
  AlertCircle, 
  Info, 
  Loader2,
  Trash2,
  RefreshCcw
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  example: string;
  starterCode: string;
}

const PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
    starterCode: '// Two Sum\n// Time Complexity: O(n)\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}'
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and closed in the correct order.',
    example: 'Input: s = "()[]{}"\nOutput: true',
    starterCode: '// Valid Parentheses\nfunction isValid(s) {\n  const stack = [];\n  const pairs = { ")": "(", "}": "{", "]": "[" };\n  // Write logic here...\n}'
  },
  {
    id: '3',
    title: 'Array Median',
    difficulty: 'Medium',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    example: 'Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000',
    starterCode: '// Array Median\nfunction findMedianSortedArrays(nums1, nums2) {\n  // Optimized binary search approach\n}'
  },
  {
    id: '4',
    title: 'LRU Cache',
    difficulty: 'Hard',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put methods.',
    example: 'LRUCache(2); put(1, 1); put(2, 2); get(1); // 1; put(3, 3); get(2); // -1',
    starterCode: '// LRU Cache Implementation\nclass LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  \n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  \n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}'
  }
];

const SkillSandboxPage: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(PROBLEMS[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'list'>('desc');

  useEffect(() => {
    setCode(selectedProblem.starterCode);
    setIsSuccess(false);
  }, [selectedProblem]);

  const handleRun = () => {
    setIsRunning(true);
    setIsSuccess(false);
    // Simulate test suite analysis
    setTimeout(() => {
      setIsRunning(false);
      setIsSuccess(true);
    }, 1500);
  };

  const getDifficultyStyles = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Hard': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Terminal className="text-indigo-600" />
            Skill Sandbox
          </h1>
          <p className="text-slate-500">Live technical verification environments for recruiters.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCode(selectedProblem.starterCode)}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCcw size={16} /> Reset
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all disabled:bg-slate-300"
          >
            {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            {isRunning ? 'Analyzing Code...' : 'Submit Solution'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        {/* Sidebar: Problem Navigation & Info */}
        <div className="lg:col-span-4 bg-white rounded-[32px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'desc' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <BookOpen size={14} /> Problem Info
            </button>
            <button 
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'list' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={14} /> All Challenges
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'desc' ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900">{selectedProblem.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getDifficultyStyles(selectedProblem.difficulty)}`}>
                    {selectedProblem.difficulty}
                  </span>
                </div>
                
                <div className="space-y-6 text-sm leading-relaxed text-slate-600">
                  <div className="prose prose-slate">
                    <p>{selectedProblem.description}</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-xs">
                    <p className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <Info size={14} className="text-indigo-500" /> Example
                    </p>
                    <pre className="whitespace-pre-wrap text-slate-500">{selectedProblem.example}</pre>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Environment Constraints</h4>
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-xs">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                         <span>JavaScript Node.js v20.x runtime</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                         <span>Standard library only (no NPM)</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in duration-300">
                {PROBLEMS.map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => setSelectedProblem(prob)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between group transition-all ${
                      selectedProblem.id === prob.id 
                        ? 'bg-indigo-50 border-indigo-200' 
                        : 'bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <h4 className={`font-bold text-sm ${selectedProblem.id === prob.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {prob.title}
                      </h4>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${
                        prob.difficulty === 'Easy' ? 'text-emerald-500' :
                        prob.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform ${selectedProblem.id === prob.id ? 'text-indigo-500 translate-x-1' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
              <AlertCircle size={14} className="text-amber-500" />
              <span>Plagiarism detection active. Use original code only.</span>
            </div>
          </div>
        </div>

        {/* Editor & Results Area */}
        <div className="lg:col-span-8 flex flex-col bg-[#0d1117] rounded-[32px] shadow-2xl overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="h-4 w-px bg-slate-700 mx-1"></div>
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider flex items-center gap-2">
                <Code2 size={12} className="text-indigo-400" /> main.js
              </span>
            </div>
          </div>

          <div className="flex-1 relative">
            <textarea 
              className="absolute inset-0 w-full h-full p-8 bg-transparent text-[#e6edf3] font-mono text-sm outline-none resize-none leading-relaxed selection:bg-indigo-500/30"
              spellCheck={false}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          
          {/* Console Output Window */}
          <div className={`transition-all duration-500 ${isSuccess ? 'h-40' : 'h-16'} bg-[#0d1117] border-t border-slate-800`}>
            {!isSuccess && !isRunning && (
              <div className="h-full flex items-center px-8 text-slate-500 font-mono text-[11px] uppercase tracking-widest">
                <ChevronRight size={14} className="mr-2" /> Ready for execution...
              </div>
            )}
            
            {isRunning && (
              <div className="h-full flex items-center px-8 gap-3 animate-pulse">
                <Loader2 size={16} className="text-indigo-400 animate-spin" />
                <span className="text-indigo-300 font-mono text-xs">Analyzing algorithms and edge cases...</span>
              </div>
            )}

            {isSuccess && (
              <div className="h-full p-8 animate-in slide-in-from-bottom-5 bg-emerald-500/5">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle size={20} />
                      <span className="font-black text-sm uppercase tracking-wider">Solution Accepted</span>
                    </div>
                    <div className="flex gap-6 text-[11px] text-slate-500 font-mono">
                      <span>Runtime: <span className="text-slate-300">48ms</span></span>
                      <span>Memory: <span className="text-slate-300">32.1MB</span></span>
                      <span>Tests: <span className="text-slate-300">12/12 passed</span></span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                    <Rocket size={14} /> Final Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSandboxPage;
