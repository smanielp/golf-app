// src/components/data/drillDatabase.ts
import { Drill } from "../types";

type DrillDatabase = {
  [category: string]: Drill[];
};

export const DRILL_DATABASE: DrillDatabase = {
  putting: [
    {
      id: 'putting-precision',
      name: 'Precision Putting',
      type: 'competitive',
      progressionLevels: [
        { level: 1, distance: 4, attempts: 5, target: 5, description: '5/5 putts from 4 feet' },
        { level: 2, distance: 8, attempts: 3, target: 3, description: '3/3 putts from 8 feet' },
        { level: 3, distance: 4, attempts: 8, target: 8, description: '8/8 putts from 4 feet' },
        { level: 4, distance: 8, attempts: 5, target: 5, description: '5/5 putts from 8 feet' }
      ],
      instructions: 'Place ball at marked distance, attempt to make specified number of putts',
      setupGuide: {
        cameraPosition: 'Behind ball, aligned with target line',
        alignmentGuide: 'Position camera 6 feet behind ball at ground level'
      }
    }
  ],
  chipping: [
    {
      id: 'landing-control',
      name: 'Landing Spot Control',
      type: 'competitive',
      progressionLevels: [
        { level: 1, distance: 10, target: 3, attempts: 5, description: '3/5 chips within 3 feet of target' },
        { level: 2, distance: 20, target: 3, attempts: 5, description: '3/5 chips to alternating targets' }
      ],
      instructions: 'Place targets at specified distances, attempt to land chips within target zone',
      setupGuide: {
        cameraPosition: 'Perpendicular to target line',
        alignmentGuide: 'Position camera 45 degrees to target line, level with ground'
      }
    }
  ],
  fullSwing: [
    {
      id: 'swing-plane',
      name: 'Swing Plane Drill',
      type: 'technique',
      progressionLevels: [
        { level: 1, distance: 0, attempts: 10, target: 8, description: '8/10 swings with correct plane' },
        { level: 2, distance: 0, attempts: 15, target: 12, description: '12/15 swings with correct plane and tempo' }
      ],
      instructions: 'Focus on maintaining proper swing plane, check video after each attempt',
      setupGuide: {
        cameraPosition: 'Face-on and down-the-line views',
        alignmentGuide: 'Position camera directly in front or behind in line with target'
      }
    }
  ]
};