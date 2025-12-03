import React from 'react';
import { SectionId } from '../types';
import { Shield, Lock, FileText, Globe, BookOpen, AlertTriangle, Coins, Stethoscope, Fingerprint, ListChecks, X, Check, Eye, GraduationCap, ArrowRight, Settings, Users, Calculator, FileSearch, Crown } from 'lucide-react';

export const IntroSection: React.FC = () => (
  <section id={SectionId.INTRO} className="py-20 bg-slate-800">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">為什麼 AI 資安不容忽視？</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          隨著生成式 AI 的普及，企業與個人在享受效率提升的同時，也面臨著前所未有的數據洩漏風險。
          不當的 Prompt 輸入可能導致機密外流，而使用不合規的工具則可能觸犯國際法規。
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Lock className="w-8 h-8 text-blue-400" />,
            title: "數據隱私洩漏",
            desc: "將客戶個資或公司機密輸入到公開的 AI 模型中，可能導致資料被用於模型訓練而公開。"
          },
          {
            icon: <Shield className="w-8 h-8 text-purple-400" />,
            title: "惡意內容生成",
            desc: "攻擊者可能利用 AI 生成釣魚郵件或惡意程式碼，降低了網路攻擊的門檻。"
          },
          {
            icon: <FileText className="w-8 h-8 text-rose-400" />,
            title: "合規性風險",
            desc: "GDPR 與歐盟 AI 法案對數據處理有嚴格規範，違規可能面臨巨額罰款。"
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-700/50 p-8 rounded-2xl hover:bg-slate-700 transition-colors border border-slate-600/50">
            <div className="mb-4 p-3 bg-slate-800 rounded-xl w-fit">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const RegulationsSection: React.FC = () => {
  type CertStatus = 'pass' | 'warn' | 'fail';
  
  interface Cert {
    name: string;
    status: CertStatus;
    label?: string; // Additional text like (僅企業版)
  }

  interface Tool {
    name: string;
    color: string;
    bg: string;
    certs: Cert[];
    risks: string;
    prevention: string;
    note?: string; // For adding specific definitions like for Gemini Workspace
  }

  // Helper to standardise the order: GDPR -> HIPAA -> SOC 2 -> ISO 27001
  // Logic: 
  // 'pass' (Green): Available in Free/General version OR special user request (Gemini HIPAA).
  // 'warn' (Yellow): Only available in Enterprise/Paid versions.
  // 'fail' (Red/Grey): Not available.
  const tools: Tool[] = [
    {
      name: "Microsoft Copilot",
      color: "border-blue-500",
      bg: "bg-blue-900/10",
      certs: [
        { name: "GDPR", status: "pass" },
        { name: "HIPAA", status: "warn", label: "(僅企業版)" },
        { name: "SOC 2", status: "warn", label: "(僅企業版)" },
        { name: "ISO 27001", status: "warn", label: "(僅企業版)" }
      ],
      risks: "與 Microsoft 365 深度整合，若企業內部權限(ACL)設定混亂，員工可能透過 AI 搜尋到不該看到的薪資或人事檔案。",
      prevention: "實施嚴格的零信任架構與 RBAC (角色存取控制)，定期審查 Sharepoint/OneDrive 權限。"
    },
    {
      name: "ChatGPT",
      color: "border-emerald-500",
      bg: "bg-emerald-900/10",
      certs: [
        { name: "GDPR", status: "pass" },
        { name: "HIPAA", status: "warn", label: "(僅企業版)" },
        { name: "SOC 2", status: "warn", label: "(僅企業版)" },
        { name: "ISO 27001", status: "warn", label: "(僅企業版)" }
      ],
      risks: "Free/Plus 版本預設會將對話用於模型訓練。員工若上傳程式碼或個資，可能發生類似三星的資料外洩事件。",
      prevention: "企業應強制使用 Team 或 Enterprise 版，或在個人設定中關閉「訓練模型」選項。"
    },
    {
      name: "Claude (Anthropic)",
      color: "border-orange-500",
      bg: "bg-orange-900/10",
      certs: [
        { name: "GDPR", status: "pass" },
        { name: "HIPAA", status: "warn", label: "(僅企業版)" },
        { name: "SOC 2", status: "warn", label: "(僅企業版)" },
        { name: "ISO 27001", status: "fail" }
      ],
      risks: "擁有超長 Context Window，使用者容易一次性貼入整份機密合約或大量客戶資料，增加了單次外洩的規模風險。",
      prevention: "導入 DLP (資料遺失防護) 系統，偵測並攔截包含敏感關鍵字的大量文字貼上行為。"
    },
    {
      name: "Gemini",
      color: "border-sky-500",
      bg: "bg-sky-900/10",
      certs: [
        { name: "GDPR", status: "pass" },
        // User requested Green for Gemini HIPAA, but with a note about Enterprise being stricter.
        { name: "HIPAA", status: "pass", label: "(企業版更嚴謹)" },
        { name: "SOC 2", status: "warn", label: "(僅工作區版)" },
        { name: "ISO 27001", status: "warn", label: "(僅工作區版)" }
      ],
      note: "註：工作區版是指企業付費訂閱的 Gemini Business 或 Gemini Enterprise，或透過 Google Cloud (Vertex AI) 呼叫的 API。",
      risks: "Gemini for Workspace 的擴充功能可能過度存取 Drive 或 Gmail 資料；免費版消費端資料可能被人工審查。",
      prevention: "透過 Google Admin Console 限制 AI 存取範圍，並關閉不必要的第三方擴充功能 (Extensions)。"
    },
    {
      name: "Notion AI",
      color: "border-slate-400",
      bg: "bg-slate-700/30",
      certs: [
        { name: "GDPR", status: "pass" },
        { name: "HIPAA", status: "warn", label: "(僅企業版)" },
        { name: "SOC 2", status: "pass", label: "(Type 2)" },
        { name: "ISO 27001", status: "pass" }
      ],
      risks: "Notion 常作為知識庫，AI 功能會自動索引所有頁面。若將敏感資料區隔不當，容易被無權限者透過問答獲取。",
      prevention: "將敏感資料區隔在獨立的 Teamspace，並設定嚴格的頁面級別權限，避免全域 AI 索引。"
    },
    {
      name: "豆包 (Doubao)",
      color: "border-red-500",
      bg: "bg-red-900/10",
      certs: [
        { name: "中國生成式AI備案", status: "pass" },
        { name: "GDPR", status: "fail" },
        { name: "HIPAA", status: "fail" },
        { name: "SOC 2", status: "fail" },
        { name: "ISO 27001", status: "fail" }
      ],
      risks: "資料儲存與審查機制符合中國法規，對於跨國企業存在資料跨境傳輸合規風險 (Data Residency)。",
      prevention: "僅用於生成非敏感、非商業機密的一般性中文內容；嚴禁輸入歐美客戶個資或研發機密。"
    }
  ];

  return (
    <section id={SectionId.REGULATIONS} className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Globe className="w-10 h-10 text-brand-500" />
            關鍵法規與工具分析
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            以「一般免費使用」為基準進行分析。
            <br className="hidden md:inline"/>
            <span className="text-amber-400 font-bold mx-1">黃色標示</span>代表該合規性僅存在於付費/企業版中，個人版使用者需特別注意風險。
          </p>
        </div>

        {/* Industry Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            {
              icon: <Stethoscope className="w-6 h-6" />,
              title: "醫療業",
              desc: "必須選擇支援 HIPAA 的工具，如 Microsoft Copilot 或 Claude Enterprise。",
              color: "text-rose-400 bg-rose-900/20 border-rose-500/30"
            },
            {
              icon: <Coins className="w-6 h-6" />,
              title: "金融業",
              desc: "需要 SOC 2 Type 2 認證，並要求嚴格的資料加密與完整審計日誌。",
              color: "text-amber-400 bg-amber-900/20 border-amber-500/30"
            },
            {
              icon: <Fingerprint className="w-6 h-6" />,
              title: "歐盟客戶",
              desc: "確保工具符合 GDPR，並特別注意資料儲存地點 (Data Residency) 需在歐盟境內。",
              color: "text-blue-400 bg-blue-900/20 border-blue-500/30"
            },
            {
              icon: <GraduationCap className="w-6 h-6" />,
              title: "教育機構",
              desc: "需考慮 FERPA 與兒童隱私保護 (COPPA)，避免學生個資被採集用於模型訓練。",
              color: "text-emerald-400 bg-emerald-900/20 border-emerald-500/30"
            }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${item.color} flex flex-col gap-3 transition-transform hover:-translate-y-1`}>
              <div className="flex items-center gap-2 font-bold text-slate-200">
                {item.icon} {item.title}
              </div>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Tool Analysis Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <div key={idx} className={`group relative rounded-2xl p-6 border-t-4 bg-slate-800 hover:bg-slate-750 transition-all hover:shadow-2xl ${tool.color}`}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                
                {/* Certifications Matrix */}
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {tool.certs.map((cert, i) => {
                      // Style logic based on status
                      let styleClass = "";
                      let Icon = Check;
                      
                      if (cert.status === 'pass') {
                        styleClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                        Icon = Check;
                      } else if (cert.status === 'warn') {
                        // Warn means "Exists but only in Paid/Ent version" - hence Yellow
                        styleClass = "bg-amber-500/10 text-amber-400 border-amber-500/30";
                        Icon = Crown; // Use Crown to denote Premium requirement
                      } else {
                        styleClass = "bg-slate-700/50 text-slate-500 border-slate-600";
                        Icon = X;
                      }

                      return (
                        <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border ${styleClass}`}>
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            {cert.name}
                            {cert.label && <span className="opacity-80 ml-1">{cert.label}</span>}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  {tool.note && (
                    <p className="mt-3 text-xs text-slate-400 border-l-2 border-slate-600 pl-2 leading-relaxed">
                      {tool.note}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-1 text-orange-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3 h-3" /> 主要安全風險
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{tool.risks}</p>
                </div>

                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                   <div className="flex items-center gap-2 mb-1 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Shield className="w-3 h-3" /> 預防措施
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{tool.prevention}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GuidelinesSection: React.FC = () => (
  <section id={SectionId.GUIDELINES} className="py-24 bg-slate-800">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
        <BookOpen className="w-10 h-10 text-brand-500" />
        新手安全落地指南
      </h2>

      <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        
        {/* Left Column: Merged Steps */}
        <div className="lg:col-span-7">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <ListChecks className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">AI 安全導入五步驟</h3>
          </div>

          <div className="relative space-y-8 pl-4">
            {/* Connecting Line */}
            <div className="absolute top-6 left-[29px] bottom-6 w-0.5 bg-slate-700"></div>

            {[
              {
                icon: <FileSearch className="w-5 h-5" />,
                title: "1. 評估資料與法規需求",
                desc: "確認將處理的資料類型 (PII/商業機密) 及所屬產業法規 (如醫療需 HIPAA、歐盟需 GDPR)。這決定了您能選用哪些工具。",
                color: "bg-blue-500"
              },
              {
                icon: <Calculator className="w-5 h-5" />,
                title: "2. 估算總擁有成本 (TCO)",
                desc: "除軟體訂閱費外，務必納入「人工審核 (Human-in-the-loop)」的人力成本與資安維護費用。",
                color: "bg-indigo-500"
              },
              {
                icon: <Settings className="w-5 h-5" />,
                title: "3. 配置隱私設定 (Opt-out)",
                desc: "在工具後台關閉「使用我的數據進行模型訓練」。企業版應強制實施此策略，確保資料不被反饋至模型。",
                color: "bg-amber-500"
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: "4. 數據脫敏處理 (Data Anonymization)",
                desc: "在使用任何公有 AI 前，移除所有可識別個資 (姓名/證號)。使用代號替換真實名稱，這是最有效的防護。",
                color: "bg-emerald-500"
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "5. 建立監控與審核機制",
                desc: "永遠不要直接信任 AI 產出。建立標準作業程序 (SOP)，要求所有 AI 生成內容必須經過人工複查與驗證。",
                color: "bg-rose-500"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative flex gap-4 group">
                {/* Node */}
                <div className={`w-8 h-8 rounded-full border-4 border-slate-800 ${step.color} flex items-center justify-center shrink-0 z-10 shadow-lg`}>
                   <div className="text-white transform scale-75">{step.icon}</div>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-slate-900/50 p-5 rounded-xl border border-slate-700/50 hover:border-slate-500/50 transition-colors">
                  <h4 className="text-lg font-bold text-slate-200 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Real Cases */}
        <div className="lg:col-span-5">
           <div className="sticky top-24">
             <div className="mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">真實資安事件警示</h3>
             </div>

             <div className="space-y-6">
                {/* Case 1 */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-red-900/50 shadow-lg group hover:border-red-500/50 transition-colors">
                   <div className="bg-gradient-to-r from-red-950 to-slate-900 px-5 py-3 border-b border-red-900/30 flex justify-between items-center">
                      <span className="text-red-400 text-xs font-bold uppercase flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> 社交工程詐騙
                      </span>
                      <span className="text-slate-500 text-xs font-mono">2025/07 | 新加坡</span>
                   </div>
                   <div className="p-5">
                      <h4 className="text-lg font-bold text-slate-200 mb-3 group-hover:text-white">Deepfake 變臉詐騙 50 萬鎂</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        駭客利用 Deepfake 技術複製 CEO 的臉部與聲音，假裝召開線上 Zoom 會議。透過權威性的語氣與緊急的社交工程話術，成功騙過財務主管，使其在會議後將近 50 萬美元匯入駭客帳戶。
                      </p>
                      <div className="bg-slate-950/50 p-3 rounded-lg text-xs text-slate-300 border-l-2 border-red-500">
                        <strong className="block text-red-400 mb-1">💡 教訓：</strong>
                        涉及金流操作時，必須透過第二管道（如內部簽核系統或回撥電話）進行雙重驗證 (OOB)，不可僅依賴視訊指令。
                      </div>
                   </div>
                </div>

                {/* Case 2 */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-orange-900/50 shadow-lg group hover:border-orange-500/50 transition-colors">
                   <div className="bg-gradient-to-r from-orange-950 to-slate-900 px-5 py-3 border-b border-orange-900/30 flex justify-between items-center">
                      <span className="text-orange-400 text-xs font-bold uppercase flex items-center gap-1.5">
                        <FileSearch className="w-3.5 h-3.5" /> 內部資料外洩
                      </span>
                      <span className="text-slate-500 text-xs font-mono">企業內部疏失</span>
                   </div>
                   <div className="p-5">
                      <h4 className="text-lg font-bold text-slate-200 mb-3 group-hover:text-white">ChatGPT 程式碼洩漏事件</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        某公司員工將內部核心程式碼上傳至 ChatGPT 公開版求助除錯。由於未關閉訓練設定，該段機密程式碼被納入模型資料庫，隨後在其他外部用戶詢問相關技術問題時，被 AI 意外洩漏出來。
                      </p>
                      <div className="bg-slate-950/50 p-3 rounded-lg text-xs text-slate-300 border-l-2 border-orange-500">
                        <strong className="block text-orange-400 mb-1">💡 教訓：</strong>
                        嚴禁將 Proprietary Code 貼入公有 AI 服務。應建立內網專屬的 AI Gateway，或採購保證不訓練資料的 Enterprise 版本。
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  </section>
);