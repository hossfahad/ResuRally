'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface InterviewerModeProps {
  questions: string[];
  onReset: () => void;
}

const InterviewerMode = ({ questions, onReset }: InterviewerModeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef<boolean>(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Use useCallback to memoize the prepareQuestion function
  const prepareQuestion = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: currentQuestion }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        
        audioRef.current.addEventListener('ended', () => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.src = audioUrl;
      }

      // Don't autoplay - wait for user to press play
      // Show a toast to guide the user
      toast.info('Question ready! Click "Play" to hear it.', { duration: 3000 });
      
    } catch (error) {
      console.error('Error generating speech:', error);
      toast.error('Failed to prepare the question audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentQuestion]);
  
  // Auto-play the first question on component mount
  useEffect(() => {
    if (!hasStartedRef.current && questions.length > 0) {
      hasStartedRef.current = true;
      prepareQuestion();
    }
  }, [questions.length, prepareQuestion]);
  
  const handleSpeakQuestion = async () => {
    // If audio is already prepared, just play it
    if (audioRef.current && audioRef.current.src) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        toast.error('Could not play audio. Please ensure audio permissions are enabled in your browser.');
      }
      return;
    }
    
    // Otherwise prepare and play
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: currentQuestion }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        
        audioRef.current.addEventListener('ended', () => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.src = audioUrl;
      }

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (playError) {
        console.error('Error playing audio:', playError);
        toast.error('Could not play audio. Please ensure audio permissions are enabled in your browser.');
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      toast.error('Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Stop current audio if playing
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      
      setCurrentQuestionIndex(prev => prev + 1);
      setIsPlaying(false);
      
      // Prepare next question but don't play automatically
      setTimeout(() => {
        prepareQuestion();
      }, 500);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Stop current audio if playing
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      
      setCurrentQuestionIndex(prev => prev - 1);
      setIsPlaying(false);
      
      // Prepare previous question but don't play automatically
      setTimeout(() => {
        prepareQuestion();
      }, 500);
    }
  };

  const handleToggleAudio = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      handleSpeakQuestion();
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Floating interview character */}
      <div className="relative w-36 h-36 mb-4">
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-b from-orange-500 to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 opacity-90">
            <div className="absolute bottom-1/3 left-1/4 w-4 h-6 bg-white rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-4 h-6 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Question count and progress indicator */}
      <div className="text-sm text-center mb-2 text-orange-700">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      
      {/* Question display */}
      <Card className="w-full max-w-2xl mx-auto overflow-hidden border-orange-200 shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-white">
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-orange-500/10 z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-orange-500/10 z-0"></div>
            
            <p className="text-xl leading-relaxed text-gray-800 py-8 px-4 relative z-10">
              {currentQuestion}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-orange-100/50 to-orange-50/50">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || isLoading}
              className="border-orange-300 hover:bg-orange-100 text-orange-700"
            >
              Previous
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleToggleAudio}
              disabled={isLoading}
              className="border-orange-300 hover:bg-orange-100 text-orange-700 flex items-center gap-1"
            >
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading
                </span>
              ) : isPlaying ? (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" strokeWidth="2" />
                    <rect x="14" y="4" width="4" height="16" strokeWidth="2" />
                  </svg>
                  Pause
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" strokeWidth="2" />
                  </svg>
                  {audioRef.current && audioRef.current.src ? "Play" : "Prepare Audio"}
                </span>
              )}
            </Button>
          </div>
          
          <div>
            {isLastQuestion ? (
              <Button 
                variant="default" 
                onClick={onReset}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Finish Interview
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={handleNextQuestion}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Next Question
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default InterviewerMode; 