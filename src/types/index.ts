// src/types/index.ts
export interface Package {
  name: string;
  version: string;
  size: number;
}

export interface AnalysisResult {
  keep: Package[];
  remove: Package[];
  stats: {
    totalPackages: number;
    keepSize: number;
    removeSize: number;
  };
}