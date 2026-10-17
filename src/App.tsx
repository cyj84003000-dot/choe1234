/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatExplorer } from './components/ChatExplorer';
import { IdeaPipeline } from './components/IdeaPipeline';
import { ProblemRepo } from './components/ProblemRepo';
import { MarketRadar } from './components/MarketRadar';
import { PriorityMatrix } from './components/PriorityMatrix';
import { DocumentHub } from './components/DocumentHub';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';
import { DogErgonomicsGuide } from './components/DogErgonomicsGuide';
import { ValidationInterviewHub } from './components/ValidationInterviewHub';
import { RegulatoryComplianceView } from './components/RegulatoryComplianceView';
import { SafetyAuditView } from './components/SafetyAuditView';
import { IdeaDetailModal } from './components/IdeaDetailModal';
import { IdeaEditModal } from './components/IdeaEditModal';
import { NamingLabModal } from './components/NamingLabModal';
import { StorageService } from './services/storage';
import { Idea, IdeaCategory, IdeaStatus, ProblemOpportunity } from './types';
import { Check, AlertCircle } from 'lucide-react';

export default function App() {
  const [ideas, setIdeas] = useState<Idea[]>(() => StorageService.getIdeas());
  const [problems, setProblems] = useState<ProblemOpportunity[]>(() => StorageService.getProblems());
  const [activeTab, setActiveTab] = useState<string>('chat');

  // Modals state
  const [selectedIdeaForModal, setSelectedIdeaForModal] = useState<Idea | null>(null);
  const [isEditingIdea, setIsEditingIdea] = useState(false);
  const [editingIdeaData, setEditingIdeaData] = useState<Partial<Idea> | undefined>(undefined);
  const [isNamingLabOpen, setIsNamingLabOpen] = useState(false);
  const [docInitialIdea, setDocInitialIdea] = useState<Idea | undefined>(undefined);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keep storage in sync
  const handleUpdateIdeas = (newIdeas: Idea[]) => {
    setIdeas(newIdeas);
    StorageService.saveIdeas(newIdeas);
  };

  const handleUpdateSingleIdea = (updated: Idea) => {
    const newIdeas = ideas.map((i) => (i.id === updated.id ? updated : i));
    handleUpdateIdeas(newIdeas);
    setSelectedIdeaForModal(updated);
    showToast(`'${updated.name}' 변경사항이 저장되었습니다.`);
  };

  const handleDeleteIdea = (id: string) => {
    const newIdeas = ideas.filter((i) => i.id !== id);
    handleUpdateIdeas(newIdeas);
    setSelectedIdeaForModal(null);
    showToast('아이디어가 보관함에서 삭제되었습니다.');
  };

  const handleUpdateStatus = (id: string, newStatus: IdeaStatus) => {
    const newIdeas = ideas.map((i) =>
      i.id === id ? { ...i, status: newStatus, updated_at: new Date().toISOString() } : i
    );
    handleUpdateIdeas(newIdeas);
    showToast('아이디어 진행 상태가 변경되었습니다.');
  };

  const handleSaveExtractedIdea = (extracted: Partial<Idea>) => {
    setEditingIdeaData(extracted);
    setIsEditingIdea(true);
  };

  const handleSaveNewIdea = (newIdea: Idea) => {
    const existingIndex = ideas.findIndex((i) => i.id === newIdea.id);
    let updatedIdeas: Idea[];
    if (existingIndex >= 0) {
      updatedIdeas = [...ideas];
      updatedIdeas[existingIndex] = newIdea;
    } else {
      updatedIdeas = [newIdea, ...ideas];
    }
    handleUpdateIdeas(updatedIdeas);
    setIsEditingIdea(false);
    setEditingIdeaData(undefined);
    showToast(`'${newIdea.name}'이 아이디어 보관함에 등록되었습니다.`);
    setActiveTab('ideas');
  };

  const handleAddProblem = (prob: ProblemOpportunity) => {
    const updated = [prob, ...problems];
    setProblems(updated);
    StorageService.saveProblems(updated);
    showToast(`새로운 문제 '${prob.title}'가 등록되었습니다.`);
  };

  const handleExploreProblemInChat = (problemPrompt: string) => {
    setActiveTab('chat');
  };

  const handleGenerateDocForIdea = (idea: Idea) => {
    setSelectedIdeaForModal(null);
    setDocInitialIdea(idea);
    setActiveTab('docs');
  };

  const handleResetData = () => {
    if (window.confirm('모든 데이터를 초기 PRD 샘플 데이터로 리셋하시겠습니까? (작성한 내용은 초기화됩니다)')) {
      StorageService.resetToDefault();
      setIdeas(StorageService.getIdeas());
      setProblems(StorageService.getProblems());
      showToast('초기 PRD 표준 데이터로 리셋되었습니다.');
    }
  };

  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PawLab_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('전체 데이터 백업 파일이 다운로드되었습니다.');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const success = StorageService.importAllData(text);
        if (success) {
          setIdeas(StorageService.getIdeas());
          setProblems(StorageService.getProblems());
          showToast('데이터를 성공적으로 복원했습니다.');
        } else {
          alert('올바른 PawLab JSON 백업 파일이 아닙니다.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewIdea={() => {
          setEditingIdeaData(undefined);
          setIsEditingIdea(true);
        }}
        onOpenNamingLab={() => setIsNamingLabOpen(true)}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportData}
        ideaCount={ideas.length}
      />

      {/* Main Tab Views */}
      <main className="flex-1 pb-16">
        {activeTab === 'chat' && (
          <ChatExplorer
            onSaveExtractedIdea={handleSaveExtractedIdea}
            onSelectCategory={() => {}}
          />
        )}

        {activeTab === 'ideas' && (
          <IdeaPipeline
            ideas={ideas}
            onSelectIdea={(idea) => setSelectedIdeaForModal(idea)}
            onUpdateStatus={handleUpdateStatus}
            onOpenNewIdea={() => {
              setEditingIdeaData(undefined);
              setIsEditingIdea(true);
            }}
          />
        )}

        {activeTab === 'problems' && (
          <ProblemRepo
            problems={problems}
            onAddProblem={handleAddProblem}
            onExploreProblemInChat={handleExploreProblemInChat}
            onOpenIdeaDetail={(id) => {
              const matched = ideas.find((i) => i.id === id);
              if (matched) setSelectedIdeaForModal(matched);
            }}
          />
        )}

        {activeTab === 'market' && (
          <MarketRadar
            ideas={ideas}
            onOpenIdea={(idea) => setSelectedIdeaForModal(idea)}
          />
        )}

        {activeTab === 'matrix' && (
          <PriorityMatrix
            ideas={ideas}
            onSelectIdea={(idea) => setSelectedIdeaForModal(idea)}
          />
        )}

        {activeTab === 'economics' && (
          <UnitEconomicsCalculator ideas={ideas} />
        )}

        {activeTab === 'ergonomics' && (
          <DogErgonomicsGuide />
        )}

        {activeTab === 'validation' && (
          <ValidationInterviewHub ideas={ideas} />
        )}

        {activeTab === 'docs' && (
          <DocumentHub ideas={ideas} initialIdea={docInitialIdea} />
        )}

        {activeTab === 'compliance' && (
          <RegulatoryComplianceView />
        )}

        {activeTab === 'safety' && (
          <SafetyAuditView
            ideas={ideas}
            onOpenIdea={(idea) => setSelectedIdeaForModal(idea)}
          />
        )}
      </main>

      {/* Modals */}
      {selectedIdeaForModal && (
        <IdeaDetailModal
          idea={selectedIdeaForModal}
          onClose={() => setSelectedIdeaForModal(null)}
          onUpdateIdea={handleUpdateSingleIdea}
          onDeleteIdea={handleDeleteIdea}
          onGenerateDocForIdea={handleGenerateDocForIdea}
        />
      )}

      {isEditingIdea && (
        <IdeaEditModal
          initialIdea={editingIdeaData}
          onClose={() => {
            setIsEditingIdea(false);
            setEditingIdeaData(undefined);
          }}
          onSave={handleSaveNewIdea}
        />
      )}

      {isNamingLabOpen && (
        <NamingLabModal onClose={() => setIsNamingLabOpen(false)} />
      )}
    </div>
  );
}
