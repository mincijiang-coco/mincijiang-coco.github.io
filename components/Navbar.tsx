import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { ShieldCheck, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: SectionId.INTRO, label: '風險導論' },
    { id: SectionId.ANALYZER, label: 'AI 風險檢測' },
    { id: SectionId.REGULATIONS, label: '關鍵法規' },
    { id: SectionId.GUIDELINES, label: '安全指南' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection(SectionId.HERO)}
        >
          <ShieldCheck className="w-8 h-8 text-brand-500 group-hover:text-accent-400 transition-colors" />
          <span className="text-xl font-bold tracking-wide">AI Sentinel</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-slate-300 hover:text-white hover:underline decoration-brand-500 decoration-2 underline-offset-4 transition-all text-sm font-medium tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-800 border-b border-slate-700 p-4 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-slate-300 hover:text-white py-2 px-4 rounded hover:bg-slate-700"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;