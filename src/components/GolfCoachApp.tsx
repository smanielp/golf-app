import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';

type UploadedFile = {
  file: File;
  preview: string;
  type: 'image' | 'video';
};

export const GolfCoachApp = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const mediaFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    const newFiles = mediaFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Golf Practice Assistant</h1>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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

              {uploadedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {uploadedFiles.map((file, index) => (
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
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};