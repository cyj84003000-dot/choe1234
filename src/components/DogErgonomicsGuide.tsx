import React, { useState } from 'react';
import { 
  Dog, 
  Ruler, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  Droplet, 
  Maximize2,
  Sliders,
  Info
} from 'lucide-react';
import { DOG_ERGONOMICS_DATA } from '../data/seedData';

export const DogErgonomicsGuide: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('small');

  const currentProfile = DOG_ERGONOMICS_DATA.find((d) => d.sizeClass === selectedClass) || DOG_ERGONOMICS_DATA[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Ruler className="w-5 h-5 mr-2 text-amber-600" />
            견체공학 (Dog Ergonomics) & 체급별 설계 표준 가이드
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            반려견 제품의 하드웨어 규격(치수, 허용 하중, 슬로프 각도, 식기 높이, 치악력)을 결정할 때 참고하는 엔지니어링 기준표입니다.
          </p>
        </div>
      </div>

      {/* Size Class Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {DOG_ERGONOMICS_DATA.map((item) => {
          const isSelected = selectedClass === item.sizeClass;
          return (
            <button
              key={item.sizeClass}
              onClick={() => setSelectedClass(item.sizeClass)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-extrabold ${isSelected ? 'text-amber-900' : 'text-slate-800'}`}>
                  {item.label}
                </span>
                <Dog className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
              </div>
              <div className="text-xs font-bold text-slate-900">{item.weightRange}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {item.typicalBreeds.slice(0, 2).join(', ')} 등
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Profile Detail Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dimension Specs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {currentProfile.label} 표준 신체 치수 (Standard Dimensions)
              </h3>
              <span className="text-[11px] text-slate-500">
                기준 체중: {currentProfile.weightRange}
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-bold">
              대표 견종: {currentProfile.typicalBreeds.join(', ')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold block">목둘레 (Neck)</span>
              <span className="text-sm font-extrabold text-slate-900">{currentProfile.neckGirthCm}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold block">가슴둘레 (Chest)</span>
              <span className="text-sm font-extrabold text-slate-900">{currentProfile.chestGirthCm}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold block">등길이 (Back)</span>
              <span className="text-sm font-extrabold text-slate-900">{currentProfile.backLengthCm}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold block">체고 (Height)</span>
              <span className="text-sm font-extrabold text-slate-900">{currentProfile.shoulderHeightCm}</span>
            </div>
          </div>

          {/* Product Specific Design Parameters */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-800">
              하드웨어 제품군별 권장 설계 규격
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-indigo-950 block">식기 및 음수대 높이 (Feeder Height)</span>
                  <span className="text-[11px] text-indigo-700">목 디스크와 역류성 식도염 방지를 위한 식기 림(Rim) 기준 높이</span>
                </div>
                <span className="text-sm font-extrabold text-indigo-900 whitespace-nowrap ml-3">
                  {currentProfile.feederHeightCm}
                </span>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-950 block">슬로프 / 계단 경사각 (Ramp Angle)</span>
                  <span className="text-[11px] text-emerald-700">슬개골 탈구 및 십자인대 충격 최소화 경사 한계선</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-900 whitespace-nowrap ml-3">
                  {currentProfile.slopeAngleDeg}
                </span>
              </div>

              <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-950 block">치악력 및 내구성 기준 (Bite Force)</span>
                  <span className="text-[11px] text-rose-700">장난감, 리드줄 버클, 배터리 케이스 파손 방지 시험 하중</span>
                </div>
                <span className="text-sm font-extrabold text-rose-900 whitespace-nowrap ml-3">
                  {currentProfile.biteForcePsi}
                </span>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-blue-950 block">1일 권장 음수량 (Daily Hydration)</span>
                  <span className="text-[11px] text-blue-700">휴대용 물병 및 자동 급수기 유효 용량 산정 기준</span>
                </div>
                <span className="text-sm font-extrabold text-blue-900 whitespace-nowrap ml-3">
                  {currentProfile.dailyWaterMl}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Breed Special Considerations (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center">
            <ShieldAlert className="w-4 h-4 mr-1.5 text-amber-500" />
            특수 견종 체형별 제품 기획 주의점
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                1. 단두종 (Brachycephalic: 프렌치불독, 퍼그, 시츄)
              </span>
              <p className="text-slate-600 leading-relaxed">
                비강이 좁아 호흡 곤란 위험이 큽니다. 목을 압박하는 목줄은 절대 피하고, 가슴압박 분산형 Y자 하네스 설계를 필수로 합니다. 식기는 평평하고 넓은 와이드 보울을 채택해야 합니다.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                2. 롱바디 & 숏레그 (Chondrodystrophic: 닥스훈트, 웰시코기)
              </span>
              <p className="text-slate-600 leading-relaxed">
                체형 특성상 디스크(IVDD) 발생률이 매우 높습니다. 계단 대신 15~20도 이하의 완만한 슬로프가 필수적이며, 비옷이나 의류 기획 시 배 밑부분이 흙탕물에 닿지 않도록 하부 머드가드를 보강해야 합니다.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                3. 소형견 슬개골 취약종 (말티즈, 포메라니안, 푸들)
              </span>
              <p className="text-slate-600 leading-relaxed">
                발 디딤 면이 푹 꺼지는 저밀도 스펀지는 오히려 관절을 비틀리게 만듭니다. 고밀도 탄성 폼 또는 미끄럼 방지 논슬립 코르크/러버 마감면을 채택해야 합니다.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                4. 딥 체스트 (Deep-chested: 그레이하운드, 도베르만)
              </span>
              <p className="text-slate-600 leading-relaxed">
                가슴 폭은 좁고 깊어 일반 하네스가 앞뒤로 헛돌거나 탈출하기 쉽습니다. 3점 조절형 밸런스 스트랩 및 위확장염전(GDV) 방지를 위한 고상 식기대가 요구됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
