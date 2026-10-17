import { Idea, ProblemOpportunity, GeneratedDocument, InterviewRecord, CostModel } from '../types';
import { INITIAL_IDEAS, INITIAL_PROBLEMS, INITIAL_INTERVIEWS, INITIAL_COST_MODELS } from '../data/seedData';

const STORAGE_KEYS = {
  IDEAS: 'pawlab_ideas_v1',
  PROBLEMS: 'pawlab_problems_v1',
  DOCUMENTS: 'pawlab_documents_v1',
  INTERVIEWS: 'pawlab_interviews_v1',
  COST_MODELS: 'pawlab_cost_models_v1',
  ACTIVE_TAB: 'pawlab_active_tab_v1'
};

export const StorageService = {
  getIdeas(): Idea[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.IDEAS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(INITIAL_IDEAS));
        return INITIAL_IDEAS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load ideas from storage', e);
      return INITIAL_IDEAS;
    }
  },

  saveIdeas(ideas: Idea[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideas));
    } catch (e) {
      console.error('Failed to save ideas to storage', e);
    }
  },

  getProblems(): ProblemOpportunity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(INITIAL_PROBLEMS));
        return INITIAL_PROBLEMS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load problems from storage', e);
      return INITIAL_PROBLEMS;
    }
  },

  saveProblems(problems: ProblemOpportunity[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
    } catch (e) {
      console.error('Failed to save problems to storage', e);
    }
  },

  getDocuments(): GeneratedDocument[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load documents from storage', e);
      return [];
    }
  },

  saveDocuments(docs: GeneratedDocument[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
    } catch (e) {
      console.error('Failed to save documents to storage', e);
    }
  },

  addDocument(doc: GeneratedDocument): void {
    const docs = this.getDocuments();
    docs.unshift(doc);
    this.saveDocuments(docs);
  },

  getInterviews(): InterviewRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(INITIAL_INTERVIEWS));
        return INITIAL_INTERVIEWS as InterviewRecord[];
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load interviews from storage', e);
      return INITIAL_INTERVIEWS as InterviewRecord[];
    }
  },

  saveInterviews(interviews: InterviewRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
    } catch (e) {
      console.error('Failed to save interviews to storage', e);
    }
  },

  getCostModels(): Record<string, CostModel> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COST_MODELS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.COST_MODELS, JSON.stringify(INITIAL_COST_MODELS));
        return INITIAL_COST_MODELS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load cost models', e);
      return INITIAL_COST_MODELS;
    }
  },

  saveCostModels(costModels: Record<string, CostModel>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COST_MODELS, JSON.stringify(costModels));
    } catch (e) {
      console.error('Failed to save cost models', e);
    }
  },

  resetToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(INITIAL_IDEAS));
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(INITIAL_PROBLEMS));
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(INITIAL_INTERVIEWS));
    localStorage.setItem(STORAGE_KEYS.COST_MODELS, JSON.stringify(INITIAL_COST_MODELS));
    localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
  },

  exportAllData(): string {
    const data = {
      version: '1.1',
      exportedAt: new Date().toISOString(),
      ideas: this.getIdeas(),
      problems: this.getProblems(),
      documents: this.getDocuments(),
      interviews: this.getInterviews(),
      costModels: this.getCostModels(),
    };
    return JSON.stringify(data, null, 2);
  },

  importAllData(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed.ideas)) {
        this.saveIdeas(parsed.ideas);
      }
      if (Array.isArray(parsed.problems)) {
        this.saveProblems(parsed.problems);
      }
      if (Array.isArray(parsed.documents)) {
        this.saveDocuments(parsed.documents);
      }
      if (Array.isArray(parsed.interviews)) {
        this.saveInterviews(parsed.interviews);
      }
      if (parsed.costModels) {
        this.saveCostModels(parsed.costModels);
      }
      return true;
    } catch (e) {
      console.error('Invalid import data format', e);
      return false;
    }
  }
};

