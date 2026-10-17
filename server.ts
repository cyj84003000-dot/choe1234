import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // 1. 대화형 탐색 API (F-01)
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!ai) {
        // Fallback for development if API key not available
        return res.json({
          reply: `[안내: Gemini API 키가 감지되지 않아 스마트 시뮬레이션 모드로 응답합니다]\n\n흥미로운 접근입니다! 제시해주신 "${message}" 관점에서 반려견과 보호자의 고통점을 분리해볼 수 있습니다.\n\n1. **[강아지 관점 가설]**: 활동 시 스트레스나 피부/관절에 가해지는 물리적 자극을 줄여줄 수 있습니다.\n2. **[보호자 관점 가설]**: 외출 후 준비 시간이나 청소/관리 시간을 유의미하게 단축할 수 있습니다.\n\n💡 **추천 확인 질문 (1가지만 먼저 생각해보세요)**\n이 제품을 가장 먼저 테스트하고 싶은 주요 타깃 견종이 소형견(말티즈, 푸들 등 5kg 미만)인가요, 아니면 중대형견(10kg 이상)인가요?`,
          suggestedPrompts: [
            '5kg 미만 실내 소형견 타깃으로 집중',
            '에너지가 넘치는 중형견(코기/시바) 타깃으로 집중',
            '기존 시판 제품들의 주요 불만 리뷰 분석해줘'
          ]
        });
      }

      const systemInstruction = `당신은 반려견 제품 기획 및 시장 검증 전문 어드바이저 '포랩(PawLab) AI'입니다.
사용자와의 대화를 통해 반려견과 보호자의 실제 문제를 발견하고, 시장성 있는 제품 아이디어로 구체화하도록 돕습니다.

[원칙 준수 - 필수]:
1. [한 번에 질문 1~2개만]: 사용자가 지치지 않도록 한 번에 여러 질문을 쏟아내지 말고 핵심 질문 1개(최대 2개)만 물어보세요.
2. [근거와 가설 구분]: 확실히 검증된 사실이 아닌 내용은 반드시 "[가설]" 또는 "[추가 확인 필요]"라고 명시하세요.
3. [문서 자동 작성 금지]: 사용자가 "PRD 써줘"나 "보고서 작성해줘"라고 명시적으로 요청하기 전에는 긴 기획 문서를 출력하지 마세요. 대화형 아이디어 빌드업에 집중하세요.
4. [안전성 최우선]: 삼킴 위험, 물어뜯기 내구성, 유해 물질(환경호르몬), 세척 위생, 과대 의학적 효능 광고 금지 원칙을 자연스럽게 짚어주세요.
5. [아이디어 추출]: 대화에서 구체적인 제품 콘셉트가 도출되면, 답변 끝에 다음과 같은 JSON 블록을 포함해주세요:
\`\`\`json-idea
{
  "name": "추천 제품명",
  "category": "practical|play|wellness|design|hybrid|treats",
  "summary": "한 줄 요약",
  "problem": "해결하려는 핵심 문제",
  "dog_benefit": "강아지 경험 및 효용 가설",
  "owner_value": "보호자 가치 및 편익 가설",
  "key_features": ["핵심기능1", "핵심기능2"],
  "differentiation": "기존 대안과의 차별점"
}
\`\`\`
답변은 친절하고 전문적이며, 한국어로 작성하세요.`;

      const promptContents = [
        ...(Array.isArray(history) ? history.map((h: any) => `${h.role === 'user' ? '사용자' : '포랩 어드바이저'}: ${h.content}`) : []),
        `사용자: ${message}`
      ].join('\n\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || '응답을 생성할 수 없습니다.';
      res.json({ reply });
    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: error.message || 'Gemini API 호출 중 오류가 발생했습니다.' });
    }
  });

  // 2. 요청 시 문서 생성 API (F-07)
  app.post('/api/gemini/document', async (req, res) => {
    try {
      const { idea, docType } = req.body;

      if (!ai) {
        return res.json({
          markdown: `# [초안 문서] ${idea.name} (${docType.toUpperCase()})\n\n*(Gemini API 연결 대기 중 - 시뮬레이션 기본 서식입니다)*\n\n## 1. 제품 개요\n- **제품명**: ${idea.name}\n- **요약**: ${idea.summary}\n\n## 2. 해결하려는 문제\n${idea.problem}\n\n## 3. 타깃 고객 및 사용 시나리오\n- **반려견**: ${idea.target_users?.dog || '소형견 전반'}\n- **보호자**: ${idea.target_users?.owner || '1인 가구 보호자'}\n- **사용 시나리오**: ${idea.use_scenario || '일상 산책/놀이 환경'}\n\n## 4. 핵심 가설 및 검증 항목\n${idea.assumptions?.map((a: string) => `- [ ] ${a}`).join('\n') || '- 주요 가설 검증 필요'}\n\n## 5. 안전 고려사항\n${idea.risks?.map((r: any) => `- **${r.riskArea}**: ${r.description} (대응책: ${r.mitigation})`).join('\n') || '- 안전 규정 준수'}`
        });
      }

      const docTypeDescriptions: Record<string, string> = {
        prd: '상세 제품 요구사항 정의서 (PRD - 배경, 문제정의, 타깃, 유저스토리, 기능사양, 비기능 요구사항, 안전성 검토, 검증 지표)',
        concept: '제품 콘셉트 원페이저 (One-Pager - 문제-해결 프레임워크, 엘리베이터 피치, 핵심 차별점, 시장 포지셔닝)',
        market_research: '시장 조사 및 경쟁 분석 보고서 (국내외 시장 현황, 가격 밴드, 기존 제품 페인포인트, 기회 요인과 리스크)',
        interview_script: '보호자 심층 인터뷰(IDI) 질문지 (워밍업, 현재 솔루션의 고통점 탐색, 제품 콘셉트 수용도, 지불의향 및 심리 저항선 검증 질문)',
        survey_questions: '온라인 수요 검증 설문 문항지 (객관식/리커트 척도 문항 10~15개, 스크리닝 질문, 가격 민감도 PSM 포함)',
        prototype_test_plan: 'MVP 시제품 테스트 & 가설 검증 계획서 (테스트 목표, 표본 선정, 1~4주 테스트 로드맵, 안전 프로토콜, 성공 판정 기준)',
        crowdfunding_story: '와디즈/텀블벅 크라우드펀딩 상세페이지 스토리 (강렬한 도입부 후킹 헤드카피, 보호자의 일상 고통 공감 스토리라인, 제품 탄생 비하인드, 기술 차별점, 얼리버드 리워드 패키지 구성안)'
      };

      const prompt = `당신은 최고의 반려견 제품 기획 전문가입니다.
다음 제품 정보를 바탕으로 [${docTypeDescriptions[docType] || docType}] 문서를 전문적이고 완성도 높은 Markdown 포맷으로 작성해주세요.

[제품 데이터]:
- 제품명: ${idea.name}
- 카테고리: ${idea.category}
- 한 줄 요약: ${idea.summary}
- 해결하려는 문제: ${idea.problem}
- 타깃 반려견: ${idea.target_users?.dog}
- 타깃 보호자: ${idea.target_users?.owner}
- 사용 시나리오: ${idea.use_scenario}
- 강아지 혜택 가설: ${idea.dog_benefit_hypothesis}
- 보호자 가치 가설: ${idea.owner_value_hypothesis}
- 핵심 기능: ${idea.key_features?.join(', ')}
- 기존 대안 대비 차별점: ${idea.differentiation}
- 검증해야 할 가정: ${idea.assumptions?.join(' / ')}
- 기존 경쟁 제품: ${idea.competitors?.map((c: any) => `${c.name} (${c.price_display}) - 단점: ${c.cons_painpoints}`).join('; ')}
- 안전 고려사항: ${idea.risks?.map((r: any) => `${r.riskArea}: ${r.description}`).join('; ')}

[작성 지침]:
1. 마크다운 헤더(#, ##, ###), 글머리 기호, 표(Table)를 적절히 활용해 가독성을 극대화하세요.
2. 미확인 정보는 반드시 [가설] 또는 [추가 확인 필요]로 명시하여 객관성을 유지하세요.
3. 안전성 체크(삼킴 방지, 세척 위생, 내구성) 항목을 반드시 포함하세요.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.4,
        },
      });

      res.json({ markdown: response.text });
    } catch (error: any) {
      console.error('Document API Error:', error);
      res.status(500).json({ error: error.message || '문서 생성 중 오류가 발생했습니다.' });
    }
  });

  // 3. 시장 경쟁 심층 분석 API (F-04)
  app.post('/api/gemini/market-analysis', async (req, res) => {
    try {
      const { idea } = req.body;
      if (!ai) {
        return res.json({
          analysis: `### ${idea.name} 시장 분석 리포트\n\n- **국내 시장 현황**: 소형견 중심의 프리미엄 케어 시장 성장세 (연평균 9.8%)\n- **가격대 권장**: 18,000원 ~ 28,000원 구간 (초기 수용도 높음)\n- **경쟁 위협**: 기존 대형 수입 브랜드의 인지도`
        });
      }

      const prompt = `반려견 제품 "${idea.name}" (카테고리: ${idea.category})에 대해 시장 및 경쟁 환경을 심층 분석해주세요.
해결하려는 문제: ${idea.problem}
차별점: ${idea.differentiation}

다음을 분석해주세요:
1. 국내 및 글로벌 유사 제품군 동향 및 가격 밴드
2. 보호자 실제 구매 후기에서 반복적으로 발견되는 고질적 불만(Pain Point) 3가지
3. 본 아이디어가 극복해야 할 제작/양산 난이도 및 규제 리스크
4. 추천 마케팅 소구점 및 초기 GTM(Go-To-Market) 채널 제안`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.5,
        },
      });

      res.json({ analysis: response.text });
    } catch (error: any) {
      console.error('Market Analysis API Error:', error);
      res.status(500).json({ error: error.message || '시장 분석 중 오류가 발생했습니다.' });
    }
  });

  // Serve Frontend
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PawLab Server running on port ${PORT}`);
  });
}

startServer();
