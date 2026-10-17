import { Idea, DocumentType } from '../types';

export const GeminiClient = {
  async sendMessage(message: string, history: { role: string; content: string }[]): Promise<{ reply: string; suggestedPrompts?: string[]; extractedIdea?: any }> {
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply;

      // Check if an idea JSON block is embedded
      let extractedIdea: any = null;
      const jsonMatch = reply.match(/```json-idea\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          extractedIdea = JSON.parse(jsonMatch[1]);
        } catch (e) {
          console.warn('Failed to parse embedded idea JSON', e);
        }
      }

      return {
        reply: reply.replace(/```json-idea[\s\S]*?```/, '').trim(),
        suggestedPrompts: data.suggestedPrompts,
        extractedIdea
      };
    } catch (err: any) {
      console.warn('Failed to call server chat API, using fallback response', err);
      return {
        reply: `좋은 관점입니다! 제안해주신 "${message}"에 대해 생각해볼 때, 강아지와 보호자가 겪는 핵심 불편을 먼저 분리해볼 수 있습니다.\n\n1. **[강아지 관점]**: 사용 시 거부감이나 공포, 신체적 무리가 없는가? [가설]\n2. **[보호자 관점]**: 세척/보관이 간편하고, 기존 대안보다 10분 이상 시간을 절약해주는가? [가설]\n\n💡 **다음 질문**: 이 제품이 가장 절실한 상황은 무엇인가요? (예: 비 오는 날 산책 후, 혼자 있는 낮 시간, 급하게 병원 갈 때 등)`,
        suggestedPrompts: [
          '실내 소형견(말티즈/푸들) 전용으로 특화하기',
          '기존 시판 제품의 고질적 불만 리뷰 분석',
          '세척과 위생 관리 방안 집중 탐색'
        ]
      };
    }
  },

  async generateDocument(idea: Idea, docType: DocumentType): Promise<string> {
    try {
      const res = await fetch('/api/gemini/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, docType }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data.markdown;
    } catch (err: any) {
      console.warn('Document generation error, using fallback template', err);
      return `# ${idea.name} - ${docType.toUpperCase()}\n\n## 1. 개요 및 배경\n- **제품명**: ${idea.name}\n- **분류**: ${idea.category}\n- **요약**: ${idea.summary}\n\n## 2. 해결하려는 핵심 문제\n${idea.problem}\n\n## 3. 타깃 및 고객 가치\n- **강아지 효용 [가설]**: ${idea.dog_benefit_hypothesis}\n- **보호자 가치 [가설]**: ${idea.owner_value_hypothesis}\n\n## 4. 핵심 사양 및 차별점\n${idea.key_features.map(f => `- ${f}`).join('\n')}\n\n*차별화 포인트*: ${idea.differentiation}\n\n## 5. 안전 및 규제 고려사항\n${idea.risks.map(r => `- **${r.riskArea}** (${r.severity}): ${r.description} -> 대응책: ${r.mitigation}`).join('\n')}\n\n## 6. 가설 검증 계획\n${idea.validation_plan.map(p => `- [ ] ${p}`).join('\n')}`;
    }
  },

  async analyzeMarket(idea: Idea): Promise<string> {
    try {
      const res = await fetch('/api/gemini/market-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data.analysis;
    } catch (err: any) {
      console.warn('Market analysis error, using fallback', err);
      return `### ${idea.name} 시장 분석 리포트\n\n- **국내 시장 규모**: 1인 가구 및 소형견 양육 가구 증가로 프리미엄 반려용품 수요 지속 상승\n- **권장 가격대**: 기존 일반 제품(1.5만원대)과 프리미엄 수입품(4~6만원대) 사이인 2.5만 ~ 3.5만원대 포지셔닝 권장\n- **핵심 소구점**: [보호자의 뒤처리 수고 80% 절감] + [반려견 안전 무독성 인증]`;
    }
  }
};
