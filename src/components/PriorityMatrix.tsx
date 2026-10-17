import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  HelpCircle, 
  Sparkles, 
  ArrowUpRight, 
  Target, 
  Layers, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Idea } from '../types';
import { CATEGORY_LABELS } from '../data/seedData';

interface PriorityMatrixProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
}

export const PriorityMatrix: React.FC<PriorityMatrixProps> = ({ ideas, onSelectIdea }) => {
  const [highlightCategory, setHighlightCategory] = useState<string>('all');

  // Calculate Market Attractiveness (Y-axis: Problem + WTP + Differentiation + Scalability)
  // Calculate Feasibility (X-axis: Usability + Safety + FeasibilityCost + Confidence)
  const plotData = ideas.map((idea) => {
    const s = idea.scores || {
      problemImportance: 5,
      willingnessToPay: 5,
      differentiation: 5,
      usability: 5,
      safetyCompliance: 5,
      feasibilityCost: 5,
      scalability: 5,
      evidenceConfidence: 5
    };

    const marketValue = (s.problemImportance + s.willingnessToPay + s.differentiation + s.scalability) / 4; // 1 to 10
    const feasibility = (s.usability + s.safetyCompliance + s.feasibilityCost + s.evidenceConfidence) / 4; // 1 to 10

    return {
      idea,
      x: feasibility, // 1 to 10
      y: marketValue, // 1 to 10
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-indigo-600" />
            F-05 아이디어 비교 및 다차원 우선순위 매트릭스
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            초기 점수는 확정된 시장 데이터가 아닌 [가설 점수]일 수 있으므로 불확실성과 함께 교차 평가합니다.
          </p>
        </div>

        {/* Filter Category */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600">분야 필터:</span>
          <select
            value={highlightCategory}
            onChange={(e) => setHighlightCategory(e.target.value)}
            className="text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">전체 분야 보기</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2x2 Matrix Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center">
            <span>2×2 포지셔닝 맵 (시장 매력도 vs 실현 용이성)</span>
          </h3>
          <span className="text-xs text-slate-400">
            * 원을 클릭하면 아이디어 상세 모달이 열립니다
          </span>
        </div>

        {/* Interactive 2x2 Grid Area */}
        <div className="relative w-full h-[460px] bg-slate-50/70 border border-slate-200 rounded-2xl overflow-hidden p-6 select-none">
          {/* Axis dividing lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 border-dashed" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300 border-dashed" />

          {/* Quadrant Watermark Labels */}
          <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 bg-white/70 px-2.5 py-1 rounded-md border border-slate-200/60">
            💎 전략적 R&D 핵심 투자 (High Value, High Difficulty)
          </div>
          <div className="absolute top-4 right-4 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            🚀 즉시 실행 혁신 (High Value, High Feasibility)
          </div>
          <div className="absolute bottom-4 left-4 text-xs font-bold text-slate-400 bg-white/70 px-2.5 py-1 rounded-md border border-slate-200/60">
            ⏸️ 장기 관망 / 보류 (Low Value, Low Feasibility)
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            ⚡ 신속 검증 퀵윈 (Moderate Value, Quick Launch)
          </div>

          {/* Axis Labels */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
            ↑ 시장 매력도 & 고통 심각도
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
            제작 용이성 & 안전·규제 적합도 →
          </div>

          {/* Plot Points */}
          {plotData.map(({ idea, x, y }) => {
            const isMatch = highlightCategory === 'all' || idea.category === highlightCategory;
            // Map 1..10 to 8%..92% of width/height
            const leftPercent = 8 + ((x - 1) / 9) * 84;
            const bottomPercent = 8 + ((y - 1) / 9) * 84;

            return (
              <div
                key={idea.id}
                onClick={() => onSelectIdea(idea)}
                style={{
                  left: `${leftPercent}%`,
                  bottom: `${bottomPercent}%`,
                }}
                className={`absolute -translate-x-1/2 translate-y-1/2 cursor-pointer transition-all duration-300 group z-10 ${
                  isMatch ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                }`}
              >
                {/* Bubble */}
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/90 text-white font-extrabold text-xs flex items-center justify-center shadow-md group-hover:scale-125 group-hover:bg-amber-600 transition-all border-2 border-white ring-2 ring-amber-300/40">
                    {y.toFixed(1)}
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col whitespace-nowrap bg-slate-900 text-white text-xs py-2 px-3 rounded-xl shadow-xl z-30 pointer-events-none">
                    <span className="font-bold">{idea.name}</span>
                    <span className="text-[10px] text-amber-300">
                      매력도 {y.toFixed(1)} / 실현도 {x.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-300 mt-0.5 line-clamp-1 max-w-[180px]">
                      {idea.summary}
                    </span>
                  </div>
                </div>

                <div className="mt-1 text-center">
                  <span className="text-[10px] font-bold text-slate-800 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs border border-slate-200 line-clamp-1 max-w-[110px]">
                    {idea.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Score Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <h4 className="text-sm font-bold text-slate-900 mb-3">
          8대 항목 세부 비교표 (F-05 기준)
        </h4>

        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">제품 아이디어명</th>
              <th className="py-2.5 px-2 text-center" title="문제 중요도">문제 중요도</th>
              <th className="py-2.5 px-2 text-center" title="지불 의향">지불 의향</th>
              <th className="py-2.5 px-2 text-center" title="기존 대비 차별성">차별성</th>
              <th className="py-2.5 px-2 text-center" title="사용 편의성">편의성</th>
              <th className="py-2.5 px-2 text-center" title="안전 및 규제">안전/규제</th>
              <th className="py-2.5 px-2 text-center" title="제작 용이성/원가">제작/원가</th>
              <th className="py-2.5 px-2 text-center" title="확장성">확장성</th>
              <th className="py-2.5 px-2 text-center" title="근거 신뢰도">근거 신뢰도</th>
              <th className="py-2.5 px-3 text-center">종합 평균</th>
              <th className="py-2.5 px-3 text-center">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ideas.map((idea) => {
              const s = idea.scores;
              const avg = (
                Object.values(s || {}).reduce((sum, v) => sum + v, 0) / 8
              ).toFixed(1);

              return (
                <tr key={idea.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    <div>{idea.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{idea.category}</div>
                  </td>
                  <td className="py-3 px-2 text-center font-medium">{s.problemImportance}</td>
                  <td className="py-3 px-2 text-center font-medium">{s.willingnessToPay}</td>
                  <td className="py-3 px-2 text-center font-medium">{s.differentiation}</td>
                  <td className="py-3 px-2 text-center font-medium">{s.usability}</td>
                  <td className="py-3 px-2 text-center font-medium">{s.safetyCompliance}</td>
                  <td className="py-3 px-2 text-center font-medium">{s.feasibilityCost}</td>
                  <td className="py-3 px-2 text-center font-medium">{s.scalability}</td>
                  <td className="py-3 px-2 text-center font-medium">
                    <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-semibold">
                      {s.evidenceConfidence}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-amber-700 text-sm">
                    ★ {avg}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onSelectIdea(idea)}
                      className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center justify-center mx-auto"
                    >
                      보기 <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
