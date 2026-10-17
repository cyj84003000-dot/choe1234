import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  BookmarkPlus, 
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, Idea, IdeaCategory } from '../types';
import { GeminiClient } from '../services/gemini';
import { CATEGORY_LABELS } from '../data/seedData';

interface ChatExplorerProps {
  onSaveExtractedIdea: (idea: Partial<Idea>) => void;
  onSelectCategory: (cat: IdeaCategory) => void;
}

const QUICK_PROMPTS = [
  '비 오는 날 산책 후 흙탕물과 젖은 털 뒤처리 불편을 해결할 제품 기회',
  '소형견(말티즈, 포메) 슬개골 탈구 예방을 위한 가구 일체형 보조 제품',
  '혼자 8시간 이상 남겨진 반려견 분리불안 완화 놀이 및 케어 솔루션',
  '아파트 실내에서 층간소음 없이 30분 이상 집중시키는 노즈워크 토이',
  '줄 당김이 심한 강아지와 손목 관절 통증을 겪는 보호자를 위한 리드줄',
  '노견의 씹기 힘든 사료/간식 섭취와 구강 청결을 돕는 기능성 제품'
];

export const ChatExplorer: React.FC<ChatExplorerProps> = ({ onSaveExtractedIdea, onSelectCategory }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `반갑습니다! 반려견 제품 아이디어 발굴·검증 랩 **PawLab (포랩)**입니다. 🐾

제품 기획의 출발점은 **"강아지와 보호자가 일상에서 겪는 진짜 문제"**입니다.
어떤 문제나 카테고리에 관심이 있으신가요? 아직 구체적인 아이디어가 없어도 괜찮습니다. 편하게 이야기해주세요!

📌 **포랩 대화 원칙**:
1. 한 번에 많은 질문을 하지 않고 1~2개의 핵심 질문으로 좁혀갑니다.
2. 검증된 사실과 기획팀의 [가설]을 명확히 구분합니다.
3. 문서(PRD 등)는 요청하시기 전까지 자동으로 길게 작성하지 않습니다.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: [
        '산책 및 외출 뒤처리 문제 탐색',
        '실내 분리불안 및 놀이 결핍 문제',
        '소형견 관절 및 웰빙 건강 제품'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState<IdeaCategory | 'all'>('all');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(-6).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      content: m.content
    }));

    try {
      const response = await GeminiClient.sendMessage(text, history);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: response.suggestedPrompts,
        extractedIdea: response.extractedIdea
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Principle & Scope Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                F-01 대화형 아이디어 탐색 엔진
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                강아지의 경험(행동/안전)과 보호자의 가치(구매이유/편의)를 함께 짚어가며 아이디어를 입체적으로 다듬습니다.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-amber-800 bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>근거와 가설 구분 · 질문 절제 원칙 적용</span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-4 pt-3 border-t border-amber-200/60 flex flex-wrap gap-1.5 items-center">
          <span className="text-xs font-semibold text-slate-600 mr-1">탐색 영역:</span>
          {(Object.keys(CATEGORY_LABELS) as IdeaCategory[]).map((cat) => {
            const info = CATEGORY_LABELS[cat];
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCat(cat);
                  onSelectCategory(cat);
                  handleSend(`[${info.label}] 분야의 주요 미해결 문제와 제품 기회를 알려줘`);
                }}
                className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                  selectedCat === cat
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-white text-slate-700 hover:bg-amber-100/70 border border-slate-200'
                }`}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[640px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm ${
                    isUser ? 'bg-slate-800' : 'bg-amber-500'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%]`}>
                  {/* Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-normal">
                      {msg.content}
                    </div>

                    {/* Extracted Idea Card inside bubble */}
                    {msg.extractedIdea && (
                      <div className="mt-4 pt-3 border-t border-slate-200 bg-white p-3.5 rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 text-amber-700 text-xs font-bold">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span>대화에서 감지된 유망 아이디어</span>
                          </div>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            {msg.extractedIdea.category || '실용 제품'}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {msg.extractedIdea.name}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {msg.extractedIdea.summary}
                        </p>
                        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[11px] text-slate-500">
                            차별점: {msg.extractedIdea.differentiation || '새로운 사용 경험'}
                          </span>
                          <button
                            onClick={() => onSaveExtractedIdea(msg.extractedIdea!)}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-sm"
                          >
                            <BookmarkPlus className="w-3.5 h-3.5 mr-1" />
                            보관함에 저장하기
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timestamp & Suggested prompt chips */}
                  <div className={`flex items-center mt-1 text-[11px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Follow-up suggestions */}
                  {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(p)}
                          className="text-xs bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded-full transition-all flex items-center shadow-2xs"
                        >
                          <ArrowRight className="w-3 h-3 mr-1 text-amber-500" />
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span>반려견 행동 및 시장 가설을 다각도로 분석 중...</span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Carousel */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center overflow-x-auto space-x-2 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap flex items-center">
            <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-500" />
            상황별 추천 탐색:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs whitespace-nowrap bg-white hover:bg-amber-50 border border-slate-200 text-slate-700 hover:text-amber-800 px-3 py-1 rounded-full transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: '노견이 밥 먹을 때 고개 숙이기 힘들어하는데 어떤 제품 기회가 있을까?'"
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm transition-all shadow-sm flex items-center justify-center flex-shrink-0"
            >
              <Send className="w-4 h-4 mr-1" />
              <span>전송</span>
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[11px] text-slate-400">
              * 포랩은 사용자가 명시적으로 요청하기 전에는 긴 문서를 자동 생성하지 않습니다.
            </span>
            <span className="text-[11px] text-slate-400">
              Powered by Gemini 3.8 Flash
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
