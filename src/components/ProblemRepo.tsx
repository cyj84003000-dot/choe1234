import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Search, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle,
  Clock,
  Dog,
  User,
  CheckCircle2
} from 'lucide-react';
import { ProblemOpportunity, IdeaCategory } from '../types';
import { CATEGORY_LABELS } from '../data/seedData';

interface ProblemRepoProps {
  problems: ProblemOpportunity[];
  onAddProblem: (problem: ProblemOpportunity) => void;
  onExploreProblemInChat: (problemText: string) => void;
  onOpenIdeaDetail: (ideaId: string) => void;
}

export const ProblemRepo: React.FC<ProblemRepoProps> = ({
  problems,
  onAddProblem,
  onExploreProblemInChat,
  onOpenIdeaDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New problem form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<IdeaCategory>('practical');
  const [newTarget, setNewTarget] = useState('');
  const [newCurrentSolution, setNewCurrentSolution] = useState('');
  const [newLimitations, setNewLimitations] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newAssumptions, setNewAssumptions] = useState('');
  const [newConcept, setNewConcept] = useState('');

  const filteredProblems = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.affected_target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.opportunity_concept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget.trim()) return;

    const prob: ProblemOpportunity = {
      id: `prob-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      affected_target: newTarget.trim(),
      current_solution: newCurrentSolution.trim() || '대체재 탐색 중',
      limitations: newLimitations.trim() || '기존 해결책의 한계 확인 필요',
      frequency: newFrequency.trim() || '일상적',
      unverified_assumptions: newAssumptions.trim() || '보호자의 지불 의향 검증 필요',
      opportunity_concept: newConcept.trim() || '신규 제품 솔루션 탐색',
      created_at: new Date().toISOString()
    };

    onAddProblem(prob);
    setIsAdding(false);
    // Reset form
    setNewTitle('');
    setNewTarget('');
    setNewCurrentSolution('');
    setNewLimitations('');
    setNewFrequency('');
    setNewAssumptions('');
    setNewConcept('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-rose-500" />
            F-02 반려견 · 보호자 문제 & 기회 보관소
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            "아이디어는 문제에서 출발한다" - 강아지의 행동/생리적 특성과 보호자의 일상적 불편을 데이터화합니다.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="문제 또는 타깃 검색..."
              className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-44 sm:w-56"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">모든 분야 ({problems.length})</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            새 문제 정의
          </button>
        </div>
      </div>

      {/* Grid of Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((prob) => {
          const catInfo = CATEGORY_LABELS[prob.category] || { label: prob.category };

          return (
            <div
              key={prob.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {catInfo.label}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    {prob.frequency}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {prob.title}
                </h3>

                {/* Affected Target */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500 block mb-0.5">영향받는 대상:</span>
                  <p className="text-slate-800 line-clamp-2">{prob.affected_target}</p>
                </div>

                {/* Current Solution vs Limitations */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-700">현재 해결책: </span>
                    {prob.current_solution}
                  </div>
                  <div className="text-rose-900 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                    <span className="font-semibold text-rose-800">한계점: </span>
                    {prob.limitations}
                  </div>
                </div>

                {/* Unverified assumption */}
                <div className="bg-indigo-50/60 p-2 rounded-lg border border-indigo-100 text-xs text-indigo-950">
                  <span className="font-semibold text-indigo-800 flex items-center">
                    <HelpCircle className="w-3 h-3 mr-1" />
                    미확인 가설:
                  </span>
                  <p className="mt-0.5">{prob.unverified_assumptions}</p>
                </div>

                {/* Opportunity Concept */}
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-xs text-amber-950">
                  <span className="font-bold text-amber-900 flex items-center mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-600" />
                    도출된 해결 기회 (Concept):
                  </span>
                  <p className="font-medium">{prob.opportunity_concept}</p>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {prob.linked_idea_id ? (
                  <button
                    onClick={() => onOpenIdeaDetail(prob.linked_idea_id!)}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center"
                  >
                    연계 아이디어 카드 보기
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">연계 아이디어 없음</span>
                )}

                <button
                  onClick={() => onExploreProblemInChat(`문제: "${prob.title}"\n대상: ${prob.affected_target}\n기존 한계: ${prob.limitations}\n이 문제를 해결할 새로운 제품 콘셉트와 시장 기회를 함께 탐색해줘`)}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 mr-1 text-amber-400" />
                  AI 탐색 시작
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Problem Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="font-bold text-base text-slate-900 flex items-center">
                <Target className="w-4 h-4 mr-2 text-rose-500" />
                새로운 문제 & 기회 등록 (F-02)
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  문제 제목 *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 실외 배변 반려견의 비 오는 날 발 씻기 거부"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    카테고리 *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as IdeaCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    발생 빈도 및 상황
                  </label>
                  <input
                    type="text"
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value)}
                    placeholder="예: 매일 산책 시, 비 올 때마다"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  영향을 받는 대상 (강아지 & 보호자) *
                </label>
                <input
                  type="text"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="예: 5kg 미만 실내 소형견 및 매일 2회 산책시키는 직장인 보호자"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    현재 해결 방법
                  </label>
                  <textarea
                    rows={2}
                    value={newCurrentSolution}
                    onChange={(e) => setNewCurrentSolution(e.target.value)}
                    placeholder="기존에는 어떻게 대처하고 있는지..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    기존 해결책의 한계
                  </label>
                  <textarea
                    rows={2}
                    value={newLimitations}
                    onChange={(e) => setNewLimitations(e.target.value)}
                    placeholder="기존 방식이 주는 불편함이나 부작용..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  미확인 가정 (가설)
                </label>
                <input
                  type="text"
                  value={newAssumptions}
                  onChange={(e) => setNewAssumptions(e.target.value)}
                  placeholder="예: 보호자는 1분 안에 끝나는 발세정에 2만원을 기꺼이 낼 것이다"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  도출된 해결 기회 (제품 콘셉트)
                </label>
                <input
                  type="text"
                  value={newConcept}
                  onChange={(e) => setNewConcept(e.target.value)}
                  placeholder="예: 브러시 일체형 노워시 캡슐 디스펜서"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
                >
                  문제 보관소에 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
