// src/components/GolfCoachApp.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Drill, ProgressState } from './types';
import Dashboard from './dashboard/Dashboard';
import PracticeSession from './practice/PracticeSession';

export const GolfCoachApp: React.FC = () => {
  // App state
  const [currentView, setCurrentView] = useState<'dashboard' | 'practice'>('dashboard');
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
          />
        )}
        
        {currentView === 'practice' && selectedDrill && (
          <PracticeSession 
            drill={selectedDrill}
            onComplete={updateDrillProgress}
            onExit={handlePracticeComplete}
          />
        )}
      </CardContent>
    </Card>
  );
};