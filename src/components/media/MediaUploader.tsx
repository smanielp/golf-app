// src/components/media/MediaUploader.tsx
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';

interface MediaUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ 
  onFilesSelected 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const mediaFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    onFilesSelected(mediaFiles);
  };

  return (
    <div className="text-center p-8 border-2 border-dashed rounded-lg">
      <Camera className="mx-auto mb-4" size={48} />
      <div className="space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*"
          multiple
          className="hidden"
        />
        
        <Button 
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Swing Photos/Videos
        </Button>
      </div>
    </div>
  );
};

export default MediaUploader;