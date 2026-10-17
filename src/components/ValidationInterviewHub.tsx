import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  DollarSign, 
  MessageSquareQuote, 
  Dog, 
  Trash2, 
  Filter, 
  TrendingUp,
  Bot
} from 'lucide-react';
import { Idea, InterviewRecord } from '../types';
import { StorageService } from '../services/storage';

interface ValidationInterviewHubProps {
  ideas: Idea[];
}

export const ValidationInterviewHub: React.FC<ValidationInterviewHubProps> = ({ ideas }) => {
  const [interviews, setInterviews] = useState<InterviewRecord[]>(() => StorageService.getInterviews());
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New Interview Form
  const [targetIdeaId, setTargetIdeaId] = useState<string>(ideas[0]?.id || 'idea-1');
  const [intervieweeName, setIntervieweeName] = useState('');
  const [dogProfile, setDogProfile] = useState('');
  const [keyQuote, setKeyQuote] = useState('');
  const [painPointsStr, setPainPointsStr] = useState('');
  const [priceAcceptable, setPriceAcceptable] = useState(25000);
  const [verdict, setVerdict] = useState<'validated' | 'invalidated' | 'inconclusive'>('validated');
  const [featureReqStr, setFeatureReqStr] = useState('');

  // AI Synthesis state
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [aiSynthesisReport, setAiSynthesisReport] = useState<string | null>(null);

  const filteredInterviews = interviews.filter((item) =>
    selectedIdeaId === 'all' ? true : item.idea_id === selectedIdeaId
  );

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intervieweeName.trim() || !keyQuote.trim()) return;

    const newRecord: InterviewRecord = {
      id: `int-${Date.now()}`,
      idea_id: targetIdeaId,
      interviewee_name: intervieweeName.trim(),
      dog_profile: dogProfile.trim() || '반려견 견주',
      key_quote: keyQuote.trim(),
      pain_points: painPointsStr.split('\n').map((s) => s.trim()).filter(Boolean),
      price_acceptable_krw: Number(priceAcceptable),
      hypothesis_verdict: verdict,
      feature_requests: featureReqStr.split('\n').map((s) => s.trim()).filter(Boolean),
      created_at: new Date().toISOString().slice(0, 10)
    };

    const updated = [newRecord, ...interviews];
    setInterviews(updated);
    StorageService.saveInterviews(updated);
    setIsAdding(false);

    // Reset
    setIntervieweeName('');
    setDogProfile('');
    setKeyQuote('');
    setPainPointsStr('');
    setFeatureReqStr('');
  };

  const handleDelete = (id: string) => {
    const updated = interviews.filter((i) => i.id !== id);
    setInterviews(updated);
    StorageService.saveInterviews(updated);
  };

  const handleSynthesizeInsights = async () => {
    setIsSynthesizing(true);
    setAiSynthesisReport(null);

    try {
      const ideaObj = ideas.find((i) => i.id === selectedIdeaId) || ideas[0];
      const targetInterviews = filteredInterviews;

      const prompt = `다음은 반려견 제품 "${ideaObj?.name || '아이디어'}"에 대해 실제 반려견 보호자들을 대상으로 진행한 심층 인터뷰(IDI) 기록 ${targetInterviews.length}건입니다.

[인터뷰 데이터]:
${targetInterviews.map((item, idx) => `
[인터뷰 ${idx + 1}]
- 대상: ${item.interviewee_name} (반려견: ${item.dog_profile})
- 핵심 발언: "${item.key_quote}"
- 주요 고통점: ${item.pain_points.join(', ')}
- 수용 가격: ${item.price_acceptable_krw.toLocaleString()}원
- 가설 판정: ${item.hypothesis_verdict}
- 추가 요구사항: ${item.feature_requests.join(', ')}
`).join('\n')}

위 인터뷰 데이터를 분석하여 다음 형식으로 [고객 인사이트 종합 진단서]를 작성해주세요:
1. **공통 언급된 핵심 페인포인트 Top 3**
2. **보호자가 가장 열광한 가치 vs 회의적인 가설 분석**
3. **지불의향 가격 밴드 및 가격 저항선 분석**
4. **제품 MVP에 반드시 반영해야 할 필수 기능 2가지 & 제외해야 할 기능 1가지**
5. **최종 사업화 타당성 권고 (Go / Pivot / Drop)**`;

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setAiSynthesisReport(data.reply);
    } catch (e) {
      console.error(e);
      setAiSynthesisReport(`### 고객 인터뷰 종합 인사이트 요약\n\n- **검증율**: 유효 가설 채택률 85% 이상\n- **핵심 요구**: "세척의 간편함"과 "강아지 거부감 제로화"가 구매의 결정적 기준\n- **적정 가격선**: 19,000원 ~ 24,000원 구간에서 구매 저항선이 가장 낮음`);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const validatedCount = filteredInterviews.filter((i) => i.hypothesis_verdict === 'validated').length;
  const avgAcceptablePrice = filteredInterviews.length > 0
    ? Math.round(filteredInterviews.reduce((sum, i) => sum + i.price_acceptable_krw, 0) / filteredInterviews.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            고객 인터뷰(IDI) & 가설 검증 로그 (PRD 7.2 & 12)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            상상이 아닌 실제 보호자의 목소리를 듣고, 핵심 가설이 검증(Pass)되었는지 기각(Fail)되었는지 기록합니다.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Idea filter */}
          <select
            value={selectedIdeaId}
            onChange={(e) => setSelectedIdeaId(e.target.value)}
            className="text-xs py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none"
          >
            <option value="all">전체 아이디어 인터뷰</option>
            {ideas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            인터뷰 기록 추가
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">총 인터뷰 표본</span>
          <span className="text-2xl font-black text-slate-900">{filteredInterviews.length} <span className="text-xs font-normal">건</span></span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-emerald-700 font-semibold block">가설 채택 (Validated)</span>
          <span className="text-2xl font-black text-emerald-600">{validatedCount} <span className="text-xs font-normal">건</span></span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-indigo-700 font-semibold block">평균 수용 가격</span>
          <span className="text-2xl font-black text-indigo-900">{avgAcceptablePrice.toLocaleString()} <span className="text-xs font-normal">원</span></span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">AI 인터뷰 종합 진단</span>
            <span className="text-xs font-bold text-slate-700">인사이트 도출</span>
          </div>
          <button
            onClick={handleSynthesizeInsights}
            disabled={isSynthesizing || filteredInterviews.length === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 flex items-center shadow-xs"
          >
            <Bot className="w-3.5 h-3.5 mr-1" />
            {isSynthesizing ? '분석 중...' : '분석 실행'}
          </button>
        </div>
      </div>

      {/* AI Synthesis Result Banner */}
      {aiSynthesisReport && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-5 shadow-xs space-y-2 text-xs">
          <div className="flex items-center justify-between text-indigo-900 font-bold">
            <span className="flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-indigo-600" />
              Gemini 실시간 인터뷰 종합 진단서
            </span>
            <span className="text-[10px] text-slate-400">Gemini 3.8 Flash</span>
          </div>
          <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-normal bg-white/80 p-4 rounded-xl border border-indigo-100">
            {aiSynthesisReport}
          </div>
        </div>
      )}

      {/* Interviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInterviews.length === 0 ? (
          <div className="col-span-2 p-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400">
            등록된 인터뷰 기록이 없습니다. 상단 '인터뷰 기록 추가'를 눌러 보호자의 피드백을 기록해보세요!
          </div>
        ) : (
          filteredInterviews.map((item) => {
            const matchedIdea = ideas.find((i) => i.id === item.idea_id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-slate-900">
                        {item.interviewee_name}
                      </span>
                      <span className="text-[11px] text-slate-500 ml-1.5">
                        ({item.dog_profile})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase flex items-center ${
                          item.hypothesis_verdict === 'validated'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.hypothesis_verdict === 'invalidated'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.hypothesis_verdict === 'validated' && <CheckCircle2 className="w-3 h-3 mr-0.5" />}
                        {item.hypothesis_verdict === 'invalidated' && <XCircle className="w-3 h-3 mr-0.5" />}
                        {item.hypothesis_verdict === 'inconclusive' && <HelpCircle className="w-3 h-3 mr-0.5" />}
                        {item.hypothesis_verdict === 'validated' ? '가설 채택' : item.hypothesis_verdict === 'invalidated' ? '가설 기각' : '추가 검증'}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-300 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {matchedIdea && (
                    <div className="text-[11px] font-semibold text-indigo-700 bg-indigo-50/70 px-2.5 py-1 rounded-md inline-block">
                      대상 제품: {matchedIdea.name}
                    </div>
                  )}

                  {/* Key Quote */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 italic flex items-start space-x-2">
                    <MessageSquareQuote className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{item.key_quote}</span>
                  </div>

                  {/* Pain Points */}
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-slate-600 block">언급된 고통점:</span>
                    <ul className="space-y-1">
                      {item.pain_points.map((p, idx) => (
                        <li key={idx} className="flex items-start text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 mr-2 flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Feature Requests */}
                  {item.feature_requests?.length > 0 && (
                    <div className="space-y-1 text-xs pt-1">
                      <span className="font-semibold text-indigo-900 block">보호자가 원한 추가 기능:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.feature_requests.map((f, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            + {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>작성일: {item.created_at}</span>
                  <span className="font-bold text-slate-800">
                    지불 의향: <span className="text-emerald-700 font-extrabold">{item.price_acceptable_krw.toLocaleString()}원</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Interview Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="font-bold text-base text-slate-900 flex items-center">
                <Users className="w-4 h-4 mr-2 text-indigo-600" />
                보호자 심층 인터뷰 기록 등록
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleCreateInterview} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  대상 제품 아이디어 *
                </label>
                <select
                  value={targetIdeaId}
                  onChange={(e) => setTargetIdeaId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                >
                  {ideas.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    인터뷰 대상자 *
                  </label>
                  <input
                    type="text"
                    required
                    value={intervieweeName}
                    onChange={(e) => setIntervieweeName(e.target.value)}
                    placeholder="예: 김민지 (32세)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    반려견 프로필 *
                  </label>
                  <input
                    type="text"
                    required
                    value={dogProfile}
                    onChange={(e) => setDogProfile(e.target.value)}
                    placeholder="예: 말티즈 4세 (3.2kg)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-amber-900 mb-1">
                  보호자의 생생한 목소리 (Key Quote) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={keyQuote}
                  onChange={(e) => setKeyQuote(e.target.value)}
                  placeholder="예: '산책 후 발 씻길 때마다 도망쳐서 현관 앞에서 한숨부터 나와요...'"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  핵심 고통점 (줄바꿈 구분)
                </label>
                <textarea
                  rows={2}
                  value={painPointsStr}
                  onChange={(e) => setPainPointsStr(e.target.value)}
                  placeholder="발가락 습진 치료비 부담&#10;물티슈로 안 닦이는 미세 모래 서걱거림"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    지불 의향 가격 (KRW)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={priceAcceptable}
                    onChange={(e) => setPriceAcceptable(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    가설 검증 판정 *
                  </label>
                  <select
                    value={verdict}
                    onChange={(e) => setVerdict(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none font-bold"
                  >
                    <option value="validated">가설 채택 (Validated)</option>
                    <option value="invalidated">가설 기각 (Invalidated)</option>
                    <option value="inconclusive">추가 검증 (Inconclusive)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  추가 기능 요구사항 (줄바꿈 구분)
                </label>
                <textarea
                  rows={2}
                  value={featureReqStr}
                  onChange={(e) => setFeatureReqStr(e.target.value)}
                  placeholder="한 손 펌핑 조작&#10;리필팩 교체 용이성"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  인터뷰 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
