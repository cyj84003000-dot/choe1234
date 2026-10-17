import React, { useState } from 'react';
import { X, Check, BookOpen, Star, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { NAMING_CANDIDATES } from '../data/seedData';

interface NamingLabModalProps {
  onClose: () => void;
}

export const NamingLabModal: React.FC<NamingLabModalProps> = ({ onClose }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('PawLab');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                PRD Section 2 네이밍 제안 연구소 (Naming Lab)
              </h3>
              <p className="text-xs text-slate-500">
                현재 플랫폼 가칭은 <span className="font-bold text-amber-700">PawLab (포랩)</span>이며, 실제 제품 브랜드와 분리하여 검토합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Section 2.1 & 2.2 Guidelines */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-slate-700">
            <div className="font-bold text-slate-900 flex items-center">
              <Info className="w-4 h-4 mr-1 text-blue-500" />
              플랫폼 이름과 제품 브랜드 분리 원칙 (PRD 2.2)
            </div>
            <p className="leading-relaxed">
              본 웹/앱은 여러 반려견 제품 아이디어를 발굴하고 검증하는 <strong>플랫폼(PawLab)</strong>입니다.
              추후 실제로 판매할 반려견 제품 브랜드(사료, 장난감, 가구 등)는 개별 제품의 콘셉트와 타깃이 구체화된 뒤 별도로 작명하는 방향을 권장합니다.
            </p>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {NAMING_CANDIDATES.map((cand) => {
              const isSelected = selectedCandidate === cand.english;

              return (
                <div
                  key={cand.english}
                  onClick={() => setSelectedCandidate(cand.english)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 relative ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900">
                        {cand.english}
                      </span>
                      <span className="text-xs text-amber-700 font-semibold ml-1.5">
                        ({cand.korean})
                      </span>
                    </div>

                    {cand.recommended && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white flex items-center">
                        <Star className="w-3 h-3 mr-0.5 fill-current" />
                        1순위 추천
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {cand.meaning}
                  </p>

                  <div className="text-[11px] text-indigo-700 bg-indigo-50/70 p-2 rounded-lg font-medium">
                    적합 방향: {cand.fit}
                  </div>

                  <div className="text-[11px] space-y-0.5 pt-1 text-slate-500 border-t border-slate-100">
                    <div><strong className="text-emerald-700">장점:</strong> {cand.pros}</div>
                    <div><strong className="text-rose-700">고려점:</strong> {cand.cons}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            * 최종 결정 전 상표권(KIPRIS), 도메인(.com / .kr), 앱스토어 검색을 반드시 거칩니다.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-2xs"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
