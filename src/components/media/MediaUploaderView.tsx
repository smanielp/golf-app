// src/components/media/MediaUploaderView.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import MediaUploader from './MediaUploader';
import MediaPreview from './MediaPreview';
import { UploadedFile } from '../types';

interface MediaUploaderViewProps {
  uploadedFiles: UploadedFile[];
  onFilesSelected: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onDone: () => void;
}

export const MediaUploaderView: React.FC<MediaUploaderViewProps> = ({ 
  uploadedFiles, 
  onFilesSelected, 
  onRemoveFile,
  onDone
}) => {
  return (
    <div className="space-y-6">
      <MediaUploader onFilesSelected={onFilesSelected} />
      
      <MediaPreview 
        files={uploadedFiles}
        onRemove={onRemoveFile}
      />
      
      {uploadedFiles.length > 0 && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onDone}
        >
          Done
        </Button>
      )}
    </div>
  );
};

export default MediaUploaderView;