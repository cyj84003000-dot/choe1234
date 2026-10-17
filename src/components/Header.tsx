import { 
  Dog, 
  MessageSquare, 
  FolderKanban, 
  Target, 
  Compass, 
  SlidersHorizontal, 
  FileText, 
  ShieldAlert, 
  Sparkles, 
  Plus, 
  RotateCcw, 
  Download, 
  Upload,
  BookOpen,
  Calculator,
  Ruler,
  Users,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewIdea: () => void;
  onOpenNamingLab: () => void;
  onResetData: () => void;
  onExportData: () => void;
  onImportData: () => void;
  ideaCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewIdea,
  onOpenNamingLab,
  onResetData,
  onExportData,
  onImportData,
  ideaCount,
}) => {
  const navItems = [
    { id: 'chat', label: '대화형 탐색', icon: MessageSquare, badge: 'AI' },
    { id: 'ideas', label: '아이디어 파이프라인', icon: FolderKanban, count: ideaCount },
    { id: 'problems', label: '문제 & 기회 보관소', icon: Target },
    { id: 'market', label: '시장 & 경쟁 레이더', icon: Compass },
    { id: 'matrix', label: '우선순위 매트릭스', icon: SlidersHorizontal },
    { id: 'economics', label: '원가 · 마진 (BEP)', icon: Calculator },
    { id: 'ergonomics', label: '견체공학 설계 스펙', icon: Ruler },
    { id: 'validation', label: '고객 인터뷰 검증', icon: Users },
    { id: 'docs', label: '요청 시 문서 생성', icon: FileText },
    { id: 'compliance', label: '인증 · 규제 가이드', icon: ShieldCheck },
    { id: 'safety', label: '안전성 검토기', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner & Quick Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Dog className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  PawLab <span className="text-amber-600 font-semibold text-sm">포랩</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  PRD v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                반려견 제품 아이디어 발굴 · 시장성 검증 플랫폼
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenNamingLab}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              title="PRD Section 2 네이밍 제안 비교"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-slate-500" />
              네이밍 후보
            </button>

            <button
              onClick={onOpenNewIdea}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 mr-1" />
              새 아이디어 등록
            </button>

            {/* Data Utilities Menu */}
            <div className="flex items-center border-l border-slate-200 pl-2 space-x-1">
              <button
                onClick={onExportData}
                title="데이터 JSON 백업 내보내기"
                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onImportData}
                title="데이터 가져오기"
                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                onClick={onResetData}
                title="시드 데이터로 초기화"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 mr-1.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {item.label}
                {item.count !== undefined && (
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
