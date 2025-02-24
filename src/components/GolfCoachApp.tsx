// src/components/GolfCoachApp.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UploadedFile, Drill, ProgressState } from './types';
import Dashboard from './dashboard/Dashboard';
import PracticeSession from './practice/PracticeSession';
import MediaUploaderView from './media/MediaUploaderView';

export const GolfCoachApp: React.FC = () => {
  // App state
  const [currentView, setCurrentView] = useState<'dashboard' | 'practice' | 'upload'>('dashboard');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [drillProgress, setDrillProgress] = useState<ProgressState>({});

  // Load saved progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('drillProgress');
    if (savedProgress) {
      try {
        setDrillProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to parse saved progress');
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('drillProgress', JSON.stringify(drillProgress));
  }, [drillProgress]);

  // Handle file uploads
  const handleFilesSelected = (files: File[]) => {
    const newFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  // Remove a file
  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  // Update drill progress
  const updateDrillProgress = (drillId: string, success: boolean) => {
    setDrillProgress(prev => {
      const currentProgress = prev[drillId] || { level: 1, successCount: 0, attempts: 0 };
      const drill = selectedDrill;
      
      if (!drill) return prev;
      
      const currentLevel = drill.progressionLevels[currentProgress.level - 1];
      
      const newProgress = {
        ...currentProgress,
        successCount: success ? currentProgress.successCount + 1 : currentProgress.successCount,
        attempts: currentProgress.attempts + 1
      };

      // Check for level progression
      if (newProgress.successCount >= currentLevel.target && 
          newProgress.attempts <= currentLevel.attempts) {
        if (currentProgress.level < drill.progressionLevels.length) {
          alert(`Congratulations! You've advanced to level ${currentProgress.level + 1}!`);
          return {
            ...prev,
            [drillId]: { level: currentProgress.level + 1, successCount: 0, attempts: 0 }
          };
        }
      }

      return { ...prev, [drillId]: newProgress };
    });
  };

  // Navigation handlers
  const handleStartUpload = () => {
    setCurrentView('upload');
  };

  const handleSelectDrill = (drill: Drill) => {
    setSelectedDrill(drill);
    setCurrentView('practice');
  };

  const handlePracticeComplete = () => {
    setSelectedDrill(null);
    setCurrentView('dashboard');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Golf Practice Assistant</h1>
      </CardHeader>
      <CardContent>
        {currentView === 'dashboard' && (
          <Dashboard 
            drillProgress={drillProgress}
            onSelectDrill={handleSelectDrill}
            onStartUpload={handleStartUpload}
          />
        )}
        
        {currentView === 'practice' && selectedDrill && (
          <PracticeSession 
            drill={selectedDrill}
            onComplete={updateDrillProgress}
            onExit={handlePracticeComplete}
          />
        )}
        
        {currentView === 'upload' && (
          <MediaUploaderView 
            uploadedFiles={uploadedFiles}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={removeFile}
            onDone={() => setCurrentView('dashboard')}
          />
        )}
      </CardContent>
    </Card>
  );
};