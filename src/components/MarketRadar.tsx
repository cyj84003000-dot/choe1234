import React, { useState } from 'react';
import { 
  Compass, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Search,
  Globe,
  MapPin,
  Bot
} from 'lucide-react';
import { Idea, CompetitorProduct, ResearchSource } from '../types';
import { CONFIDENCE_BADGES } from '../data/seedData';
import { GeminiClient } from '../services/gemini';

interface MarketRadarProps {
  ideas: Idea[];
  onOpenIdea: (idea: Idea) => void;
}

export const MarketRadar: React.FC<MarketRadarProps> = ({ ideas, onOpenIdea }) => {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(ideas[0]?.id || '');
  const [marketFilter, setMarketFilter] = useState<'all' | 'domestic' | 'global'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const currentIdea = ideas.find((i) => i.id === selectedIdeaId) || ideas[0];

  const handleRunAiMarketAnalysis = async () => {
    if (!currentIdea || isAnalyzing) return;
    setIsAnalyzing(true);
    setAiAnalysisResult(null);

    try {
      const result = await GeminiClient.analyzeMarket(currentIdea);
      setAiAnalysisResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredCompetitors = (currentIdea?.competitors || []).filter((c) => {
    if (marketFilter === 'all') return true;
    return c.market === marketFilter || c.market === 'both';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header & Guidelines */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Compass className="w-5 h-5 mr-2 text-blue-600" />
            F-04 · F-08 시장 & 경쟁 제품 조사 레이더
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            국내 시장을 우선 조사하고 해외 사례와 비교합니다. 근거 없는 수치는 [가설] 또는 [근거 확인 필요]로 라벨링합니다.
          </p>
        </div>

        {/* Idea Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">분석 대상 아이디어:</span>
          <select
            value={selectedIdeaId}
            onChange={(e) => {
              setSelectedIdeaId(e.target.value);
              setAiAnalysisResult(null);
            }}
            className="text-xs py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {ideas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentIdea && (
        <div className="space-y-6">
          {/* Target Idea Card Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                  {currentIdea.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {currentIdea.name}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  해결할 문제: {currentIdea.problem}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRunAiMarketAnalysis}
                  disabled={isAnalyzing}
                  className="inline-flex items-center px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all disabled:bg-slate-300"
                >
                  <Bot className="w-4 h-4 mr-1.5" />
                  {isAnalyzing ? '시장 레이더 가동 중...' : 'AI 시장 심층 분석 요청'}
                </button>
                <button
                  onClick={() => onOpenIdea(currentIdea)}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  아이디어 카드 상세
                </button>
              </div>
            </div>

            {/* AI Analysis Result Callout */}
            {aiAnalysisResult && (
              <div className="mt-4 pt-4 border-t border-blue-200/80 bg-white/90 p-4 rounded-xl shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between text-blue-900 font-bold text-xs">
                  <span className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-blue-600" />
                    Gemini 실시간 시장 및 고객 후기 불만점 분석
                  </span>
                  <span className="text-[10px] text-slate-400">Gemini 3.8 Flash</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-normal">
                  {aiAnalysisResult}
                </div>
              </div>
            )}
          </div>

          {/* Competitor Radar Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  기존 경쟁 제품 및 대체재 분석 ({filteredCompetitors.length})
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  "경쟁 제품이 없다는 성급한 결론을 내리지 않고, 보호자가 기존에 우회하여 쓰던 대체재까지 비교합니다."
                </p>
              </div>

              {/* Market Filter */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setMarketFilter('all')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    marketFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setMarketFilter('domestic')}
                  className={`px-2.5 py-1 rounded font-medium flex items-center ${
                    marketFilter === 'domestic' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  <MapPin className="w-3 h-3 mr-0.5 text-blue-500" />
                  국내 우선
                </button>
                <button
                  onClick={() => setMarketFilter('global')}
                  className={`px-2.5 py-1 rounded font-medium flex items-center ${
                    marketFilter === 'global' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  <Globe className="w-3 h-3 mr-0.5 text-indigo-500" />
                  글로벌/수입
                </button>
              </div>
            </div>

            {/* Competitor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCompetitors.length === 0 ? (
                <div className="col-span-2 p-8 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  해당 필터에 일치하는 경쟁 제품 데이터가 없습니다.
                </div>
              ) : (
                filteredCompetitors.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{comp.name}</span>
                        <span className="text-[11px] text-slate-500 ml-1.5 font-normal">
                          브랜드: {comp.brand} ({comp.market === 'domestic' ? '국내' : '해외/직구'})
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                        {comp.price_display}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-900 block mb-0.5">제품 장점:</span>
                        <p className="text-emerald-950">{comp.pros}</p>
                      </div>

                      <div className="bg-rose-50/70 p-2.5 rounded-lg border border-rose-100">
                        <span className="font-bold text-rose-900 block mb-0.5">
                          반복되는 고객 불만 & 한계점 (우리의 기회):
                        </span>
                        <p className="text-rose-950 font-medium">{comp.cons_painpoints}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>출처: {comp.source_ref || '소비자 리뷰 분석'}</span>
                      <span>조사일: {comp.source_date || '2026-10'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Research Sources & Confidence Level (F-08) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  F-08 근거와 불확실성 표시 체계 (Evidence Audit)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  모든 시장 수치와 주장은 5가지 상태로 구분하여 과대평가나 오판을 방지합니다.
                </p>
              </div>
            </div>

            {/* Confidence Status Guide Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-2">
              {Object.entries(CONFIDENCE_BADGES).map(([key, badge]) => (
                <div key={key} className={`p-2.5 rounded-lg border text-xs ${badge.color}`}>
                  <span className="font-bold block mb-0.5">{badge.label}</span>
                  <span className="text-[10px] leading-tight block opacity-90">{badge.desc}</span>
                </div>
              ))}
            </div>

            {/* Sources List */}
            <div className="space-y-2.5 pt-2">
              {currentIdea.sources?.map((src) => {
                const badge = CONFIDENCE_BADGES[src.confidence_status] || CONFIDENCE_BADGES.hypothesis;
                return (
                  <div
                    key={src.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{src.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-slate-700">
                        지원의견/근거: <span className="font-semibold text-slate-900">{src.claim_supported}</span>
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 sm:text-right flex-shrink-0">
                      <div>발행처: {src.publisher}</div>
                      <div>확인일: {src.accessed_at}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
