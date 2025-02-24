// src/__tests__/components/media/MediaUploader.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MediaUploader from '@/components/media/MediaUploader'

describe('MediaUploader', () => {
  const mockOnFilesSelected = jest.fn();
  
  beforeEach(() => {
    // Reset mock function before each test
    mockOnFilesSelected.mockReset();
  });
  
  it('renders the upload button', () => {
    render(<MediaUploader onFilesSelected={mockOnFilesSelected} />)
    
    expect(screen.getByText('Upload Swing Photos/Videos')).toBeInTheDocument()
  });
  
  it('shows camera icon', () => {
    render(<MediaUploader onFilesSelected={mockOnFilesSelected} />)
    
    // Look for SVG with camera class/role (this is implementation dependent)
    const cameraIcon = document.querySelector('[data-lucide="camera"]');
    expect(cameraIcon).toBeInTheDocument();
  });
  
  it('calls onFilesSelected when files are selected', () => {
    render(<MediaUploader onFilesSelected={mockOnFilesSelected} />)
    
    // Create mock files
    const imageFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const videoFile = new File(['dummy video content'], 'example.mp4', { type: 'video/mp4' });
    const textFile = new File(['dummy text'], 'example.txt', { type: 'text/plain' });
    
    // Get file input (it's hidden, so we need to query it directly)
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    
    if (input) {
      // Simulate file selection (only image and video should be passed)
      Object.defineProperty(input, 'files', {
        value: [imageFile, videoFile, textFile]
      });
      
      fireEvent.change(input);
      
      // Check if onFilesSelected was called with the right files
      expect(mockOnFilesSelected).toHaveBeenCalledTimes(1);
      
      // Only image and video files should be processed, not text
      const selectedFiles = mockOnFilesSelected.mock.calls[0][0];
      expect(selectedFiles.length).toBe(2);
      expect(selectedFiles[0].type).toBe('image/png');
      expect(selectedFiles[1].type).toBe('video/mp4');
    }
  });
});