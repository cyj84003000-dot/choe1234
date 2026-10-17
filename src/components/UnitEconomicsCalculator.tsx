import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Package, 
  Truck, 
  Wrench, 
  Megaphone, 
  Store, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Idea, CostModel } from '../types';
import { StorageService } from '../services/storage';

interface UnitEconomicsCalculatorProps {
  ideas: Idea[];
}

export const UnitEconomicsCalculator: React.FC<UnitEconomicsCalculatorProps> = ({ ideas }) => {
  const [costModels, setCostModels] = useState<Record<string, CostModel>>(() => StorageService.getCostModels());
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(ideas[0]?.id || 'idea-1');

  const currentIdea = ideas.find((i) => i.id === selectedIdeaId) || ideas[0];
  const currentModel: CostModel = costModels[selectedIdeaId] || {
    idea_id: selectedIdeaId,
    retail_price: 25000,
    tooling_cost: 6000000,
    bom_material_cost: 4500,
    packaging_cost: 1000,
    assembly_labor_cost: 1500,
    shipping_logistics_cost: 3000,
    platform_fee_percent: 6.0,
    ad_cac_cost: 5000,
    moq: 1000
  };

  const handleUpdateParam = (key: keyof CostModel, value: number) => {
    const updated = {
      ...costModels,
      [selectedIdeaId]: {
        ...currentModel,
        [key]: value
      }
    };
    setCostModels(updated);
    StorageService.saveCostModels(updated);
  };

  // Calculations
  const retailPrice = currentModel.retail_price || 1;
  const platformFee = Math.round(retailPrice * (currentModel.platform_fee_percent / 100));
  const directCogs = currentModel.bom_material_cost + currentModel.packaging_cost + currentModel.assembly_labor_cost;
  const totalVariableCost = directCogs + currentModel.shipping_logistics_cost + currentModel.ad_cac_cost + platformFee;
  const unitContributionMargin = retailPrice - totalVariableCost;
  const contributionMarginRatio = (unitContributionMargin / retailPrice) * 100;
  
  // Breakeven Point (BEP)
  const bepUnits = unitContributionMargin > 0 
    ? Math.ceil(currentModel.tooling_cost / unitContributionMargin) 
    : 0;
  const bepRevenue = bepUnits * retailPrice;

  // MOQ scenario
  const moqGrossRevenue = currentModel.moq * retailPrice;
  const moqTotalCost = currentModel.tooling_cost + (currentModel.moq * totalVariableCost);
  const moqNetProfit = moqGrossRevenue - moqTotalCost;
  const moqRoi = moqTotalCost > 0 ? (moqNetProfit / moqTotalCost) * 100 : 0;

  // Health assessment
  let marginHealth: 'excellent' | 'healthy' | 'caution' | 'loss' = 'healthy';
  if (contributionMarginRatio >= 45) marginHealth = 'excellent';
  else if (contributionMarginRatio >= 25) marginHealth = 'healthy';
  else if (contributionMarginRatio > 0) marginHealth = 'caution';
  else marginHealth = 'loss';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-emerald-600" />
            단위 원가 · 마진 & 손익분기점(BEP) 시뮬레이터 (PRD 7.2)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            아이디어 단계에서 제조 금형비, 포장재, 배송비, 판매 수수료, 마케팅 CAC를 시뮬레이션하여 사업화 타당성을 사전 검증합니다.
          </p>
        </div>

        {/* Idea Select */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600">대상 아이디어:</span>
          <select
            value={selectedIdeaId}
            onChange={(e) => setSelectedIdeaId(e.target.value)}
            className="text-xs py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-bold focus:outline-none"
          >
            {ideas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center">
              <span>비용 및 판매 파라미터 세팅</span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
              {currentIdea?.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Retail Price */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>소비자가격 (MSRP)</span>
                <span className="text-emerald-700 font-extrabold text-sm">{retailPrice.toLocaleString()}원</span>
              </label>
              <input
                type="number"
                step="500"
                value={retailPrice}
                onChange={(e) => handleUpdateParam('retail_price', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">최종 고객 구매 가격</span>
            </div>

            {/* Tooling Fixed Cost */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>초기 금형/설계 고정비</span>
                <span className="text-amber-800 font-extrabold text-sm">{(currentModel.tooling_cost / 10000).toLocaleString()}만원</span>
              </label>
              <input
                type="number"
                step="500000"
                value={currentModel.tooling_cost}
                onChange={(e) => handleUpdateParam('tooling_cost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">사출 금형비 및 기구설계/목업비</span>
            </div>

            {/* BOM Material Cost */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>개당 원부자재비 (BOM)</span>
                <span className="text-slate-900 font-extrabold text-xs">{currentModel.bom_material_cost.toLocaleString()}원</span>
              </label>
              <input
                type="number"
                step="100"
                value={currentModel.bom_material_cost}
                onChange={(e) => handleUpdateParam('bom_material_cost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">플라스틱 레진, 실리콘, 패브릭 등</span>
            </div>

            {/* Packaging Cost */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>단품 패키지 / 포장비</span>
                <span className="text-slate-900 font-extrabold text-xs">{currentModel.packaging_cost.toLocaleString()}원</span>
              </label>
              <input
                type="number"
                step="100"
                value={currentModel.packaging_cost}
                onChange={(e) => handleUpdateParam('packaging_cost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">단상자, 완충재, 라벨 스티커</span>
            </div>

            {/* Assembly / Labor */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>조립 및 가공 공임비</span>
                <span className="text-slate-900 font-extrabold text-xs">{currentModel.assembly_labor_cost.toLocaleString()}원</span>
              </label>
              <input
                type="number"
                step="100"
                value={currentModel.assembly_labor_cost}
                onChange={(e) => handleUpdateParam('assembly_labor_cost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">공장 인건비, 초음파 융착, QC 검수</span>
            </div>

            {/* Shipping & Fulfillment */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>택배 발송 및 풀필먼트비</span>
                <span className="text-slate-900 font-extrabold text-xs">{currentModel.shipping_logistics_cost.toLocaleString()}원</span>
              </label>
              <input
                type="number"
                step="100"
                value={currentModel.shipping_logistics_cost}
                onChange={(e) => handleUpdateParam('shipping_logistics_cost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">택배 박스 및 3PL 출고비</span>
            </div>

            {/* Platform Commission Fee % */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>채널 수수료율</span>
                <span className="text-indigo-700 font-extrabold text-xs">{currentModel.platform_fee_percent}% ({platformFee.toLocaleString()}원)</span>
              </label>
              <div className="flex items-center space-x-1.5">
                {[
                  { label: '스마트스토어 (5.5%)', val: 5.5 },
                  { label: '쿠팡 로켓 (11%)', val: 11.0 },
                  { label: '와디즈 (10%)', val: 10.0 },
                  { label: '자사몰 (3.5%)', val: 3.5 },
                ].map((ch) => (
                  <button
                    key={ch.label}
                    type="button"
                    onClick={() => handleUpdateParam('platform_fee_percent', ch.val)}
                    className={`text-[10px] px-1.5 py-1 rounded border transition-colors ${
                      currentModel.platform_fee_percent === ch.val
                        ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ch.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Marketing CAC */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>개당 목표 광고비 (CAC)</span>
                <span className="text-slate-900 font-extrabold text-xs">{currentModel.ad_cac_cost.toLocaleString()}원</span>
              </label>
              <input
                type="number"
                step="500"
                value={currentModel.ad_cac_cost}
                onChange={(e) => handleUpdateParam('ad_cac_cost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-slate-400">Meta/네이버 키워드 광고 1개 판매당 소진액</span>
            </div>
          </div>

          {/* MOQ Slider */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>초도 생산 목표 수량 (MOQ)</span>
              <span className="text-amber-700 font-extrabold text-sm">{currentModel.moq.toLocaleString()} 개</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={currentModel.moq}
              onChange={(e) => handleUpdateParam('moq', Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>300개 (소량 테스트)</span>
              <span>1,000개 (표준 초도)</span>
              <span>3,000개 (양산 단가 절감)</span>
              <span>5,000개 (대량 유통)</span>
            </div>
          </div>
        </div>

        {/* Right Financial Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Contribution Margin & Health Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">개당 공헌이익 및 마진율</span>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  marginHealth === 'excellent'
                    ? 'bg-emerald-400 text-slate-950'
                    : marginHealth === 'healthy'
                    ? 'bg-blue-400 text-slate-950'
                    : marginHealth === 'caution'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {marginHealth === 'excellent' && '🌟 초우량 마진 (45%+)'}
                {marginHealth === 'healthy' && '✅ 적정 마진 (25~45%)'}
                {marginHealth === 'caution' && '⚠️ 마진 주의 (0~25%)'}
                {marginHealth === 'loss' && '🚨 적자 구조 (역마진)'}
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-emerald-400">
                {unitContributionMargin.toLocaleString()}원
              </span>
              <span className="text-sm font-semibold text-slate-300">
                / 개 ({contributionMarginRatio.toFixed(1)}%)
              </span>
            </div>

            {/* Waterfall Breakdown Mini-bar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-700 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>소비자가격:</span>
                <span className="font-mono">{retailPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>- 순제조원가 (BOM+공임+포장):</span>
                <span className="font-mono">-{directCogs.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>- 택배물류비:</span>
                <span className="font-mono">-{currentModel.shipping_logistics_cost.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>- 플랫폼 수수료:</span>
                <span className="font-mono">-{platformFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>- 목표 고객 획득 광고비(CAC):</span>
                <span className="font-mono">-{currentModel.ad_cac_cost.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* Breakeven (BEP) Analysis Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-indigo-600" />
              손익분기점 (BEP: Breakeven Point)
            </h4>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
                <span className="text-[11px] text-indigo-700 font-semibold block mb-0.5">
                  손익분기 판매량
                </span>
                <span className="text-lg font-black text-indigo-950">
                  {bepUnits.toLocaleString()} <span className="text-xs font-normal">개</span>
                </span>
              </div>

              <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl">
                <span className="text-[11px] text-purple-700 font-semibold block mb-0.5">
                  손익분기 달성 매출
                </span>
                <span className="text-lg font-black text-purple-950">
                  {Math.round(bepRevenue / 10000).toLocaleString()} <span className="text-xs font-normal">만원</span>
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-tight">
              * 초기 금형/설계비 {(currentModel.tooling_cost / 10000).toLocaleString()}만원을 모두 회수하려면 최소{' '}
              <strong className="text-indigo-900">{bepUnits}개</strong>를 판매해야 합니다.
            </p>
          </div>

          {/* 초도 생산(MOQ) 수익성 예측 Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>초도 {currentModel.moq.toLocaleString()}개 완판 시 순이익</span>
              <span className={`text-xs font-extrabold ${moqNetProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                ROI {moqRoi.toFixed(0)}%
              </span>
            </h4>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">예상 총 매출:</span>
                <span className="font-bold text-slate-900">{Math.round(moqGrossRevenue / 10000).toLocaleString()}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">총 투입 비용 (금형+양산+마케팅):</span>
                <span className="font-medium text-slate-700">{Math.round(moqTotalCost / 10000).toLocaleString()}만원</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold">
                <span className="text-slate-900">예상 영업이익:</span>
                <span className={`text-sm ${moqNetProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {Math.round(moqNetProfit / 10000).toLocaleString()}만원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
