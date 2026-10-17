import React, { useState } from 'react';
import { 
  FolderKanban, 
  LayoutGrid, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Idea, IdeaCategory, IdeaStatus } from '../types';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/seedData';

interface IdeaPipelineProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  onUpdateStatus: (id: string, newStatus: IdeaStatus) => void;
  onOpenNewIdea: () => void;
}

export const IdeaPipeline: React.FC<IdeaPipelineProps> = ({
  ideas,
  onSelectIdea,
  onUpdateStatus,
  onOpenNewIdea,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'grid'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'score' | 'assumptions'>('updated');

  const filteredIdeas = ideas
    .filter((idea) => {
      const matchesSearch =
        idea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.problem.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || idea.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA =
          Object.values(a.scores || {}).reduce((sum, val) => sum + val, 0) / 8;
        const scoreB =
          Object.values(b.scores || {}).reduce((sum, val) => sum + val, 0) / 8;
        return scoreB - scoreA;
      }
      if (sortBy === 'assumptions') {
        return (b.assumptions?.length || 0) - (a.assumptions?.length || 0);
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  const statusColumns: IdeaStatus[] = [
    'exploring',
    'researching',
    'pending_validation',
    'validating',
    'on_hold',
    'approved'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <FolderKanban className="w-5 h-5 mr-2 text-amber-500" />
            F-03 · F-06 반려견 제품 아이디어 파이프라인
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            발견된 문제와 가설을 단계별로 검증하며 실제 제품 사양으로 발전시키는 워크스페이스입니다.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="아이디어, 문제 검색..."
              className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-44 sm:w-56"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">모든 분야 ({ideas.length})</option>
            {Object.entries(CATEGORY_LABELS).map(([key, info]) => (
              <option key={key} value={key}>
                {info.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="updated">최신 수정순</option>
            <option value="score">종합 평가 점수순</option>
            <option value="assumptions">검증할 가설 많은순</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded text-xs flex items-center transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="칸반 보드 뷰"
            >
              <FolderKanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs flex items-center transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="그리드 카드 뷰"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenNewIdea}
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            추가
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start overflow-x-auto pb-4">
          {statusColumns.map((colStatus) => {
            const statusInfo = STATUS_LABELS[colStatus];
            const columnIdeas = filteredIdeas.filter((i) => i.status === colStatus);

            return (
              <div
                key={colStatus}
                className="bg-slate-100/80 rounded-xl p-3 border border-slate-200/90 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                  <div className="flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusInfo.bg.replace('bg-', 'bg-')}`} />
                    <span className="text-xs font-bold text-slate-800">
                      {statusInfo.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                    {columnIdeas.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {columnIdeas.length === 0 ? (
                    <div className="h-28 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-[11px] text-slate-400">
                      등록된 아이디어 없음
                    </div>
                  ) : (
                    columnIdeas.map((idea) => {
                      const avgScore = (
                        Object.values(idea.scores || {}).reduce((s, v) => s + v, 0) / 8
                      ).toFixed(1);
                      const catInfo = CATEGORY_LABELS[idea.category] || { label: idea.category };

                      return (
                        <div
                          key={idea.id}
                          onClick={() => onSelectIdea(idea)}
                          className="bg-white rounded-xl p-3.5 border border-slate-200/80 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                              {catInfo.label}
                            </span>
                            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              ★ {avgScore}
                            </span>
                          </div>

                          <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                            {idea.name}
                          </h3>

                          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                            {idea.summary}
                          </p>

                          {/* Quick Badges */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                            <span className="flex items-center" title="검증해야 할 가설 수">
                              <HelpCircle className="w-3 h-3 mr-0.5 text-indigo-500" />
                              가설 {idea.assumptions?.length || 0}
                            </span>
                            <span className="flex items-center" title="안전 검토 항목">
                              <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-500" />
                              안전 {idea.risks?.filter((r) => r.checked).length || 0}/{idea.risks?.length || 0}
                            </span>
                          </div>

                          {/* Quick Status Shift */}
                          <div className="mt-2 pt-1 flex items-center justify-end">
                            <select
                              value={idea.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => onUpdateStatus(idea.id, e.target.value as IdeaStatus)}
                              className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 focus:outline-none hover:bg-slate-100"
                            >
                              {statusColumns.map((st) => (
                                <option key={st} value={st}>
                                  이동: {STATUS_LABELS[st].label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIdeas.map((idea) => {
            const avgScore = (
              Object.values(idea.scores || {}).reduce((s, v) => s + v, 0) / 8
            ).toFixed(1);
            const statusInfo = STATUS_LABELS[idea.status];
            const catInfo = CATEGORY_LABELS[idea.category] || { label: idea.category };

            return (
              <div
                key={idea.id}
                onClick={() => onSelectIdea(idea)}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {catInfo.label}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusInfo.bg} ${statusInfo.color} border ${statusInfo.border}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 hover:text-amber-700 transition-colors">
                    {idea.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {idea.summary}
                  </p>

                  <div className="mt-3 bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                    <div className="flex items-start">
                      <span className="text-slate-400 font-medium w-16 flex-shrink-0">🐕 강아지:</span>
                      <span className="text-slate-700 line-clamp-1">{idea.target_users?.dog}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-slate-400 font-medium w-16 flex-shrink-0">👤 보호자:</span>
                      <span className="text-slate-700 line-clamp-1">{idea.target_users?.owner}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-slate-500">
                    <span className="flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                      가설 {idea.assumptions?.length || 0}
                    </span>
                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                      안전 {idea.risks?.length || 0}개 검토
                    </span>
                  </div>
                  <span className="font-extrabold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                    ★ {avgScore} / 10
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
