// src/components/drills/DrillList.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Drill, ProgressState } from '../types';
import { DRILL_DATABASE } from '../data/drillDatabase';

interface DrillListProps {
  drillProgress: ProgressState;
  onSelectDrill: (drill: Drill) => void;
}

export const DrillList: React.FC<DrillListProps> = ({ 
  drillProgress, 
  onSelectDrill 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Available Drills</h3>
      {Object.entries(DRILL_DATABASE).map(([category, drills]) => (
        <div key={category}>
          <h4 className="text-sm font-medium capitalize mb-2">{category}</h4>
          {drills.map(drill => {
            const progress = drillProgress[drill.id] || { level: 1, successCount: 0, attempts: 0 };
            const currentLevel = drill.progressionLevels[progress.level - 1];
            
            return (
              <Card key={drill.id} className="mb-2">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{drill.name}</h5>
                      <p className="text-sm text-gray-500">
                        {currentLevel.description}
                      </p>
                      <div className="mt-1 text-xs text-gray-400">
                        Level {progress.level} • 
                        Progress: {progress.successCount}/{currentLevel.target}
                      </div>
                    </div>
                    <Button onClick={() => onSelectDrill(drill)}>
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DrillList;