// src/__tests__/components/media/MediaPreview.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MediaPreview from '@/components/media/MediaPreview'
import { UploadedFile } from '@/components/types'

// Mock URL.revokeObjectURL
window.URL.revokeObjectURL = jest.fn();

describe('MediaPreview', () => {
  const mockOnRemove = jest.fn();
  
  // Sample uploaded files for testing
  const sampleFiles: UploadedFile[] = [
    {
      file: new File(['image content'], 'test-image.jpg', { type: 'image/jpeg' }),
      preview: 'mock-image-url',
      type: 'image'
    },
    {
      file: new File(['video content'], 'test-video.mp4', { type: 'video/mp4' }),
      preview: 'mock-video-url',
      type: 'video'
    }
  ];
  
  beforeEach(() => {
    mockOnRemove.mockReset();
  });
  
  it('renders nothing when no files are provided', () => {
    const { container } = render(<MediaPreview files={[]} onRemove={mockOnRemove} />);
    expect(container.firstChild).toBeNull();
  });
  
  it('renders images and videos correctly', () => {
    render(<MediaPreview files={sampleFiles} onRemove={mockOnRemove} />);
    
    // Check if image is rendered
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(1);  // Just the one image
    expect(images[0]).toHaveAttribute('src', 'mock-image-url');
    
    // Check if video is rendered
    const videos = document.querySelectorAll('video');
    expect(videos.length).toBe(1);
    expect(videos[0]).toHaveAttribute('src', 'mock-video-url');
  });
  
  it('calls onRemove when remove button is clicked', () => {
    render(<MediaPreview files={sampleFiles} onRemove={mockOnRemove} />);
    
    // Find all remove buttons
    const removeButtons = screen.getAllByRole('button');
    expect(removeButtons.length).toBe(2); // One for each file
    
    // Click the first remove button
    fireEvent.click(removeButtons[0]);
    
    // Verify onRemove was called with index 0
    expect(mockOnRemove).toHaveBeenCalledWith(0);
    
    // Click the second remove button
    fireEvent.click(removeButtons[1]);
    
    // Verify onRemove was called with index 1
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});