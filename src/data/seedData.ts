import { Idea, ProblemOpportunity, ResearchSource } from '../types';

export const NAMING_CANDIDATES = [
  {
    english: 'PawLab',
    korean: '포랩',
    meaning: 'Paw(발) + Lab(연구실). 반려견 제품 아이디어를 체계적으로 탐구하고 실험·검증하는 공간',
    fit: '제품 탐색·검증 플랫폼 (초기 추천 1순위)',
    recommended: true,
    pros: '전문적이면서 기억하기 쉽고, 전 카테고리/견종 확장 가능',
    cons: 'Paw 들어간 유사 브랜드 존재 여부 사전 상표 체크 필요'
  },
  {
    english: 'MONGROUND',
    korean: '몽그라운드',
    meaning: '몽(강아지의 몽실한 이미지) + Ground(기반·터전). 아이디어가 자라는 기반',
    fit: '따뜻한 커뮤니티형 플랫폼',
    recommended: false,
    pros: '친근하고 따뜻한 어감, 보호자 친화적',
    cons: '연구/검증/분석 툴로서의 전문적 인상은 다소 약할 수 있음'
  },
  {
    english: 'PAWESOME',
    korean: '포썸',
    meaning: 'Paw + Awesome의 말장난. 즐겁고 긍정적인 반려견 아이디어 공간',
    fit: '대중적이고 친근한 서비스',
    recommended: false,
    pros: '밝고 긍정적인 브랜드 이미지',
    cons: '아이디어 검증 B2B/기획 플랫폼보다는 커머스나 팬덤에 가까움'
  },
  {
    english: 'PAWPATH',
    korean: '포패스',
    meaning: '반려견에게 더 나은 제품과 생활로 가는 여정이자 길',
    fit: '탐색에서 실행까지 이어지는 서비스',
    recommended: false,
    pros: '프로세스와 여정(로드맵)을 잘 표현',
    cons: '패스(Pass/Path) 단어가 다른 교통/구독 서비스와 혼동 소지'
  },
  {
    english: 'TTAILOR',
    korean: '테일러',
    meaning: 'Tail(꼬리) + Tailor(맞춤 재단). 반려견의 세심한 필요에 맞춘 설계',
    fit: '디자인·맞춤형 제품 중심',
    recommended: false,
    pros: '정교함과 고급스러운 뉘앙스',
    cons: '의류나 패션 분야에 편향될 수 있음'
  },
  {
    english: 'Pawform',
    korean: '포폼',
    meaning: 'Paw + Form. 반려견을 위한 제품 형태와 사용 경험을 세심하게 조형',
    fit: '디자인과 하드웨어 제품 개발 중심',
    recommended: false,
    pros: '플랫폼(Platform)과 폼(Form)의 중의적 세련미',
    cons: '일반 소비자에게는 다소 추상적'
  },
  {
    english: 'Mong Maker',
    korean: '몽메이커',
    meaning: '반려견을 위한 새로운 것을 만드는 창작자와 도구',
    fit: '창작·아이디어 개발 중심',
    recommended: false,
    pros: '제작자 중심의 직관적인 메시지',
    cons: 'DIY 키트나 단순 제작 툴로 오인 가능'
  },
  {
    english: 'Pawwise',
    korean: '포와이즈',
    meaning: 'Paw + Wise. 더 현명하고 데이터 기반의 반려견 제품 개발과 선택',
    fit: '정보·근거 중심 플랫폼',
    recommended: false,
    pros: '신뢰성 및 지적 엄밀함 강조',
    cons: '발음이 약간 어렵고 해외 유사 스타트업 다수'
  }
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    name: '포우딥 올인원 워시 캡슐',
    summary: '산책 직후 발바닥에 묻은 미세 모래와 오염을 털어내고, 물 없이 식물성 저자극 폼으로 세정·보습까지 30초 만에 끝내는 휴대용 디스펜서',
    category: 'practical',
    problem: '산책 후 매번 화장실에서 발을 물로 씻기면 발가락 사이 습진(지간염)이 생기기 쉽고, 물티슈는 미세 흙먼지와 모래를 긁어내지 못해 피부 자극을 유발함. 보호자도 귀가 후 뒤처리에 피로를 느낌.',
    target_users: {
      dog: '발 피부가 약한 소·중형견 (비숑, 말티즈, 푸들) 및 매일 1~2회 이상 실외 배변/산책하는 반려견',
      owner: '퇴근 후 산책 뒤처리가 번거롭거나, 반려견 발 습진으로 병원 진료를 반복하는 1인/맞벌이 보호자'
    },
    use_scenario: '현관문 앞에서 신발을 벗기 전, 캡슐 뚜껑을 열고 반려견 발을 쏙 넣고 펌핑하면 부드러운 실리콘 브러시가 흙을 털어주며 미세 버블이 분사됨. 마른 수건 한 번만 스치면 끝.',
    dog_benefit_hypothesis: '물에 완전히 젖지 않아 건조 시간이 90% 단축되며, 발가락 사이 습진(지간염) 발생 빈도가 현저히 감소할 것',
    owner_value_hypothesis: '화장실로 강아지를 안고 가 씻기고 드라이어로 말리는 15분의 수고를 현관 앞 1분으로 단축',
    key_features: [
      '의료용 저자극 실리콘 브러시 일체형 캡슐 헤드 (분리 세척 가능)',
      '물로 헹굴 필요 없는(No-rinse) 병풀 추출물+세라마이드 E-WG 올그린 세정 폼',
      '외출 가방이나 리드줄에 걸 수 있는 가벼운 카라비너 결합형 바디',
      '리필 팩 교체형 친환경 용기 구조'
    ],
    differentiation: '기존 시판 발세정제는 "단순 물티슈"이거나 "수동 펌프+수건 필요"인 반면, 본 제품은 미세모래 물리적 스크러빙과 린스리스 화학적 세정을 한 손 조작 캡슐 하나로 통합',
    competitors: [
      {
        id: 'c1',
        name: 'D사 강아지 노워시 풋샴푸',
        brand: 'D Brand',
        price_krw: 16900,
        price_display: '16,900원',
        market: 'domestic',
        pros: '거품 분사 간편, 허브 향기',
        cons_painpoints: '모래 알갱이가 털 사이에 남아 결국 물로 씻어야 한다는 불만 리뷰가 전체의 34%',
        source_ref: '네이버 쇼핑 및 쿠팡 상위 1,000건 리뷰 분석',
        source_date: '2026-03'
      },
      {
        id: 'c2',
        name: 'Dexas MudBuster 발세척 컵',
        brand: 'Dexas (미국 수입)',
        price_krw: 22000,
        price_display: '22,000원',
        market: 'global',
        pros: '실리콘 돌기가 모래를 잘 씻어냄',
        cons_painpoints: '물을 담아 써야 해서 엎지르기 쉽고, 씻긴 후 발을 말려야 하는 번거로움 동일',
        source_ref: 'Amazon US & 국내 수입 쇼핑몰 리뷰',
        source_date: '2026-01'
      }
    ],
    risks: [
      {
        id: 'r1',
        riskArea: '소재 및 성분 안전성',
        severity: 'high',
        description: '강아지가 발을 핥을 경우(Grooming) 거품 성분이 체내 흡수될 수 있음',
        mitigation: '전성분 식품첨가물 및 EWG 그린 등급 배합, 핥아도 무해한 동물용 의약외품 허가 기준 사전 확인',
        checked: true
      },
      {
        id: 'r2',
        riskArea: '세척 및 위생',
        severity: 'medium',
        description: '실리콘 브러시 헤드에 곰팡이나 세균 번식 가능성',
        mitigation: '헤드 원터치 분리 구조 및 항균 실리콘 소재 채택, 식기세척기 열탕 소독 가능 설계',
        checked: true
      },
      {
        id: 'r3',
        riskArea: '과대 건강 효능 광고 리스크',
        severity: 'medium',
        description: '"지간염 완치" 등 치료 효능 표기 시 약사법 위반',
        mitigation: '"위생적 발 청결 관리 보조", "청결 습관 도움" 수준으로 소구 문구 제한',
        checked: false
      }
    ],
    assumptions: [
      '보호자는 15,000~19,000원의 가격에 폼 리필(월 6,000원)을 지속 구매할 의향이 있다.',
      '강아지가 발을 캡슐 입구에 넣을 때 거부감이 크지 않을 것이다 (구경과 부드러움의 밸런스 필요).'
    ],
    validation_plan: [
      '1단계: 산책 잦은 견주 20명 대상 기존 발세정 방식 및 지간염 관리 심층 인터뷰(IDI)',
      '2단계: 3D 프린터 시제품 브러시 캡슐로 실내 반려견 10마리 적용성 및 거부 반응 테스트',
      '3단계: 와디즈/텀블벅 크라우드펀딩 사전 알림 랜딩페이지로 전환율(CVR 7% 이상) 검증'
    ],
    status: 'validating',
    scores: {
      problemImportance: 9,
      willingnessToPay: 8,
      differentiation: 8,
      usability: 9,
      safetyCompliance: 8,
      feasibilityCost: 8,
      scalability: 9,
      evidenceConfidence: 7
    },
    sources: [
      {
        id: 's1',
        title: '반려견 피부 질환 1위는 아토피와 지간염 (동물병원 내원 사유 분석)',
        url: 'https://example.com/pet-dermatology-stats',
        publisher: '한국수의피부학회 학술지 인용 통계',
        published_at: '2025-11',
        accessed_at: '2026-10-15',
        claim_supported: '잦은 물 세척과 불완전한 건조가 지간염 주요 악화 요인 중 41% 차지',
        confidence_status: 'verified',
        source_quality_note: '공식 학회지 발표 임상 데이터'
      },
      {
        id: 's2',
        title: '포우딥 예상 제조 원가 및 금형 견적 가설',
        publisher: '자체 금형/사출 협력사 1차 구두 견적',
        accessed_at: '2026-10-16',
        claim_supported: '초기 금형 2벌 기준 800만원 소요, 개당 양산 단가 3,200원 예상',
        confidence_status: 'hypothesis',
        source_quality_note: '정밀 도면 작성 후 2차 정밀 견적 필요'
      }
    ],
    notes: [
      {
        id: 'n1',
        author: '기획팀',
        content: '소형견용(구경 45mm)과 중대형견용(구경 70mm) 실리콘 인서트 2종을 분리 제공하는 것이 견종 범용성에 필수적임.',
        createdAt: '2026-10-16 14:20'
      }
    ],
    created_at: '2026-10-16T10:00:00Z',
    updated_at: '2026-10-16T16:30:00Z'
  },
  {
    id: 'idea-2',
    name: '허그비트 분리불안 완화 하트비트 필로우',
    summary: '보호자가 외출할 때 반려견에게 어미견 품의 온기와 60~80bpm의 실제 심장 박동 리듬을 전달하는 체온 유지 겔 내장 릴랙싱 쿠션',
    category: 'wellness',
    problem: '1인 가구 증가로 반려견이 혼자 7~9시간 이상 방치될 때 짖음, 하울링, 벽지 긁기 등 분리불안 증세가 심화됨. 기존 스마트캠은 일방적 음성 전달만 되어 강아지를 더 흥분시키는 역효과가 잦음.',
    target_users: {
      dog: '입양 6개월 미만 어린 강아지, 유기견 출신, 혹은 보호자 부재 시 극도의 불안을 보이는 소형견',
      owner: '출근 후 이웃의 소음 민원이 두렵고, 혼자 둔 강아지에게 죄책감을 느끼는 직장인 보호자'
    },
    use_scenario: '출근 전 쿠션 중앙의 센서 버튼을 누르면 부드러운 박동(햅틱 펄스)과 38도 미온이 4시간 동안 활성화되어 강아지가 자연스럽게 턱을 괴고 잠에 듦.',
    dog_benefit_hypothesis: '생체 모방 심박 리듬과 미온 접촉을 통해 침 내 코르티솔(스트레스 호르몬) 수치가 30% 이상 감소할 것',
    owner_value_hypothesis: '외출 중 소음 민원 불안 감소 및 반려견에 대한 심리적 안도감 제공',
    key_features: [
      '생체 모방형 무소음 저주파 햅틱 심박 엔진 (분당 65~75회 리듬)',
      '반려견 체온(38.5도)에 최적화된 저전압 PTC 미온 발열 패드 (과열 자동 차단)',
      '보호자의 냄새가 밴 헌 옷을 넣을 수 있는 시크릿 파우치 포켓',
      '물어뜯기 방지 2중 지퍼 및 방수 이너 커버, 세탁 가능한 오가닉 코튼 외피'
    ],
    differentiation: '기존 미국산 하트비트 인형(스마트펫러브)은 배터리가 빨리 닳고 기계음이 들리며 세탁이 어려움. 허그비트는 무소음 모듈 + 온열 겔 + 보호자 체취 수납 포켓을 결합한 인테리어형 쿠션',
    competitors: [
      {
        id: 'c2-1',
        name: 'SmartPetLove Snuggle Puppy',
        brand: 'SmartPetLove (미국)',
        price_krw: 59000,
        price_display: '59,000원',
        market: 'global',
        pros: '글로벌 베스트셀러, 심박 모듈 탑재',
        cons_painpoints: '인형 형태라 쉽게 물어뜯겨 솜이 튀어나옴, 온열 팩이 1회용이라 유지비 부담 (월 2만원 추가)',
        source_ref: 'Amazon 4.5만개 리뷰 및 국내 직구 후기',
        source_date: '2026-02'
      }
    ],
    risks: [
      {
        id: 'r2-1',
        riskArea: '전자 부품 및 배터리 안전',
        severity: 'critical',
        description: '강아지가 이빨로 쿠션을 물어뜯어 내부 리튬 배터리를 씹을 경우 화재/폭발 치명적 위험',
        mitigation: '탈착식 기구박스는 씹힘 방지 알루미늄/강화PC 케이스로 2중 밀폐, 충전형 배터리 대신 저전압 AA 배터리 또는 분리형 격벽 설계',
        checked: true
      },
      {
        id: 'r2-2',
        riskArea: '삼킴 및 질식',
        severity: 'high',
        description: '인형 눈알이나 지퍼 손잡이를 삼킬 위험',
        mitigation: '자수 처리 마감, 노출 부속품 제로화, 숨김 지퍼 구조',
        checked: true
      }
    ],
    assumptions: [
      '성견에서도 심박 박동 인형이 유효한 진정 반응을 일으키는가? (현재는 주로 자견 대상 검증됨)',
      '5~6만원대 프리미엄 쿠션 가격에 대한 국내 소비자의 저항선 검증 필요'
    ],
    validation_plan: [
      '분리불안 전문 훈련사 5인 자문 및 프로토타입 반응 관찰',
      '반려견 호텔 및 유치원 2곳과 제휴해 낮잠 시간 1주일 간 필드 B/A 테스트',
      '와디즈 오픈예정 페이지 개설로 얼리어답터 500명 사전 모객'
    ],
    status: 'researching',
    scores: {
      problemImportance: 9,
      willingnessToPay: 9,
      differentiation: 7,
      usability: 8,
      safetyCompliance: 6,
      feasibilityCost: 6,
      scalability: 8,
      evidenceConfidence: 6
    },
    sources: [
      {
        id: 's2-1',
        title: '반려견의 모체 심박음 청각 및 촉각 자극이 분리 불안 행동에 미치는 영향',
        publisher: '한국동물매개심리치료학회지',
        published_at: '2024-08',
        accessed_at: '2026-10-14',
        claim_supported: '심박 펄스 접촉 시 울음 빈도 47% 감소 보고 (표본 24두)',
        confidence_status: 'verified',
        source_quality_note: '소규모 표본(24두)이나 통계적 유의성(p<0.05) 확보'
      }
    ],
    notes: [],
    created_at: '2026-10-15T09:00:00Z',
    updated_at: '2026-10-16T11:15:00Z'
  },
  {
    id: 'idea-3',
    name: '어댑트스텝 모듈러 관절 슬로프',
    summary: '소형견 슬개골 탈구 방지를 위해 소파·침대 높이에 따라 각도(15~35도)를 부드럽게 무단 조절하며, 인간 가구와 이질감 없이 조화되는 자작나무 모듈형 슬로프',
    category: 'wellness',
    problem: '국내 소형견의 70% 이상이 슬개골 탈구 1~3기를 앓고 있음. 시중의 스펀지 계단은 발이 푹 꺼져 오히려 인대에 비틀림 충격을 주고, 슬로프형은 부피가 너무 커 거실 인테리어를 해침.',
    target_users: {
      dog: '포메라니안, 말티즈, 푸들, 비숑 등 슬개골 탈구 취약 소형견 및 관절염 노령견',
      owner: '강아지 건강도 챙기면서 인테리어(미니멀/우드 톤)를 절대 포기하고 싶지 않은 신혼/2030 보호자'
    },
    use_scenario: '침대 높이(45cm)든 거실 낮은 소파(30cm)든 상단 다이얼을 돌리면 유압 댐퍼로 경사각이 맞춰지고, 접으면 두께 8cm로 침대 밑에 쏙 수납됨.',
    dog_benefit_hypothesis: '발 디딤 면의 논슬립 탄성 코르크 소재로 미끄러짐 제로화 및 착지 충격 65% 완화',
    owner_value_hypothesis: '원목 가구 감성으로 거실에 두어도 흉물스럽지 않고 손님 방문 시 1초 만에 접어서 보관',
    key_features: [
      '원터치 유압식 무단 높이 조절 (30cm ~ 55cm 자유 세팅)',
      '발톱 걸림 없는 천연 항균 코르크 미끄럼 방지 패드 (교체형 자석 부착식)',
      '최대 30kg 하중 지지 E0 친환경 자작나무 합판 바디',
      '폴딩 시 두께 8cm 초슬림 플랫 보관 구조'
    ],
    differentiation: '투박한 PU 레더 스펀지 계단 일색의 시장에서 "가구급 디자인 + 유압 슬라이딩 경사각 조절"로 포지셔닝',
    competitors: [
      {
        id: 'c3-1',
        name: '디킨즈 3단 스펀지 스텝',
        brand: '디킨즈',
        price_krw: 39000,
        price_display: '39,000원',
        market: 'domestic',
        pros: '저렴한 가격, 가벼운 무게',
        cons_painpoints: '스펀지가 6개월 만에 꺼짐, 강아지가 계단을 뛰어넘어 착지할 때 관절 충격 여전함',
        source_ref: '쿠팡 구매평 3,500건 분석',
        source_date: '2026-03'
      },
      {
        id: 'c3-2',
        name: '펫디 원목 슬라이드 계단',
        brand: '펫디',
        price_krw: 129000,
        price_display: '129,000원',
        market: 'domestic',
        pros: '원목 프레임, 튼튼함',
        cons_painpoints: '각도 조절이 3단계로 제한적이고 무게가 7kg에 달해 청소할 때 옮기기 극히 무거움',
        source_ref: '스마트스토어 리뷰',
        source_date: '2026-02'
      }
    ],
    risks: [
      {
        id: 'r3-1',
        riskArea: '물리적 전도 및 틈새 끼임',
        severity: 'high',
        description: '강아지가 뛰어올라갈 때 슬로프가 옆으로 흔들리거나 발이 틈새에 끼일 위험',
        mitigation: '하단 와이드 고무 받침 설계로 전도 방지, 모든 경첩 접합부 제로갭(Gap-free) 안전 덮개 적용',
        checked: true
      }
    ],
    assumptions: [
      '소비자가 89,000~109,000원의 고단가 원목 슬로프에 대해 슬개골 수술비(100~300만원) 예방 가치로 납득할 것인가?',
      '코르크 패드의 마모 주기 및 배변 실수 시 방수 세척성 검증 필요'
    ],
    validation_plan: [
      '슬개골 수술 이력 견주 30명 대상 가격 수용도 조사 (PSM 모델)',
      '반려견 재활 전문 동물병원 원장 피드백 및 각도별 보행 분석 테스트',
      '네이버 반려견 카페 체험단 10명 운영'
    ],
    status: 'approved',
    scores: {
      problemImportance: 10,
      willingnessToPay: 8,
      differentiation: 9,
      usability: 9,
      safetyCompliance: 9,
      feasibilityCost: 7,
      scalability: 7,
      evidenceConfidence: 8
    },
    sources: [
      {
        id: 's3-1',
        title: '국내 반려견 품종 분포와 슬개골 탈구 유병률 (농림축산검역본부 자료)',
        publisher: '농림축산식품부 동물복지백서',
        published_at: '2025-09',
        accessed_at: '2026-10-10',
        claim_supported: '말티즈, 포메라니안, 푸들이 전체 등록견의 52% 차지, 이 중 슬개골 질환 경험률 68%',
        confidence_status: 'verified',
        source_quality_note: '공공 데이터 기반 공신력 높음'
      }
    ],
    notes: [],
    created_at: '2026-10-14T11:00:00Z',
    updated_at: '2026-10-16T18:00:00Z'
  },
  {
    id: 'idea-4',
    name: '스누프랙 스마트 노즈워크 퍼즐 볼',
    summary: '강아지가 굴리거나 코로 밀면 후각 난이도가 1~4단계로 자동 변화하며 간식을 보상하고, 모든 부품이 식기세척기에서 100% 완전 분해 세척되는 위생 퍼즐 토이',
    category: 'play',
    problem: '시중의 천 재질 노즈워크 매트는 강아지 침과 먼지가 엉겨 세균과 진드기의 온상이 되고 빨래가 번거로움. 플라스틱 퍼즐볼은 난이도 조절이 안 되어 5분 만에 간식을 다 먹고 흥미를 잃음.',
    target_users: {
      dog: '에너지가 넘치는 활발한 소·중형견 (잭러셀, 웰시코기, 시바, 푸들 등) 및 분리불안 완화가 필요한 강아지',
      owner: '장난감 세탁 관리에 질렸거나 비 오는 날 실내에서 30분 이상 강아지 집중력을 유지시키고 싶은 보호자'
    },
    use_scenario: '간식을 넣고 난이도 링을 돌려 세팅한 뒤 바닥에 놓아주면, 강아지가 코로 굴릴 때마다 미로 터널을 지나 1알씩 랜덤하게 배출됨.',
    dog_benefit_hypothesis: '급체 방지(슬로우 피딩)와 함께 두뇌 후각 활동으로 20분 놀이만으로 산책 40분 분량의 만족감 제공',
    owner_value_hypothesis: '천 노즈워크 빨래 지옥 해방, 100% 식기세척기 살균 세척 가능',
    key_features: [
      '비틀어 열면 내부 터널까지 노출되는 트위스트 완전 분해 구조 (특허 출원)',
      'E-WG 및 미국 FDA 인증 유아 젖병용 트라이탄(Tritan) 및 식품용 실리콘 소재',
      '소음 저감형 외벽 소프트 실리콘 범퍼 (층간소음 제로)',
      '다이얼식 4단계 배출 구경 조절 (초보견부터 천재견까지 대응)'
    ],
    differentiation: '기존 퍼즐토이의 최대 단점인 "내부 세척 불가능(침 썩음)"을 트위스트 모듈 분해로 완전히 해결하고 층간소음 방지 범퍼 일체화',
    competitors: [
      {
        id: 'c4-1',
        name: 'Kong 클래식 간식 토이',
        brand: 'KONG (미국)',
        price_krw: 18000,
        price_display: '18,000원',
        market: 'global',
        pros: '극강의 내구성, 천연 고무',
        cons_painpoints: '내부 좁은 구멍 속 간식 찌꺼기를 솔로 닦아내기 매우 힘들고 고무 냄새가 역하다는 의견 다수',
        source_ref: '네이버 블로그 및 네이버 쇼핑',
        source_date: '2026-01'
      }
    ],
    risks: [
      {
        id: 'r4-1',
        riskArea: '물어뜯기 내구성 및 파편',
        severity: 'high',
        description: '치악력이 강한 중형견이 씹어 깨뜨려 플라스틱 파편을 삼킬 위험',
        mitigation: '충격에 깨지지 않는 방탄 유리 소재 트라이탄 채택 및 100kg 하중 낙하 테스트 통과 기준 수립',
        checked: true
      }
    ],
    assumptions: [
      '국내 아파트 거주 환경에서 바닥 구르는 소음(층간소음) 방지 성능이 구매 결정의 40% 이상을 좌우할 것이다.'
    ],
    validation_plan: [
      '층간소음 측정기로 마루 바닥 굴림 소음(dB) 기존 제품 대비 비교 실험',
      '다양한 견종(소형~중형 15두) 대상 퍼즐 완주 시간 및 세척 만족도 블라인드 테스트'
    ],
    status: 'pending_validation',
    scores: {
      problemImportance: 8,
      willingnessToPay: 8,
      differentiation: 8,
      usability: 10,
      safetyCompliance: 9,
      feasibilityCost: 8,
      scalability: 9,
      evidenceConfidence: 7
    },
    sources: [],
    notes: [],
    created_at: '2026-10-16T12:00:00Z',
    updated_at: '2026-10-16T15:00:00Z'
  },
  {
    id: 'idea-5',
    name: '이지락 3in1 핸즈프리 텐션 리드줄',
    summary: '급작스러운 뜀박질 시 보호자 손목과 강아지 목의 충격을 80% 흡수하는 번지 쿠션과 원터치 크로스백 착용, 매너 배변봉투 캡슐이 하나로 결합된 산책줄',
    category: 'practical',
    problem: '강아지가 고양이나 다른 개를 보고 갑자기 돌진할 때 보호자 손목/어깨 관절 부상 위험. 양손에 똥봉투와 폰을 들고 산책하느라 제어력 상실.',
    target_users: {
      dog: '산책 시 줄 당김(Pulling)이 심한 5~15kg 중소형견',
      owner: '산책 중 손목 통증을 겪거나 커피를 들고 편하게 산책하고 싶은 활동적 보호자'
    },
    use_scenario: '어깨에 크로스백처럼 메고 걷다가, 위험 상황 시 줄 중앙의 세컨드 트래픽 핸들을 잡아 즉시 1초 밀착 제어 가능.',
    dog_benefit_hypothesis: '목과 흉부에 전달되는 충격 피크치가 분산되어 기관지 협착증(기침) 예방',
    owner_value_hypothesis: '스마트폰 조작이나 우산 들기가 자유로워지는 핸즈프리 자유도와 관절 충격 감소',
    key_features: [
      '특수 복원력 고밀도 듀얼 번지 스트랩 (반복 인장 1만회 피로 시험 통과)',
      '항공기용 두랄루민 원터치 마그네틱 안전 버클 (최대 120kg 인장 하중)',
      '방수 리드줄 손잡이 일체형 배변봉투 롤 디스펜서',
      '야간 360도 초고휘도 반사 스티칭'
    ],
    differentiation: '기존 자동줄(늘어나는 줄)의 고장/손베임 위험과 무거운 무게를 없애고, 인체공학적 크로스 착용과 긴급 제어 핸들 제공',
    competitors: [
      {
        id: 'c5-1',
        name: 'FLEXI 자동줄 뉴클래식',
        brand: '플렉시 (독일)',
        price_krw: 28000,
        price_display: '28,000원',
        market: 'global',
        pros: '줄 길이 조절 편리',
        cons_painpoints: '손에서 놓치면 강아지 쪽으로 튀어가 공포 유발, 줄을 손으로 잡다 마찰 화상 위험 잦음',
        source_ref: '소비자원 위해정보 및 반려견 커뮤니티',
        source_date: '2025-12'
      }
    ],
    risks: [
      {
        id: 'r5-1',
        riskArea: '부품 결합 내구성',
        severity: 'critical',
        description: '카라비너나 버클이 풀리면 도로로 강아지가 뛰어나가 로드킬 위험',
        mitigation: '이중 안전 잠금(Double Lock) 등산용 규격 카라비너 의무 적용 및 전수 하중 검사',
        checked: true
      }
    ],
    assumptions: [
      '보호자들은 자동줄의 위험성에 공감하고 고정형 크로스 텐션줄로 전환할 충분한 동기가 있다.'
    ],
    validation_plan: [
      '줄 당김 훈련 전문 반려견 유튜브 채널 협업 영상 리뷰',
      '오프라인 펫페어 현장 인장력 체험 부스 운영'
    ],
    status: 'exploring',
    scores: {
      problemImportance: 8,
      willingnessToPay: 7,
      differentiation: 7,
      usability: 9,
      safetyCompliance: 9,
      feasibilityCost: 8,
      scalability: 8,
      evidenceConfidence: 7
    },
    sources: [],
    notes: [],
    created_at: '2026-10-16T14:00:00Z',
    updated_at: '2026-10-16T14:00:00Z'
  }
];

