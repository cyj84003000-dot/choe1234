export type IdeaCategory = 
  | 'practical'      // 실용 제품 (산책, 이동, 정리, 청소, 급식 등)
  | 'play'           // 놀이·장난감 (풍부화, 노즈워크, 상호작용)
  | 'wellness'       // 건강·웰빙 보조 (관절, 위생, 휴식, 활동)
  | 'design'         // 디자인·의류·라이프스타일
  | 'hybrid'         // 융합 제품 (카테고리 결합)
  | 'treats';        // 음식·간식 (영양/안전 특별 검토 필요)

export type IdeaStatus = 
  | 'exploring'           // 탐색 중
  | 'researching'         // 조사 중
  | 'pending_validation'  // 검증 대기
  | 'validating'          // 검증 중
  | 'on_hold'             // 보류
  | 'approved';           // 진행 결정

export type ConfidenceStatus = 
  | 'verified'         // 확인된 정보 (신뢰 가능한 출처)
  | 'user_opinion'     // 사용자 의견 (선호나 경험)
  | 'hypothesis'       // 가설 (검증되지 않은 추정)
  | 'needs_source'     // 근거 확인 필요 (출처 부족)
  | 'needs_validation';// 추가 검증 필요 (테스트 필요)

export interface ResearchSource {
  id: string;
  idea_id?: string;
  title: string;
  url?: string;
  publisher: string;
  published_at?: string;
  accessed_at: string;
  claim_supported: string;
  confidence_status: ConfidenceStatus;
  source_quality_note?: string;
}

export interface CompetitorProduct {
  id: string;
  name: string;
  brand: string;
  price_krw: number;
  price_display: string;
  market: 'domestic' | 'global' | 'both';
  pros: string;
  cons_painpoints: string;
  source_ref?: string;
  source_date?: string;
}

export interface IdeaScores {
  problemImportance: number;   // 1~10 문제의 중요도
  willingnessToPay: number;     // 1~10 고객의 비용 지불 의향
  differentiation: number;       // 1~10 기존 대안 대비 차별성
  usability: number;             // 1~10 제품 사용 편의성
  safetyCompliance: number;      // 1~10 안전성 및 규제 용이성
  feasibilityCost: number;       // 1~10 제작 난이도 및 원가 적합성
  scalability: number;           // 1~10 제품군 확장 및 반복구매 가능성
  evidenceConfidence: number;    // 1~10 현재 근거의 신뢰도 (가설 여부 반영)
}

export interface SafetyCheckItem {
  id: string;
  riskArea: string; // e.g., '소형 부품 삼킴/질식', '소재 무독성', '물어뜯기 내구성', '방수/배터리', '세척 위생', '과대 건강표현 금지'
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigation: string;
  checked: boolean;
}

export interface IdeaNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Idea {
  id: string;
  name: string;
  summary: string;
  category: IdeaCategory;
  problem: string;
  target_users: {
    dog: string; // e.g. "소형견(말티즈/포메 등 슬개골 취약견) 및 실내 반려견"
    owner: string; // e.g. "맞벌이 1인가구 또는 산책 후 뒤처리에 피로를 느끼는 보호자"
  };
  use_scenario: string;
  dog_benefit_hypothesis: string;
  owner_value_hypothesis: string;
  key_features: string[];
  differentiation: string;
  competitors: CompetitorProduct[];
  risks: SafetyCheckItem[];
  assumptions: string[]; // 검증해야 할 가정
  validation_plan: string[]; // 다음 단계 제안 (인터뷰, 설문, 랜딩페이지, 시제품 등)
  status: IdeaStatus;
  scores: IdeaScores;
  sources: ResearchSource[];
  notes: IdeaNote[];
  created_at: string;
  updated_at: string;
}

export interface ProblemOpportunity {
  id: string;
  title: string;
  category: IdeaCategory;
  affected_target: string;
  current_solution: string;
  limitations: string;
  frequency: string;
  unverified_assumptions: string;
  opportunity_concept: string;
  linked_idea_id?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
  extractedIdea?: Partial<Idea>;
  confidenceTag?: ConfidenceStatus;
}

export type DocumentType = 
  | 'prd'                  // 제품 요구사항 정의서 (PRD)
  | 'concept'              // 제품 콘셉트 원페이저
  | 'market_research'      // 시장 조사 보고서
  | 'competitor_matrix'    // 경쟁 제품 비교표
  | 'interview_script'     // 보호자 인터뷰 질문지 (IDI)
  | 'survey_questions'     // 온라인 수요 검증 설문지
  | 'prototype_test_plan'  // 시제품 테스트 & 가설 검증 계획서
  | 'crowdfunding_story';  // 와디즈/텀블벅 크라우드펀딩 상세페이지 스토리 기획서

export interface GeneratedDocument {
  id: string;
  idea_id: string;
  idea_name: string;
  doc_type: DocumentType;
  title: string;
  markdown_content: string;
  created_at: string;
}

export interface InterviewRecord {
  id: string;
  idea_id: string;
  interviewee_name: string;
  dog_profile: string; // e.g., "포메라니안 3세 (3.4kg), 실내배변"
  key_quote: string; // 보호자 생생한 한마디
  pain_points: string[];
  price_acceptable_krw: number;
  hypothesis_verdict: 'validated' | 'invalidated' | 'inconclusive'; // 가설 검증 결과
  feature_requests: string[];
  created_at: string;
}

export interface CostModel {
  idea_id: string;
  retail_price: number;              // 소비자가격 (KRW)
  tooling_cost: number;              // 초기 금형/설계 고정비 (KRW)
  bom_material_cost: number;         // 개당 원부자재비 (KRW)
  packaging_cost: number;            // 패키지/포장재비 (KRW)
  assembly_labor_cost: number;       // 조립/가공비 (KRW)
  shipping_logistics_cost: number;   // 택배/물류비 (KRW)
  platform_fee_percent: number;      // 플랫폼 수수료율 (%)
  ad_cac_cost: number;               // 개당 광고마케팅비 CAC (KRW)
  moq: number;                       // 초도 생산 수량 (개)
}

export interface DogErgonomicsProfile {
  sizeClass: 'toy' | 'small' | 'medium' | 'large' | 'giant';
  label: string;
  weightRange: string;
  neckGirthCm: string;
  chestGirthCm: string;
  backLengthCm: string;
  shoulderHeightCm: string;
  dailyWaterMl: string;
  feederHeightCm: string;
  slopeAngleDeg: string;
  biteForcePsi: string;
  typicalBreeds: string[];
}

