import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  FlaskConical, 
  Users, 
  HelpCircle,
  FileCheck2,
  Trash2,
  Bot
} from 'lucide-react';
import { Idea, DocumentType, GeneratedDocument } from '../types';
import { GeminiClient } from '../services/gemini';
import { StorageService } from '../services/storage';

interface DocumentHubProps {
  ideas: Idea[];
  initialIdea?: Idea;
}

const DOC_TYPES: { type: DocumentType; label: string; icon: any; desc: string }[] = [
  {
    type: 'prd',
    label: 'PRD (제품 요구사항 정의서)',
    icon: FileText,
    desc: '문제정의, 유저스토리, 상세 기능 사양, 비기능 요구사항, 안전 체크리스트'
  },
  {
    type: 'concept',
    label: '제품 콘셉트 원페이저 (One-Pager)',
    icon: BookOpen,
    desc: '투자자/팀 공유용 엘리베이터 피치, 핵심 차별점, 시장 포지셔닝'
  },
  {
    type: 'market_research',
    label: '시장 조사 및 경쟁 분석 보고서',
    icon: BarChart3,
    desc: '국내외 시장 가격대, 기존 제품의 고질적 불만 리뷰 분석, 차별화 기회'
  },
  {
    type: 'interview_script',
    label: '보호자 심층 인터뷰(IDI) 질문지',
    icon: Users,
    desc: '현재 대안의 고통점, 신규 제품 수용도, 가격 저항선 파악 질문 목록'
  },
  {
    type: 'survey_questions',
    label: '온라인 수요 검증 설문 문항지',
    icon: ClipboardList,
    desc: '10~15개 객관식/리커트 척도 문항, 가격 민감도 PSM 분석 문항 포함'
  },
  {
    type: 'prototype_test_plan',
    label: '시제품 테스트 & 가설 검증 계획서',
    icon: FlaskConical,
    desc: 'MVP 제작 스펙, 표본 15두 선정, 2주간 필드 테스트 프로토콜, 성공 지표'
  },
  {
    type: 'crowdfunding_story',
    label: '크라우드펀딩 스토리 (와디즈/텀블벅)',
    icon: Sparkles,
    desc: '후킹 카피, 보호자 공감 스토리라인, 제품 개발 비하인드, 얼리버드 리워드 패키지'
  }
];

export const DocumentHub: React.FC<DocumentHubProps> = ({ ideas, initialIdea }) => {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(initialIdea?.id || ideas[0]?.id || '');
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('prd');
  const [isGenerating, setIsGenerating] = useState(false);
  const [documents, setDocuments] = useState<GeneratedDocument[]>(() => StorageService.getDocuments());
  const [activeDocId, setActiveDocId] = useState<string | null>(documents[0]?.id || null);
  const [copied, setCopied] = useState(false);

  const selectedIdea = ideas.find((i) => i.id === selectedIdeaId) || ideas[0];
  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  const handleGenerate = async () => {
    if (!selectedIdea || isGenerating) return;
    setIsGenerating(true);

    try {
      const docTypeInfo = DOC_TYPES.find((d) => d.type === selectedDocType);
      const markdown = await GeminiClient.generateDocument(selectedIdea, selectedDocType);

      const newDoc: GeneratedDocument = {
        id: `doc-${Date.now()}`,
        idea_id: selectedIdea.id,
        idea_name: selectedIdea.name,
        doc_type: selectedDocType,
        title: `${selectedIdea.name} - ${docTypeInfo?.label || selectedDocType}`,
        markdown_content: markdown,
        created_at: new Date().toLocaleString()
      };

      StorageService.addDocument(newDoc);
      setDocuments((prev) => [newDoc, ...prev]);
      setActiveDocId(newDoc.id);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!activeDoc) return;
    navigator.clipboard.writeText(activeDoc.markdown_content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activeDoc) return;
    const blob = new Blob([activeDoc.markdown_content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeDoc.title.replace(/\s+/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (docId: string) => {
    const updated = documents.filter((d) => d.id !== docId);
    setDocuments(updated);
    StorageService.saveDocuments(updated);
    if (activeDocId === docId) {
      setActiveDocId(updated[0]?.id || null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & PRD Rule Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <FileCheck2 className="w-5 h-5 mr-2 text-indigo-600" />
              F-07 요청 시 문서 생성 허브 (On-Demand Document Hub)
            </h2>
            <p className="text-xs text-slate-600">
              📌 **포랩 원칙**: 대화 중 불필요한 문서를 자동 생성하지 않으며, 사용자가 원할 때 명시적으로 요청한 경우에만 체계적으로 작성합니다.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-indigo-800 border border-indigo-200">
            생성된 문서 {documents.length}건
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Generator Form (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
              신규 문서 생성 요청
            </h3>

            {/* Idea Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                대상 아이디어 선택 *
              </label>
              <select
                value={selectedIdeaId}
                onChange={(e) => setSelectedIdeaId(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
              >
                {ideas.map((idea) => (
                  <option key={idea.id} value={idea.id}>
                    {idea.name} ({idea.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Document Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                생성할 산출물 유형 *
              </label>
              <div className="space-y-2">
                {DOC_TYPES.map((doc) => {
                  const Icon = doc.icon;
                  const isSelected = selectedDocType === doc.type;
                  return (
                    <div
                      key={doc.type}
                      onClick={() => setSelectedDocType(doc.type)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/60 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                          {doc.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-6 leading-tight">
                        {doc.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedIdea}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center disabled:bg-slate-300"
            >
              <Bot className="w-4 h-4 mr-1.5" />
              {isGenerating ? 'Gemini 3.8 Flash가 문서를 작성 중...' : '문서 생성 시작하기'}
            </button>
          </div>

          {/* Stored Documents Sidebar List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>보관된 문서 목록 ({documents.length})</span>
            </h4>

            {documents.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 border border-dashed rounded-lg text-center">
                아직 생성된 문서가 없습니다. 위에서 문서를 생성해보세요!
              </p>
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {documents.map((doc) => {
                  const isActive = activeDocId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-indigo-400 bg-indigo-50/70 text-indigo-950 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2 line-clamp-1 pr-2">
                        <FileText className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        <span className="truncate">{doc.title}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded"
                        title="문서 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Markdown Document Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[600px] overflow-hidden">
          {activeDoc ? (
            <>
              {/* Document Header Controls */}
              <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {activeDoc.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    작성일: {activeDoc.created_at} · 아이디어: {activeDoc.idea_name}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        복사 완료!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        클립보드 복사
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    .md 다운로드
                  </button>
                </div>
              </div>

              {/* Document Content Viewer */}
              <div className="flex-1 p-6 overflow-y-auto font-sans text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4">
                <div className="whitespace-pre-wrap font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                  {activeDoc.markdown_content}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 text-slate-300 mb-3" />
              <h4 className="font-bold text-slate-700 text-sm">표시할 문서가 없습니다</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                좌측 패널에서 아이디어와 문서 양식을 선택한 후 '문서 생성 시작하기'를 눌러주세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