export const INITIAL_PROBLEMS: ProblemOpportunity[] = [
  {
    id: 'prob-1',
    title: '산책 후 젖은 발 뒤처리와 만성 발가락 지간염',
    category: 'practical',
    affected_target: '비숑, 말티즈, 푸들 등 발바닥 털이 많은 실내 소형견 및 1인 가구 보호자',
    current_solution: '화장실에서 물로 씻긴 후 드라이어로 말리거나, 시판 노워시 풋샴푸/물티슈로 닦아냄',
    limitations: '물 세척은 피부 보호막을 손상시켜 습진을 유발하고 30분 이상 소요. 풋샴푸는 미세 모래가 그대로 남아 서걱거림.',
    frequency: '매일 1~3회 (산책할 때마다 발생)',
    unverified_assumptions: '보호자는 캡슐 형태의 물리 세정 브러시가 있을 때 물 세척을 80% 이상 대체할 것이다.',
    opportunity_concept: '모래 탈락 물리 브러시 + 린스리스 세정 폼이 결합된 30초 원스톱 발세정 캡슐',
    linked_idea_id: 'idea-1',
    created_at: '2026-10-15T10:00:00Z'
  },
  {
    id: 'prob-2',
    title: '1인 가구 반려견의 분리불안 및 외출 중 짖음/하울링',
    category: 'wellness',
    affected_target: '어린 강아지 및 유기견 출신 반려견, 소음 민원에 시달리는 직장인 보호자',
    current_solution: '홈캠 스피커로 목소리 들려주기, 노즈워크 간식 뿌려두기, 라디오 켜두기',
    limitations: '홈캠 음성은 체온과 신체 접촉이 없어 불안을 오히려 자극함. 간식은 10분 만에 다 먹고 다시 불안 시작.',
    frequency: '보호자 출근 시 주 5일, 회당 8~10시간 지속',
    unverified_assumptions: '체온 유지와 모체 심장 박동 자극이 성견에서도 스트레스 호르몬을 진정시킬 것인가?',
    opportunity_concept: '체온 겔 + 무소음 저주파 심박 펄스 + 보호자 체취 파우치가 내장된 수면 필로우',
    linked_idea_id: 'idea-2',
    created_at: '2026-10-15T11:00:00Z'
  },
  {
    id: 'prob-3',
    title: '소형견 슬개골 탈구 충격과 스펀지 계단의 한계',
    category: 'wellness',
    affected_target: '국내 등록견의 50% 이상을 차지하는 소형견 및 인테리어 중시 보호자',
    current_solution: '스펀지 계단 또는 플라스틱 슬로프',
    limitations: '스펀지는 디딜 때 발이 푹 꺼져 관절 비틀림 유발, 슬로프는 너무 크고 투박해 거실 인테리어 파괴.',
    frequency: '소파와 침대를 하루 수십 번 뛰어오르내릴 때마다',
    unverified_assumptions: '소비자가 8~10만원대의 원목 유압 무단조절 슬로프를 예방 가치로 구입할 것인가?',
    opportunity_concept: '가구 일체형 자작나무 원목 + 유압식 무단 각도 조절 + 슬림 폴딩 보관 슬로프',
    linked_idea_id: 'idea-3',
    created_at: '2026-10-15T12:00:00Z'
  },
  {
    id: 'prob-4',
    title: '천 노즈워크 장난감의 침 범벅 세균 번식과 세탁 곤란',
    category: 'play',
    affected_target: '후각 놀이가 필요한 실내견 및 장난감 냄새와 위생에 민감한 보호자',
    current_solution: '부직포/패브릭 노즈워크 매트',
    limitations: '침과 먼지가 엉겨 진드기 발생, 손빨래가 번거로워 한 번 더러워지면 방치됨.',
    frequency: '주 3~5회 놀이 시 매번 침 오염',
    unverified_assumptions: '단단한 플라스틱 퍼즐도 아파트 층간소음이 없다면 천 장난감보다 훨씬 선호될 것이다.',
    opportunity_concept: '전 부품 트위스트 완전 분해 + 100% 식기세척기 살균 + 층간소음 방지 범퍼 퍼즐 볼',
    linked_idea_id: 'idea-4',
    created_at: '2026-10-15T13:00:00Z'
  },
  {
    id: 'prob-5',
    title: '돌발 질주 시 보호자 손목 부상 및 자동줄 줄꼬임 사고',
    category: 'practical',
    affected_target: '줄 당김이 심한 에너제틱 중소형견 및 관절이 약한 보호자',
    current_solution: '플라스틱 손잡이 자동 리드줄',
    limitations: '급정지 시 손가락/손목에 강한 충격, 줄 놓침 사고 시 반려견 트라우마 및 로드킬 위험.',
    frequency: '산책 중 돌발 상황 발생 시 (주 2~3회)',
    unverified_assumptions: '보호자들은 핸즈프리 크로스 착용과 텐션 충격 완화 구조에 4~5만원을 지불할 것이다.',
    opportunity_concept: '듀얼 번지 텐션 흡수 + 두랄루민 버클 + 크로스백 핸즈프리 리드줄',
    linked_idea_id: 'idea-5',
    created_at: '2026-10-15T14:00:00Z'
  },
  {
    id: 'prob-6',
    title: '비 오는 날 우비 착용 거부와 하부 흙탕물 튐',
    category: 'design',
    affected_target: '다리가 짧은 닥스훈트/웰시코기 및 비 오는 날에도 꼭 실외 배변해야 하는 반려견',
    current_solution: '전신 올인원 비옷',
    limitations: '입히는 데 10분 이상 걸려 강아지가 도망치고 얼어붙어(Freezing) 걷지 않음. 배 밑부분은 흙탕물로 다 젖음.',
    frequency: '우천 및 눈 오는 날씨',
    unverified_assumptions: '발을 끼우지 않는 망토형에 하부 방수 머드가드만 자석 체결하는 방식이 스트레스를 80% 줄일 것이다.',
    opportunity_concept: '3초 착용 자석 퀵 버클 + 배 밑 흙탕물 차단 머드가드 일체형 레인코트',
    created_at: '2026-10-16T10:00:00Z'
  }
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
  practical: {
    label: '실용 제품',
    icon: 'Sparkles',
    desc: '산책, 이동, 위생, 청소, 급식 등 일상 불편 해소'
  },
  play: {
    label: '놀이·장난감',
    icon: 'Gamepad2',
    desc: '풍부화(Enrichment), 후각 탐색, 보호자 상호작용'
  },
  wellness: {
    label: '건강·웰빙 보조',
    icon: 'HeartPulse',
    desc: '관절, 수면, 체온, 스트레스 완화 등 신체 케어'
  },
  design: {
    label: '디자인·라이프스타일',
    icon: 'Palette',
    desc: '홈 인테리어 조화 및 세련된 아웃도어 의류/소품'
  },
  hybrid: {
    label: '새로운 융합 제품',
    icon: 'Layers',
    desc: '기존 카테고리 경계를 넘나드는 복합 솔루션'
  },
  treats: {
    label: '음식·간식 (주의 필요)',
    icon: 'Cookie',
    desc: '영양 및 성분, 사료관리법/표시 규정 엄밀 검토'
  }
};

