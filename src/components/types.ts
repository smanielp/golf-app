// src/components/types.ts
export type UploadedFile = {
  file: File;
  preview: string;
  type: 'image' | 'video';
};

export type ProgressionLevel = {
  level: number;
  distance: number;
  attempts: number;
  target: number;
  description: string;
};

export type Drill = {
  id: string;
  name: string;
  type: string;
  progressionLevels: ProgressionLevel[];
  instructions: string;
  setupGuide: {
    cameraPosition: string;
    alignmentGuide: string;
  };
};

export type DrillProgress = {
  level: number;
  successCount: number;
  attempts: number;
};

export type ProgressState = {
  [drillId: string]: DrillProgress;
};