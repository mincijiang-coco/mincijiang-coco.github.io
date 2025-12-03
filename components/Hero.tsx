import React from 'react';
import { SectionId } from '../types';
import { ChevronDown, Lock, Server, BrainCircuit, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToNext = () => {
    const element = document.getElementById(SectionId.INTRO);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 z-0"></div>
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-slate-300 font-medium">AI Security Analysis Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
          AI 賦能未來 <br className="hidden md:block" />
          <span className="text-brand-500">資安守護現在</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          在這個 AI 工具爆發的時代，您的數據安全嗎？<br/>
          我們提供專業且易懂的風險分析，協助您在享受便利的同時，建立堅固的資安防線。
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById(SectionId.ANALYZER)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all hover:scale-105 flex items-center gap-2"
          >
            <BrainCircuit className="w-5 h-5" />
            立即檢測風險
          </button>
          <button
            onClick={scrollToNext}
            className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 border border-slate-700 rounded-xl font-medium text-lg backdrop-blur-sm transition-all flex items-center gap-2"
          >
            <Lock className="w-5 h-5" />
            了解更多
          </button>
        </div>

        {/* Feature Icons */}
        <div className="mt-20 flex justify-center gap-12 text-slate-500">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-slate-800 rounded-full bg-opacity-50 border border-slate-700">
              <Lock className="w-6 h-6 text-brand-400" />
            </div>
            <span className="text-xs uppercase tracking-widest">Privacy</span>
          </div>
          <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-slate-800 rounded-full bg-opacity-50 border border-slate-700">
              <Server className="w-6 h-6 text-brand-400" />
            </div>
            <span className="text-xs uppercase tracking-widest">Compliance</span>
          </div>
          <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-slate-800 rounded-full bg-opacity-50 border border-slate-700">
              <ShieldCheck className="w-6 h-6 text-brand-400" />
            </div>
            <span className="text-xs uppercase tracking-widest">Security</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;