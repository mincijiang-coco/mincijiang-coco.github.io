import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { RiskAnalysisResult, SectionId } from '../types';
import { AlertTriangle, CheckCircle, ShieldAlert, Loader2, Sparkles, Send } from 'lucide-react';

const Analyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    if (!process.env.API_KEY) {
      setError("API Key not found. Please configured the environment.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the cybersecurity risks for the following AI tool usage scenario: "${input}". 
        Focus on data privacy, intellectual property, and compliance (like GDPR).
        Provide a structured assessment suitable for a non-technical professional.`,
        config: {
          systemInstruction: "You are a friendly but professional senior cybersecurity consultant. Your goal is to help users understand the risks of using specific AI tools in their described context. Be encouraging but realistic.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskLevel: {
                type: Type.STRING,
                enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
                description: "The overall risk level of the scenario."
              },
              summary: {
                type: Type.STRING,
                description: "A 2-3 sentence summary of the analysis in Traditional Chinese."
              },
              threats: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "Title of the threat in Traditional Chinese" },
                    description: { type: Type.STRING, description: "Brief explanation in Traditional Chinese" }
                  }
                }
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "Actionable advice title in Traditional Chinese" },
                    action: { type: Type.STRING, description: "Specific steps to take in Traditional Chinese" }
                  }
                }
              }
            },
            required: ['riskLevel', 'summary', 'threats', 'recommendations']
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsedResult = JSON.parse(text) as RiskAnalysisResult;
        setResult(parsedResult);
      } else {
        throw new Error("No response generated.");
      }

    } catch (err) {
      console.error(err);
      setError("分析過程中發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <section id={SectionId.ANALYZER} className="py-24 bg-slate-900 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-brand-500" />
            AI 使用場景風險檢測
          </h2>
          <p className="text-slate-400">
            輸入您的使用情境（例如：「我使用 ChatGPT 整理包含客戶姓名的會議記錄」），
            <br className="hidden md:block"/>
            AI 顧問將即時為您分析潛在資安隱患。
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl mb-10 transition-all focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500">
          <label htmlFor="scenario-input" className="block text-sm font-medium text-slate-300 mb-2">
            描述您的使用情境
          </label>
          <textarea
            id="scenario-input"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900 min-h-[120px] resize-none"
            placeholder="請輸入... (範例：我打算用線上 AI 修圖工具處理公司內部產品原型的照片)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  開始檢測
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-300 mb-8 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="animate-float" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className={`p-6 rounded-2xl border ${getRiskColor(result.riskLevel)} mb-8`}>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <ShieldAlert className="w-8 h-8" />
                  風險等級：{result.riskLevel}
                </h3>
                <span className="text-sm opacity-80 border border-current px-3 py-1 rounded-full">AI 生成報告</span>
              </div>
              <p className="text-lg leading-relaxed opacity-90">{result.summary}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Threats */}
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  潛在威脅
                </h4>
                <div className="space-y-4">
                  {result.threats.map((threat, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-orange-500/50">
                      <h5 className="font-bold text-slate-200 mb-1">{threat.title}</h5>
                      <p className="text-sm text-slate-400">{threat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  防護建議
                </h4>
                <div className="space-y-4">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-emerald-500/50">
                      <h5 className="font-bold text-slate-200 mb-1">{rec.title}</h5>
                      <p className="text-sm text-slate-400">{rec.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Analyzer;