export const STATUS_LABELS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  exploring: {
    label: '탐색 중',
    color: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  researching: {
    label: '조사 중',
    color: 'text-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  pending_validation: {
    label: '검증 대기',
    color: 'text-purple-800',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  validating: {
    label: '검증 중',
    color: 'text-indigo-800',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200'
  },
  on_hold: {
    label: '보류',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-300'
  },
  approved: {
    label: '진행 결정',
    color: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  }
};

export const CONFIDENCE_BADGES: Record<string, { label: string; color: string; desc: string }> = {
  verified: {
    label: '확인된 정보',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: '공식 통계, 학술지, 공인 기관 발표 데이터'
  },
  user_opinion: {
    label: '사용자 의견',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    desc: '사용자가 직접 제공한 개인적 선호 및 경험'
  },
  hypothesis: {
    label: '가설',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: '아직 검증되지 않은 기획팀의 추정 및 가정'
  },
  needs_source: {
    label: '근거 확인 필요',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: '주장은 있으나 출처나 객관적 수치 미비'
  },
  needs_validation: {
    label: '추가 검증 필요',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    desc: '고객 인터뷰, 설문, 시제품 테스트 필요'
  }
};

export const DOG_ERGONOMICS_DATA = [
  {
    sizeClass: 'toy',
    label: '초소형견 (Toy)',
    weightRange: '1.5 ~ 3.5 kg',
    neckGirthCm: '18 ~ 23 cm',
    chestGirthCm: '28 ~ 35 cm',
    backLengthCm: '20 ~ 26 cm',
    shoulderHeightCm: '18 ~ 24 cm',
    dailyWaterMl: '150 ~ 250 ml',
    feederHeightCm: '6 ~ 10 cm',
    slopeAngleDeg: '15 ~ 20° (완만한 경사 필수)',
    biteForcePsi: '40 ~ 70 psi',
    typicalBreeds: ['치와와', '말티즈(초소형)', '요크셔테리어', '토이푸들']
  },
  {
    sizeClass: 'small',
    label: '소형견 (Small)',
    weightRange: '3.5 ~ 7.0 kg',
    neckGirthCm: '24 ~ 30 cm',
    chestGirthCm: '36 ~ 45 cm',
    backLengthCm: '26 ~ 34 cm',
    shoulderHeightCm: '25 ~ 32 cm',
    dailyWaterMl: '250 ~ 450 ml',
    feederHeightCm: '10 ~ 15 cm',
    slopeAngleDeg: '20 ~ 25° (충격 흡수 논슬립)',
    biteForcePsi: '80 ~ 130 psi',
    typicalBreeds: ['포메라니안', '비숑프리제', '시츄', '미니어처 푸들', '미니핀']
  },
  {
    sizeClass: 'medium',
    label: '중형견 (Medium)',
    weightRange: '7.0 ~ 15.0 kg',
    neckGirthCm: '31 ~ 42 cm',
    chestGirthCm: '46 ~ 62 cm',
    backLengthCm: '35 ~ 48 cm',
    shoulderHeightCm: '33 ~ 45 cm',
    dailyWaterMl: '500 ~ 900 ml',
    feederHeightCm: '16 ~ 24 cm',
    slopeAngleDeg: '25 ~ 30°',
    biteForcePsi: '150 ~ 240 psi',
    typicalBreeds: ['웰시코기', '시바견', '프렌치불독', '보스턴테리어', '비글']
  },
  {
    sizeClass: 'large',
    label: '대형견 (Large)',
    weightRange: '15.0 ~ 32.0 kg',
    neckGirthCm: '43 ~ 54 cm',
    chestGirthCm: '63 ~ 80 cm',
    backLengthCm: '49 ~ 65 cm',
    shoulderHeightCm: '46 ~ 60 cm',
    dailyWaterMl: '1,000 ~ 1,800 ml',
    feederHeightCm: '25 ~ 35 cm',
    slopeAngleDeg: '25 ~ 32°',
    biteForcePsi: '250 ~ 380 psi',
    typicalBreeds: ['골든리트리버', '라브라도', '보더콜리', '진돗개', '사모예드']
  },
  {
    sizeClass: 'giant',
    label: '초대형견 (Giant)',
    weightRange: '32.0 kg 이상',
    neckGirthCm: '55 cm 이상',
    chestGirthCm: '81 cm 이상',
    backLengthCm: '66 cm 이상',
    shoulderHeightCm: '60 cm 이상',
    dailyWaterMl: '2,000 ml 이상',
    feederHeightCm: '35 ~ 45 cm (위확장증 방지)',
    slopeAngleDeg: '20 ~ 28° (고하중 50kg+ 프레임)',
    biteForcePsi: '400 ~ 600+ psi',
    typicalBreeds: ['말라뮤트', '버니즈마운틴독', '그레이트피레니즈', '도베르만']
  }
];

export const INITIAL_COST_MODELS: Record<string, any> = {
  'idea-1': {
    idea_id: 'idea-1',
    retail_price: 18900,
    tooling_cost: 8000000,
    bom_material_cost: 3200,
    packaging_cost: 800,
    assembly_labor_cost: 900,
    shipping_logistics_cost: 2600,
    platform_fee_percent: 6.0,
    ad_cac_cost: 3500,
    moq: 1500
  },
  'idea-2': {
    idea_id: 'idea-2',
    retail_price: 54000,
    tooling_cost: 12000000,
    bom_material_cost: 12500,
    packaging_cost: 2200,
    assembly_labor_cost: 3800,
    shipping_logistics_cost: 3200,
    platform_fee_percent: 7.5,
    ad_cac_cost: 9500,
    moq: 800
  },
  'idea-3': {
    idea_id: 'idea-3',
    retail_price: 99000,
    tooling_cost: 6500000,
    bom_material_cost: 28000,
    packaging_cost: 4500,
    assembly_labor_cost: 8500,
    shipping_logistics_cost: 6000,
    platform_fee_percent: 5.5,
    ad_cac_cost: 14000,
    moq: 500
  },
  'idea-4': {
    idea_id: 'idea-4',
    retail_price: 24000,
    tooling_cost: 9500000,
    bom_material_cost: 4800,
    packaging_cost: 1200,
    assembly_labor_cost: 1400,
    shipping_logistics_cost: 2800,
    platform_fee_percent: 6.0,
    ad_cac_cost: 4500,
    moq: 2000
  },
  'idea-5': {
    idea_id: 'idea-5',
    retail_price: 42000,
    tooling_cost: 4500000,
    bom_material_cost: 8800,
    packaging_cost: 1500,
    assembly_labor_cost: 2500,
    shipping_logistics_cost: 3000,
    platform_fee_percent: 6.0,
    ad_cac_cost: 7000,
    moq: 1000
  }
};

export const INITIAL_INTERVIEWS = [
  {
    id: 'int-1',
    idea_id: 'idea-1',
    interviewee_name: '김서연 (31세, 직장인)',
    dog_profile: '비숑프리제 3세 (5.2kg), 1일 2회 산책',
    key_quote: '"산책 다녀와서 화장실로 안고 들어가는 순간부터 강아지가 도망쳐요. 발 말리는 드라이기 소리 때문에 매일 전쟁입니다."',
    pain_points: [
      '발가락 사이 습진 때문에 동물병원비만 월 8만원 지출',
      '물티슈는 흙모래가 털 사이에 그대로 남아서 결국 침대 시트가 더러워짐',
      '출근 전 아침 산책 후 15분 세척 시간이 너무 부담스러움'
    ],
    price_acceptable_krw: 22000,
    hypothesis_verdict: 'validated',
    feature_requests: [
      '실리콘 브러시가 너무 딱딱하지 않아야 함',
      '거품이 털에 남지 않고 끈적이지 않아야 함',
      '현관 손잡이에 걸어둘 수 있는 스트랩'
    ],
    created_at: '2026-10-15'
  },
  {
    id: 'int-2',
    idea_id: 'idea-1',
    interviewee_name: '이진우 (28세, 1인가구)',
    dog_profile: '말티즈 6세 (3.1kg), 지간염 만성',
    key_quote: '"물로 안 씻어도 정말 모래가 털릴까 의구심은 들지만, 30초 만에 끝난다면 무조건 삽니다."',
    pain_points: [
      '발바닥 털 밀어주기도 힘든데 물 닿으면 핥아서 더 덧남',
      '기존 노워시 샴푸는 펌프를 누르고 양손으로 비벼야 해서 강아지가 탈출함'
    ],
    price_acceptable_krw: 19000,
    hypothesis_verdict: 'validated',
    feature_requests: ['한 손으로 강아지 다리 잡고 한 손으로 펌핑 가능한 캡슐 형태'],
    created_at: '2026-10-16'
  },
  {
    id: 'int-3',
    idea_id: 'idea-2',
    interviewee_name: '박민지 (34세, 신혼부부)',
    dog_profile: '푸들 1세 (4.0kg), 보호자 외출 시 하울링',
    key_quote: '"집 비울 때 펫캠으로 보면 현관 쪽만 쳐다보고 낑낑대요. 체온과 심장소리가 난다면 안정에 큰 도움이 될 것 같아요."',
    pain_points: [
      '홈캠 음성은 오히려 자극해서 더 짖게 만듦',
      '일반 인형은 솜을 뜯어서 삼킬까 봐 외출 시엔 치워둠'
    ],
    price_acceptable_krw: 48000,
    hypothesis_verdict: 'validated',
    feature_requests: ['이빨로 뜯어도 배터리에 이빨이 안 닿는 견고한 하우징'],
    created_at: '2026-10-14'
  },
  {
    id: 'int-4',
    idea_id: 'idea-3',
    interviewee_name: '최원석 (42세, 자영업)',
    dog_profile: '포메라니안 5세 (3.8kg), 슬개골 2기 수술 권고',
    key_quote: '"거실에 스펀지 계단 뒀더니 강아지가 계단을 건너뛰고 착지해서 오히려 무릎이 더 꺾이더군요."',
    pain_points: [
      '스펀지 계단 쿠션이 푹 꺼짐',
      '기존 플라스틱 슬로프는 알록달록해서 거실 인테리어를 망침',
      '청소기 돌릴 때 무거워서 옮기기 귀찮음'
    ],
    price_acceptable_krw: 89000,
    hypothesis_verdict: 'validated',
    feature_requests: ['자작나무 원목 감성 + 소파/침대 높이에 맞춤 무단 조절 다이얼'],
    created_at: '2026-10-15'
  }
];

export const REGULATORY_GUIDES = [
  {
    category: '식물성 세정제 / 풋케어 / 탈취제',
    targetAgency: '농림축산검역본부 / 환경부',
    lawName: '동물용 의약외품 또는 안전확인대상 생활화학제품',
    requiredSteps: [
      '인체용 화장품이 아닌 "동물용 의약외품(반려동물 피부 세정제)" 사전 품목 허가',
      '전성분 E-WG 그린 등급 및 유해 중금속/파라벤 6종 불검출 시험성적서',
      '용기 재질 시험(환경호르몬 BPA 프리 시험 성적서)',
      '표시사항: "질병 예방 및 치료 목적이 아님" 의무 문구 표기'
    ],
    estDuration: '1.5 ~ 3개월',
    estCost: '약 150만 ~ 300만원',
    riskLevel: '중요'
  },
  {
    category: '전자/스마트 펫 기기 (온열 쿠션, 스마트캠 등)',
    targetAgency: '국립전파연구원 / 한국기계전기전자시험연구원(KTC)',
    lawName: '전파법(적합등록) 및 전기용품안전관리법(KC 안전확인)',
    requiredSteps: [
      'KC 방송통신기자재등의 적합등록 (전자파 적합성 시험 EMC)',
      '배터리 안전인증 (KC 62133 리튬 2차전지 안전인증 부품 채택 필수)',
      '씹힘 대비 물리적 외장 강도 및 누전/과열 방지 PTC 퓨즈 회로 검증'
    ],
    estDuration: '1 ~ 2개월',
    estCost: '약 200만 ~ 450만원',
    riskLevel: '매우 중요'
  },
  {
    category: '물리적 용품 (계단, 슬로프, 리드줄, 장난감)',
    targetAgency: '국가기술표준원 (어린이제품안전특별법 준용 검토)',
    lawName: '제조물책임법(PL법) 및 자율안전기준',
    requiredSteps: [
      '고밀도 인장 하중 테스트 (리드줄의 경우 80~120kg 인장 파괴 시험 성적서)',
      '소재 무독성 시험 (유해 중금속 납, 카드뮴, 유기주석화합물 불검출)',
      '가구/계단 하중 시험 (최대 30~50kg 정적 하중 1만회 피로 시험)'
    ],
    estDuration: '2 ~ 4주',
    estCost: '약 50만 ~ 120만원',
    riskLevel: '보통'
  },
  {
    category: '간식 / 영양 보조제 (Treats & Supplements)',
    targetAgency: '농림축산식품부 및 지자체 축산과',
    lawName: '사료관리법 (단미사료 / 배합사료 / 보조사료)',
    requiredSteps: [
      '사료제조업 등록 (제조 시설 면적 및 공조 설비 실사)',
      '사료 성분등록 (수분, 조단백, 조지방, 조회분, 칼슘, 인 함량 검사)',
      '보존제 및 잔류농약, 아플라톡신(곰팡이독소) 안전성 검사',
      '"특정 질병 치료/예방" 표기 시 즉시 영업정지 처분 대상'
    ],
    estDuration: '2 ~ 3개월',
    estCost: '약 200만 ~ 500만원 (시설 설비 제외)',
    riskLevel: '매우 중요'
  }
];

