import React, { useState } from 'react';
import { X, Sparkles, Plus, AlertTriangle } from 'lucide-react';
import { Idea, IdeaCategory } from '../types';
import { CATEGORY_LABELS } from '../data/seedData';

interface IdeaEditModalProps {
  initialIdea?: Partial<Idea>;
  onClose: () => void;
  onSave: (idea: Idea) => void;
}

export const IdeaEditModal: React.FC<IdeaEditModalProps> = ({
  initialIdea,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialIdea?.name || '');
  const [category, setCategory] = useState<IdeaCategory>(initialIdea?.category || 'practical');
  const [summary, setSummary] = useState(initialIdea?.summary || '');
  const [problem, setProblem] = useState(initialIdea?.problem || '');
  const [targetDog, setTargetDog] = useState(initialIdea?.target_users?.dog || '');
  const [targetOwner, setTargetOwner] = useState(initialIdea?.target_users?.owner || '');
  const [useScenario, setUseScenario] = useState(initialIdea?.use_scenario || '');
  const [dogBenefit, setDogBenefit] = useState(initialIdea?.dog_benefit_hypothesis || '');
  const [ownerValue, setOwnerValue] = useState(initialIdea?.owner_value_hypothesis || '');
  const [featuresStr, setFeaturesStr] = useState(
    initialIdea?.key_features?.join('\n') || ''
  );
  const [differentiation, setDifferentiation] = useState(initialIdea?.differentiation || '');
  const [assumptionsStr, setAssumptionsStr] = useState(
    initialIdea?.assumptions?.join('\n') || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !problem.trim()) return;

    const keyFeatures = featuresStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const assumptions = assumptionsStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newIdea: Idea = {
      id: initialIdea?.id || `idea-${Date.now()}`,
      name: name.trim(),
      category,
      summary: summary.trim() || `${name} 반려견 전용 제품`,
      problem: problem.trim(),
      target_users: {
        dog: targetDog.trim() || '소형 실내 반려견 전반',
        owner: targetOwner.trim() || '일상 관리 시간을 절약하고 싶은 보호자',
      },
      use_scenario: useScenario.trim() || '일상 생활 및 산책 환경에서 활용',
      dog_benefit_hypothesis: dogBenefit.trim() || '스트레스 및 신체 자극 완화',
      owner_value_hypothesis: ownerValue.trim() || '뒤처리 및 관리 피로도 대폭 감소',
      key_features: keyFeatures.length > 0 ? keyFeatures : ['인체공학적 디자인', '위생 관리 용이'],
      differentiation: differentiation.trim() || '기존 시판 제품의 한계점을 개선한 설계',
      competitors: initialIdea?.competitors || [],
      risks: initialIdea?.risks || [
        {
          id: 'r-default-1',
          riskArea: '소재 안전성 및 무독성',
          severity: 'high',
          description: '강아지가 핥거나 물어뜯을 경우 유해물질 용출 위험',
          mitigation: 'E-WG 올그린 및 유아용 식기 규격 무독성 소재 적용',
          checked: false
        },
        {
          id: 'r-default-2',
          riskArea: '삼킴 및 질식 위험',
          severity: 'critical',
          description: '작은 부속품이나 나사가 분리되어 삼킬 위험',
          mitigation: '일체형 성형 또는 이중 안전 결합 구조 채택',
          checked: false
        }
      ],
      assumptions: assumptions.length > 0 ? assumptions : ['보호자는 기존 대안 대비 20% 프리미엄 가격을 지불할 것이다'],
      validation_plan: initialIdea?.validation_plan || [
        '1단계: 타깃 견주 15명 심층 인터뷰(IDI)',
        '2단계: 3D 프린팅 또는 수제 프로토타입 반응 테스트'
      ],
      status: initialIdea?.status || 'exploring',
      scores: initialIdea?.scores || {
        problemImportance: 8,
        willingnessToPay: 7,
        differentiation: 8,
        usability: 8,
        safetyCompliance: 8,
        feasibilityCost: 7,
        scalability: 8,
        evidenceConfidence: 6,
      },
      sources: initialIdea?.sources || [],
      notes: initialIdea?.notes || [],
      created_at: initialIdea?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(newIdea);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {initialIdea?.id ? '아이디어 카드 수정' : '새 반려견 제품 아이디어 등록'}
              </h3>
              <p className="text-xs text-slate-500">
                PRD F-03 사양에 맞춰 문제, 가설, 안전 사항을 체계적으로 구조화합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">아이디어 명칭 *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 포우클린 30초 워시 캡슐"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">카테고리 *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IdeaCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">한 줄 요약</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="누구를 위해 어떤 핵심 가치를 제공하는지 한 문장으로 요약..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-rose-800 mb-1">
              해결하려는 실제 고통점 (Problem) *
            </label>
            <textarea
              required
              rows={2}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="강아지와 보호자가 현재 겪는 구체적인 불편이나 기존 제품의 한계..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                🐕 타깃 반려견
              </label>
              <input
                type="text"
                value={targetDog}
                onChange={(e) => setTargetDog(e.target.value)}
                placeholder="예: 5kg 미만 실내 소형견, 슬개골 취약견"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                👤 타깃 보호자
              </label>
              <input
                type="text"
                value={targetOwner}
                onChange={(e) => setTargetOwner(e.target.value)}
                placeholder="예: 맞벌이 1인가구, 산책 관리에 피로를 느끼는 보호자"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-amber-900 mb-1">
                강아지 효용 [가설]
              </label>
              <textarea
                rows={2}
                value={dogBenefit}
                onChange={(e) => setDogBenefit(e.target.value)}
                placeholder="강아지의 신체/심리에 어떤 긍정적 변화를 주는가?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-blue-900 mb-1">
                보호자 구매 가치 [가설]
              </label>
              <textarea
                rows={2}
                value={ownerValue}
                onChange={(e) => setOwnerValue(e.target.value)}
                placeholder="보호자의 시간/수고/비용을 얼마나 덜어주는가?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              핵심 기능 목록 (줄바꿈으로 구분)
            </label>
            <textarea
              rows={3}
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              placeholder="의료용 무독성 실리콘 브러시 일체형 캡슐&#10;물 헹굼이 필요 없는 병풀 세정 버블&#10;원터치 분리 식기세척기 세척 구조"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-emerald-800 mb-1">
              기존 대안 대비 차별점 (Differentiation)
            </label>
            <input
              type="text"
              value={differentiation}
              onChange={(e) => setDifferentiation(e.target.value)}
              placeholder="시중 제품들과 무엇이 근본적으로 다른지..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-indigo-800 mb-1">
              검증해야 할 핵심 가설 (줄바꿈으로 구분)
            </label>
            <textarea
              rows={2}
              value={assumptionsStr}
              onChange={(e) => setAssumptionsStr(e.target.value)}
              placeholder="보호자는 15,000원의 가격에 리필팩을 지속 구매할 것이다&#10;강아지가 캡슐 구경에 발을 넣을 때 거부감이 없을 것이다"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition-all"
            >
              아이디어 보관함에 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
