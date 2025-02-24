// src/components/media/MediaPreview.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { UploadedFile } from '../types';

interface MediaPreviewProps {
  files: UploadedFile[];
  onRemove: (index: number) => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ 
  files, 
  onRemove 
}) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {files.map((file, index) => (
        <div key={index} className="relative">
          {file.type === 'image' ? (
            <img 
              src={file.preview} 
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ) : (
            <video 
              src={file.preview}
              className="w-full h-32 object-cover rounded-lg"
              controls
            />
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 w-6 h-6"
            onClick={() => onRemove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MediaPreview;