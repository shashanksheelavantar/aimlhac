import { FileText, Upload, FileQuestion, ListChecks } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const Home = () => {
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Text Input */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Enter Your Text</h2>
          </div>
          <Textarea
            placeholder="Paste your text here..."
            className="min-h-[150px]"
          />
        </Card>

        {/* PDF Upload */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Upload className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Upload PDF</h2>
          </div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <FileQuestion className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              {isDragActive
                ? 'Drop the PDF here'
                : 'Drag and drop your PDF here, or click to select'}
            </p>
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Summary</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
            <p className="text-gray-500 text-center">
              Your summary will appear here...
            </p>
          </div>
        </Card>

        {/* Important Points */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <ListChecks className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Important Points</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <p className="text-gray-500 flex-1">
                  Important points will be displayed here...
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <p className="text-gray-500 flex-1">
                  Each point will be highlighted with a bullet...
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <p className="text-gray-500 flex-1">
                  Making it easy to review key concepts...
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Take Test Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/quiz')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Take Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;