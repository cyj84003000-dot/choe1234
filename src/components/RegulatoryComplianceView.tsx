import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Building2, 
  FileCheck, 
  HelpCircle, 
  Info, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { REGULATORY_GUIDES } from '../data/seedData';

export const RegulatoryComplianceView: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  const currentGuide = REGULATORY_GUIDES[selectedCategoryIdx] || REGULATORY_GUIDES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" />
            인증 규제 & 사전 시험 내비게이터 (Regulatory Compliance)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            반려견 제품은 일반 공산품과 달리 농림축산검역본부(의약외품), 환경부(생활화학), 전파연구원(KC), 사료관리법의 엄격한 규제를 받습니다.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {REGULATORY_GUIDES.map((guide, idx) => {
          const isSelected = selectedCategoryIdx === idx;
          return (
            <div
              key={guide.category}
              onClick={() => setSelectedCategoryIdx(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                  {guide.category}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    guide.riskLevel === '매우 중요'
                      ? 'bg-rose-100 text-rose-800'
                      : guide.riskLevel === '중요'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {guide.riskLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{guide.lawName}</p>
            </div>
          );
        })}
      </div>

      {/* Guide Detail Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Required Steps & Checkpoints (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {currentGuide.category}
            </h3>
            <span className="text-xs font-semibold text-blue-700">
              적용 법령: {currentGuide.lawName}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center">
              <FileCheck className="w-4 h-4 mr-1 text-emerald-600" />
              출시 전 필수 준비 단계 및 시험 성적서
            </h4>

            <div className="space-y-2 text-xs">
              {currentGuide.requiredSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-2.5 text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
            <span className="font-bold flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-amber-600" />
              과대 광고 및 약사법 위반 주의 경고
            </span>
            <p className="leading-relaxed">
              의약품이 아닌 일반 반려용품이나 세정제에 "피부염 치료", "눈물자국 완치", "슬개골 예방 효과 보장" 등 의학적 효능 문구를 표기할 경우, 제품 회수 및 형사 고발 대상이 됩니다. 마케팅 소구는 반드시 "청결 보조", "체중 부담 완화" 등 일상 케어 용어로 제한해야 합니다.
            </p>
          </div>
        </div>

        {/* Right: Quick Spec Box (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            인증 개요 요약
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1" />
                관할 주무 부처
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {currentGuide.targetAgency}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                예상 인증 소요 기간
              </span>
              <span className="font-bold text-indigo-700 text-sm">
                {currentGuide.estDuration}
              </span>
              <span className="text-[10px] text-slate-400 block">* 시제품 완성 및 시험체 제출 기준</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-1" />
                공인 시험 및 인증 예상 비용
              </span>
              <span className="font-bold text-emerald-700 text-sm">
                {currentGuide.estCost}
              </span>
              <span className="text-[10px] text-slate-400 block">* KTR, KCL, KTC 등 공인시험기관 수수료 기준</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
