import { useState } from 'react';
import { CheckCircle, Circle, ArrowLeft, PartyPopper, Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Question {
  id: number;
  text: string;
  options: string[];
  selectedOption?: number;
  correctOption: number;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [questions] = useState<Question[]>([
    {
      id: 1,
      text: 'Sample question 1?',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctOption: 2,
    },
    {
      id: 2,
      text: 'Sample question 2?',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctOption: 1,
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setCurrentQuestion(prev => ({
      ...prev,
      selectedOption: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctOption) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
  };

  const isHighScore = score >= questions.length * 0.7; // 70% or higher is considered a high score

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="group mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="grid grid-cols-12 gap-6">
        {/* Question Panel */}
        <div className="col-span-12 md:col-span-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion.id}
            </h2>
            <p className="text-gray-700 mb-6">{currentQuestion.text}</p>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(currentQuestion.id, index)}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                    answers[currentQuestion.id] === index
                      ? 'bg-blue-50 border-blue-200 border'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {answers[currentQuestion.id] === index ? (
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <span className="text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Question Navigation */}
        <div className="col-span-12 md:col-span-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Questions</h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => setCurrentQuestion(question)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${
                    currentQuestion.id === question.id
                      ? 'bg-blue-600 text-white'
                      : answers[question.id] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {question.id}
                </div>
              ))}
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full mt-6"
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Test
            </Button>
          </Card>
        </div>
      </div>

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Test Results
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 space-y-6">
            {isHighScore ? (
              <div className="animate-bounce">
                <PartyPopper className="h-16 w-16 text-yellow-500" />
              </div>
            ) : (
              <div className="animate-pulse">
                <Frown className="h-16 w-16 text-blue-500" />
              </div>
            )}
            
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">
                {score} / {questions.length}
              </p>
              <p className="text-gray-600">
                {isHighScore 
                  ? "Excellent work! You've mastered this material!" 
                  : "Keep practicing! You'll get better!"}
              </p>
            </div>

            {isHighScore && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 animate-[confetti_5s_ease-in-out_infinite]" />
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={() => navigate('/')}>Back to Home</Button>
              <Button 
                onClick={() => {
                  setShowResults(false);
                  setAnswers({});
                  setCurrentQuestion(questions[0]);
                }}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quiz;