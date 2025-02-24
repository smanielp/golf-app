// src/components/practice/PracticeSession.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Check, X } from 'lucide-react';
import { Drill } from '../types';

interface PracticeSessionProps {
  drill: Drill;
  onComplete: (drillId: string, success: boolean) => void;
  onExit: () => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({ 
  drill, 
  onComplete,
  onExit
}) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [alignmentCorrect, setAlignmentCorrect] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Initialize camera
  const initializeCamera = async () => {
    try {
      // Request camera access - default to environment (rear) camera if available
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraReady(true);
      startAlignmentDetection();
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions and try again.');
    }
  };

  // Simulated alignment detection (would use device orientation in a real app)
  const startAlignmentDetection = () => {
    // In a real implementation, this would use device orientation and camera APIs
    // to detect proper alignment based on drill requirements
    // For now, we'll simulate with a timer
    let checkCount = 0;
    const alignmentCheck = setInterval(() => {
      checkCount++;
      if (checkCount > 2) {
        setAlignmentCorrect(true);
        // Play audio cue when aligned
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        clearInterval(alignmentCheck);
      }
    }, 1000);
  };

  // Clean up camera resources on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleExit = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraReady(false);
    setAlignmentCorrect(false);
    onExit();
  };

  const handleSuccess = () => {
    onComplete(drill.id, true);
  };

  const handleFailure = () => {
    onComplete(drill.id, false);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-64 bg-gray-900 rounded-lg"
        />
        {alignmentCorrect && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
            Aligned
          </div>
        )}
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-2">{drill.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{drill.instructions}</p>
        <div className="space-y-2">
          <p className="text-sm">Camera Setup:</p>
          <p className="text-sm text-gray-500">{drill.setupGuide.alignmentGuide}</p>
        </div>
      </Card>

      <div className="space-y-4">
        {!cameraReady ? (
          <Button className="w-full" onClick={initializeCamera}>
            Start Camera
          </Button>
        ) : (
          <>
            <Button
              className="w-full"
              variant={isRecording ? "destructive" : "default"}
              onClick={handleRecordToggle}
            >
              {isRecording ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            
            {isRecording && (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSuccess}
                >
                  <Check className="mr-2" /> Success
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleFailure}
                >
                  <X className="mr-2" /> Retry
                </Button>
              </div>
            )}
            
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleExit}
            >
              Finish Practice
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PracticeSession;