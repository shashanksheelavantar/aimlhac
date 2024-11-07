import { useState } from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Question {
  id: number;
  text: string;
  options: string[];
  selectedOption?: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Sample question will appear here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"]
  },
  // Add more mock questions as needed
];

export default function Quiz() {
  const [questions] = useState<Question[]>(mockQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex gap-6">
            {/* Main question area */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-6">Question {currentQuestion + 1}</h2>
              <p className="text-gray-700 mb-6">{questions[currentQuestion].text}</p>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                      answers[questions[currentQuestion].id] === idx
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    )}
                    onClick={() => handleOptionSelect(questions[currentQuestion].id, idx)}
                  >
                    <div className="flex-1">{option}</div>
                    {answers[questions[currentQuestion].id] === idx ? (
                      <Check className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Question navigation */}
            <div className="w-48">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Questions</h3>
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-sm font-medium",
                        currentQuestion === idx
                          ? "bg-blue-500 text-white"
                          : answers[q.id] !== undefined
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-600"
                      )}
                      onClick={() => setCurrentQuestion(idx)}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}