import { FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function PDFUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files[0]?.type === 'application/pdf') {
      setFile(files[0]);
    }
  };

  return (
    <div
      className={cn(
        'mt-6 p-8 border-2 border-dashed rounded-lg transition-all duration-200',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        file ? 'bg-gray-50' : 'bg-white'
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {file ? (
          <>
            <FileText className="w-16 h-16 text-blue-500" />
            <p className="text-sm text-gray-600">{file.name}</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop your PDF file here, or click to select
            </p>
          </>
        )}
      </div>
    </div>
  );
}