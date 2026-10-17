import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Idea } from '../types';

interface SafetyAuditViewProps {
  ideas: Idea[];
  onOpenIdea: (idea: Idea) => void;
}

const SAFETY_PRINCIPLES = [
  {
    title: '1. 소형 부품 삼킴 및 질식 위험 (Choking Hazard)',
    desc: '강아지는 제품을 입으로 탐색합니다. 직경 3.5cm 이하의 탈착식 부품, 단추, 비즈, 작은 배터리는 장폐색을 유발하므로 일체형 또는 숨김 설계를 원칙으로 합니다.',
    severity: 'critical'
  },
  {
    title: '2. 치악력(Biting) 내구성 및 날카로운 파편 방지',
    desc: '치악력이 100~300psi에 달하는 반려견이 씹을 때 깨지거나 날카로운 플라스틱 파편이 생기는 소재는 배제하고, 트라이탄/식품용 실리콘/천연고무를 채택해야 합니다.',
    severity: 'high'
  },
  {
    title: '3. 화학물질 무독성 (BPA, 프탈레이트 Free)',
    desc: '입에 닿고 핥는 제품은 유아용 젖병에 준하는 E-WG 올그린 및 FDA 식품 접촉 안전 인증(Food Contact Grade) 수준을 검토해야 합니다.',
    severity: 'high'
  },
  {
    title: '4. 전자/배터리 누전 및 발열 위험',
    desc: '스마트 기기나 온열 제품의 경우 강아지가 이빨로 리튬 배터리를 천공(Puncture)할 시 화재가 발생할 수 있으므로, 금속 하우징 2중 격벽과 저전압(5V 이하) 설계를 필수 적용합니다.',
    severity: 'critical'
  },
  {
    title: '5. 세척 위생 및 곰팡이 억제',
    desc: '반려견 침(Saliva)과 사료 부스러기가 결합되면 24시간 내 세균이 급증합니다. 모든 부품의 분해 세척성 및 열탕/식기세척기 건조 가능 여부를 확인합니다.',
    severity: 'medium'
  },
  {
    title: '6. 과대 건강 효능 광고 및 의학적 오인 방지',
    desc: '"슬개골 탈구 완치", "지간염 치료" 등 질병 예방/치료 효능을 단정하는 것은 약사법 및 수의사법 위반 소지가 있습니다. "청결 및 관절 부담 완화 보조"로 표현을 통제합니다.',
    severity: 'medium'
  },
  {
    title: '7. 체급 및 품종별 취약점 고려',
    desc: '단두종(퍼그, 프렌치불독)의 호흡기 압박 방지, 슬개골 취약 소형견의 착지 충격 분산 등 체형별 인체공학(Dog-ergonomics) 설계를 반영해야 합니다.',
    severity: 'medium'
  }
];

export const SafetyAuditView: React.FC<SafetyAuditViewProps> = ({ ideas, onOpenIdea }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2 text-rose-600" />
            F-09 안전 우선 검토기 & 규제 컴플라이언스 (Safety Audit)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            "반려견 제품의 안전성은 아이디어 단계에서 확정할 수 없으며, 사전에 엄격한 위험 체크리스트를 통과해야 합니다."
          </p>
        </div>
      </div>

      {/* 7 Core Safety Principles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center">
          <Info className="w-4 h-4 mr-1.5 text-blue-500" />
          반려견 하드웨어 제품 7대 필수 안전 가이드라인
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {SAFETY_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{principle.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    principle.severity === 'critical'
                      ? 'bg-rose-100 text-rose-800'
                      : principle.severity === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {principle.severity}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Ideas Safety Status Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center">
          <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
          보관함 아이디어 전수 안전 검토 진행 현황 ({ideas.length}건)
        </h3>

        <div className="space-y-4">
          {ideas.map((idea) => {
            const totalRisks = idea.risks?.length || 0;
            const checkedRisks = idea.risks?.filter((r) => r.checked).length || 0;
            const isAllPassed = totalRisks > 0 && checkedRisks === totalRisks;

            return (
              <div
                key={idea.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{idea.name}</span>
                    <span className="text-[11px] text-slate-500 ml-2">({idea.category})</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center ${
                        isAllPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isAllPassed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          검토 완료 ({checkedRisks}/{totalRisks})
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" />
                          추가 검토 필요 ({checkedRisks}/{totalRisks})
                        </>
                      )}
                    </span>

                    <button
                      onClick={() => onOpenIdea(idea)}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center"
                    >
                      상세 검토 <ArrowRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Risk Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {idea.risks?.map((risk) => (
                    <div
                      key={risk.id}
                      className={`p-2.5 rounded-lg border text-xs flex items-start space-x-2 ${
                        risk.checked
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-rose-50/60 border-rose-200'
                      }`}
                    >
                      {risk.checked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold text-slate-900">{risk.riskArea}</span>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                          대응: {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
