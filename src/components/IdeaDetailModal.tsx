import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Trash2, 
  Plus, 
  Check, 
  ExternalLink, 
  Sparkles, 
  MessageSquareQuote, 
  AlertTriangle,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Idea, IdeaStatus, ResearchSource, SafetyCheckItem } from '../types';
import { CATEGORY_LABELS, STATUS_LABELS, CONFIDENCE_BADGES } from '../data/seedData';

interface IdeaDetailModalProps {
  idea: Idea;
  onClose: () => void;
  onUpdateIdea: (updated: Idea) => void;
  onDeleteIdea: (id: string) => void;
  onGenerateDocForIdea: (idea: Idea) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  idea,
  onClose,
  onUpdateIdea,
  onDeleteIdea,
  onGenerateDocForIdea,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'competitors' | 'safety' | 'scores' | 'notes'>('overview');
  const [currentIdea, setCurrentIdea] = useState<Idea>(idea);
  const [newNote, setNewNote] = useState('');
  const [newAssumption, setNewAssumption] = useState('');

  const catInfo = CATEGORY_LABELS[currentIdea.category] || { label: currentIdea.category };
  const statusInfo = STATUS_LABELS[currentIdea.status];

  const handleStatusChange = (newStatus: IdeaStatus) => {
    const updated = { ...currentIdea, status: newStatus, updated_at: new Date().toISOString() };
    setCurrentIdea(updated);
    onUpdateIdea(updated);
  };

  const handleToggleSafetyCheck = (riskId: string) => {
    const updatedRisks = currentIdea.risks.map((r) =>
      r.id === riskId ? { ...r, checked: !r.checked } : r
    );
    const updated = { ...currentIdea, risks: updatedRisks, updated_at: new Date().toISOString() };
    setCurrentIdea(updated);
    onUpdateIdea(updated);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const noteObj = {
      id: Date.now().toString(),
      author: '기획팀',
      content: newNote.trim(),
      createdAt: new Date().toLocaleString()
    };
    const updated = {
      ...currentIdea,
      notes: [...(currentIdea.notes || []), noteObj],
      updated_at: new Date().toISOString()
    };
    setCurrentIdea(updated);
    onUpdateIdea(updated);
    setNewNote('');
  };

  const handleAddAssumption = () => {
    if (!newAssumption.trim()) return;
    const updated = {
      ...currentIdea,
      assumptions: [...(currentIdea.assumptions || []), newAssumption.trim()],
      updated_at: new Date().toISOString()
    };
    setCurrentIdea(updated);
    onUpdateIdea(updated);
    setNewAssumption('');
  };

  const handleScoreChange = (key: keyof Idea['scores'], val: number) => {
    const updated = {
      ...currentIdea,
      scores: { ...currentIdea.scores, [key]: val },
      updated_at: new Date().toISOString()
    };
    setCurrentIdea(updated);
    onUpdateIdea(updated);
  };

