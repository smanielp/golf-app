// src/components/dashboard/Dashboard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart2 } from 'lucide-react';
import { ProgressState, Drill } from '../types';
import DrillList from '../drills/DrillList';

interface DashboardProps {
  drillProgress: ProgressState;
  onSelectDrill: (drill: Drill) => void;
  onStartUpload: () => void;
}

// Sample user profile - would come from backend in a real app
const USER_PROFILE = {
  id: 'user123',
  initialSkillLevel: 'beginner',
  preferredPracticeDays: ['monday', 'wednesday', 'saturday'],
  preferredTime: '17:00',
  notificationsEnabled: true
};

export const Dashboard: React.FC<DashboardProps> = ({ 
  drillProgress, 
  onSelectDrill,
  onStartUpload
}) => {
  // Calculate total progress level (sum of all drill levels)
  const totalProgressLevel = Object.values(drillProgress).reduce(
    (total, curr) => total + curr.level, 
    0
  );
  
  // Get next practice day (simplified)
  const getNextPracticeDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()].toLowerCase();
    
    // Get the next practice day after today
    const nextPracticeDay = USER_PROFILE.preferredPracticeDays.find(
      day => days.indexOf(day) > days.indexOf(today)
    ) || USER_PROFILE.preferredPracticeDays[0]; // Wrap around if needed
    
    return nextPracticeDay.charAt(0).toUpperCase() + nextPracticeDay.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Next Practice</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {getNextPracticeDay()} at {USER_PROFILE.preferredTime}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium mb-2">Progress</h3>
          <div className="flex items-center text-sm text-gray-500">
            <BarChart2 className="w-4 h-4 mr-2" />
            Level {totalProgressLevel || 1}
          </div>
        </Card>
      </div>
      
      <Button className="w-full" onClick={onStartUpload}>
        Upload Swing Videos
      </Button>
      
      <DrillList 
        drillProgress={drillProgress} 
        onSelectDrill={onSelectDrill} 
      />
    </div>
  );
};

export default Dashboard;