import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import { IntroSection, RegulationsSection, GuidelinesSection } from './components/InfoSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <Analyzer />
        <RegulationsSection />
        <GuidelinesSection />
      </main>
      
      <footer className="bg-slate-950 py-10 border-t border-slate-900 text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-500 mb-4">
            AI Sentinel &copy; {new Date().getFullYear()} - 致力於打造安全的 AI 應用環境
          </p>
          <p className="text-slate-600 text-sm">
            免責聲明：本平台提供的風險分析僅供參考，不構成法律建議。
            <br/>
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;