  const avgScore = (
    Object.values(currentIdea.scores || {}).reduce((s, v) => s + v, 0) / 8
  ).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-semibold">
                {catInfo.label}
              </span>
              <select
                value={currentIdea.status}
                onChange={(e) => handleStatusChange(e.target.value as IdeaStatus)}
                className={`text-xs px-2.5 py-1 rounded-full font-bold border ${statusInfo.border} ${statusInfo.bg} ${statusInfo.color} focus:outline-none`}
              >
                {Object.entries(STATUS_LABELS).map(([st, sInfo]) => (
                  <option key={st} value={st}>
                    ● {sInfo.label}
                  </option>
                ))}
              </select>
              <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ★ 평가 점수 {avgScore} / 10
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentIdea.name}
            </h2>
            <p className="text-xs text-slate-500">
              {currentIdea.summary}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            <button
              onClick={() => onGenerateDocForIdea(currentIdea)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5 mr-1" />
              문서 생성
            </button>
            <button
              onClick={() => onDeleteIdea(currentIdea.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="아이디어 삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-4 sm:px-6 bg-white overflow-x-auto">
          {[
            { id: 'overview', label: '개요 & 가설' },
            { id: 'competitors', label: `경쟁 제품 & 출처 (${currentIdea.competitors?.length || 0})` },
            { id: 'safety', label: `안전성 검토 (${currentIdea.risks?.filter(r => r.checked).length || 0}/${currentIdea.risks?.length || 0})` },
            { id: 'scores', label: '8대 평가 지표' },
            { id: 'notes', label: `결정 기록 & 메모 (${currentIdea.notes?.length || 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Problem Definition */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-rose-900 flex items-center mb-1.5">
                  <AlertTriangle className="w-4 h-4 mr-1 text-rose-600" />
                  해결하려는 실제 고통점 (Pain Point)
                </h4>
                <p className="text-xs text-rose-950 leading-relaxed">
                  {currentIdea.problem}
                </p>
              </div>

              {/* Target & Dual Value Proposition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center mb-1.5">
                    🐕 강아지 관점 사용 경험 & 효용 [가설]
                  </h4>
                  <p className="text-xs text-amber-950 leading-relaxed mb-3">
                    {currentIdea.dog_benefit_hypothesis}
                  </p>
                  <div className="text-[11px] text-amber-800 bg-white/70 p-2 rounded-lg border border-amber-200/60">
                    <span className="font-semibold">타깃 반려견: </span>
                    {currentIdea.target_users?.dog}
                  </div>
                </div>

                <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-blue-900 flex items-center mb-1.5">
                    👤 보호자 관점 구매 가치 & 편의 [가설]
                  </h4>
                  <p className="text-xs text-blue-950 leading-relaxed mb-3">
                    {currentIdea.owner_value_hypothesis}
                  </p>
                  <div className="text-[11px] text-blue-800 bg-white/70 p-2 rounded-lg border border-blue-200/60">
                    <span className="font-semibold">타깃 보호자: </span>
                    {currentIdea.target_users?.owner}
                  </div>
                </div>
              </div>

              {/* Use Scenario */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1.5">주요 사용 시나리오</h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
                  {currentIdea.use_scenario}
                </div>
              </div>

              {/* Key Features & Differentiation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">핵심 기능 목록</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {currentIdea.key_features?.map((f, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">기존 대안 대비 차별점</h4>
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
                    {currentIdea.differentiation}
                  </div>
                </div>
              </div>

              {/* Unverified Assumptions & Validation Plans */}
              <div className="border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center">
                    <HelpCircle className="w-4 h-4 mr-1 text-indigo-500" />
                    검증해야 할 핵심 가정 (Assumptions)
                  </h4>
                </div>

                <div className="space-y-2 mb-3">
                  {currentIdea.assumptions?.map((assump, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between bg-indigo-50/50 border border-indigo-200/70 p-2.5 rounded-lg text-xs text-indigo-950"
                    >
                      <span className="flex items-start">
                        <span className="font-bold mr-1.5 text-indigo-600">[가설 {idx + 1}]</span>
                        {assump}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Assumption input */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newAssumption}
                    onChange={(e) => setNewAssumption(e.target.value)}
                    placeholder="새로운 검증 가설 추가 (예: '보호자는 3만원 이상 가격에 저항감을 가질 것이다')..."
                    className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleAddAssumption}
                    className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors flex-shrink-0"
                  >
                    가설 등록
                  </button>
                </div>

                {/* Validation Roadmap */}
                <div className="mt-4">
                  <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    추천 수요 검증 계획 (Validation Plan)
                  </h5>
                  <div className="space-y-1.5">
                    {currentIdea.validation_plan?.map((step, idx) => (
                      <div
                        key={idx}
                        className="text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold mr-2 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competitors' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  경쟁 제품 및 대체재 분석 ({currentIdea.competitors?.length || 0})
                </h4>
                <div className="space-y-3">
                  {currentIdea.competitors?.length === 0 ? (
                    <p className="text-xs text-slate-400 p-4 border border-dashed rounded-lg text-center">
                      등록된 경쟁 제품 정보가 없습니다.
                    </p>
                  ) : (
                    currentIdea.competitors.map((comp) => (
                      <div
                        key={comp.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-900">{comp.name}</span>
                            <span className="text-[11px] text-slate-500 ml-2">({comp.brand})</span>
                          </div>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                            {comp.price_display}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                            <span className="font-semibold text-emerald-800">장점: </span>
                            <span className="text-emerald-950">{comp.pros}</span>
                          </div>
                          <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                            <span className="font-semibold text-rose-800">소비자 불만/한계점: </span>
                            <span className="text-rose-950">{comp.cons_painpoints}</span>
                          </div>
                        </div>
                        {comp.source_ref && (
                          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                            <span>출처: {comp.source_ref}</span>
                            <span>조사일: {comp.source_date || '2026-10'}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Research Sources & Confidence Tags (F-04 & F-08) */}
              <div className="border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">
                    근거 및 시장 조사 출처 (F-08 근거 신뢰도)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    출처 없는 정보는 '근거 확인 필요'로 자동 분류
                  </span>
                </div>

                <div className="space-y-2.5">
                  {currentIdea.sources?.length === 0 ? (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                      ⚠️ 아직 등록된 공인 출처가 없습니다. 시장 수치는 가설로 취급되며 [근거 확인 필요] 상태입니다.
                    </div>
                  ) : (
                    currentIdea.sources.map((src) => {
                      const badge = CONFIDENCE_BADGES[src.confidence_status] || CONFIDENCE_BADGES['hypothesis'];
                      return (
                        <div
                          key={src.id}
                          className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{src.title}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-slate-600">
                            근거 주장: <span className="font-medium text-slate-800">{src.claim_supported}</span>
                          </p>
                          <div className="text-[10px] text-slate-400 flex items-center space-x-3 pt-1">
                            <span>발행처: {src.publisher}</span>
                            <span>조사일: {src.accessed_at}</span>
                            {src.source_quality_note && <span>비고: {src.source_quality_note}</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900">
                🛡️ **반려견 제품 안전 최우선 원칙 (PRD F-09)**:
                소형 부품 삼킴, 치악력에 의한 파편 발생, 유해 가소제(BPA/프탈레이트), 세척 위생, 과대 의학 효능 광고 금지를 사전에 체크합니다.
              </div>

              <div className="space-y-3">
                {currentIdea.risks?.map((risk) => (
                  <div
                    key={risk.id}
                    onClick={() => handleToggleSafetyCheck(risk.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      risk.checked
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors ${
                        risk.checked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {risk.checked && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{risk.riskArea}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                            risk.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : risk.severity === 'high'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          위험도: {risk.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{risk.description}</p>
                      <div className="text-[11px] text-emerald-800 font-medium pt-1">
                        대응 및 설계 반영: {risk.mitigation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scores' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 flex items-center justify-between">
                <span>PRD F-05 8대 기준 아이디어 다차원 평가 점수 (각 1~10점)</span>
                <span className="font-extrabold text-amber-700 text-sm">평균 ★ {avgScore}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'problemImportance', label: '1. 문제의 중요도', desc: '고객과 반려견이 겪는 고통의 심각도' },
                  { key: 'willingnessToPay', label: '2. 지불 의향', desc: '기존 대안 대신 돈을 쓸 가능성' },
                  { key: 'differentiation', label: '3. 기존 대안 대비 차별성', desc: '시중 제품과의 명확한 기능/경험 차이' },
                  { key: 'usability', label: '4. 사용 및 관리 편의성', desc: '세척, 보관, 휴대 및 일상 사용성' },
                  { key: 'safetyCompliance', label: '5. 안전성 및 규제 용이성', desc: '인증 난이도 및 위험 요소 통제력' },
                  { key: 'feasibilityCost', label: '6. 제작 난이도 및 원가 적합성', desc: '금형, 소재, 양산 원가 구조' },
                  { key: 'scalability', label: '7. 확장성 및 반복 구매', desc: '리필, 용품군 확장, 크로스셀링' },
                  { key: 'evidenceConfidence', label: '8. 근거 신뢰도', desc: '가설이 아닌 실제 조사 출처 확보율' },
                ].map((crit) => {
                  const scoreVal = (currentIdea.scores as any)?.[crit.key] ?? 5;
                  return (
                    <div key={crit.key} className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>{crit.label}</span>
                        <span className="text-amber-700 font-extrabold text-sm">{scoreVal}점</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{crit.desc}</p>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={scoreVal}
                        onChange={(e) => handleScoreChange(crit.key as any, Number(e.target.value))}
                        className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800">
                기획 결정 기록 (Decision Log) & 팀 메모
              </h4>

              <div className="space-y-2.5">
                {currentIdea.notes?.length === 0 ? (
                  <p className="text-xs text-slate-400 p-4 border border-dashed rounded-lg text-center">
                    아직 기록된 메모가 없습니다.
                  </p>
                ) : (
                  currentIdea.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{note.author}</span>
                        <span>{note.createdAt}</span>
                      </div>
                      <p className="text-slate-800">{note.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Input */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="결정 사항이나 의문점 기록하기..."
                  className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex-shrink-0"
                >
                  기록
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
