'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

import JobDescriptionForm from '@/components/job-description/job-description-form';
import QuestionsDisplay from '@/components/job-description/questions-display';
import InterviewerMode from '@/components/job-description/interviewer-mode';

export default function Home() {
  const [questions, setQuestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewMode, setInterviewMode] = useState(true); // Enable interviewer mode by default

  // Handler for submitting job description
  const handleSubmit = async (jobDescription: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      
      // Show success toast with appropriate mode info
      if (interviewMode) {
        toast.success(
          "Your interview is starting! Listen to the questions and prepare your answers.",
          { duration: 5000 }
        );
      } else {
        toast.success(
          "Questions generated! Click the play button next to a question to hear it spoken aloud.",
          { duration: 5000 }
        );
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for resetting questions
  const handleReset = () => {
    setQuestions(null);
  };

  // Function to format questions for interviewer mode
  const formatQuestionsForInterviewer = (questionsText: string | null) => {
    if (!questionsText) return [];
    
    // Split the questions by line breaks or numbered patterns
    return questionsText
      .split(/\n+/)
      .filter(line => line.trim().length > 0)
      .map(question => {
        // Remove leading numbers and dots if present
        return question.replace(/^\d+\.\s*/, '').trim();
      });
  };

  const formattedQuestions = formatQuestionsForInterviewer(questions);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-orange-50 to-white">
      <Toaster position="top-center" />
      
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
          Interview Rally
        </h1>
        <p className="text-orange-700 mb-4">
          Generate tailored interview questions based on job descriptions
        </p>
        
        {!questions && (
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={() => setInterviewMode(true)}
              className={`px-4 py-2 rounded-full transition-all ${
                interviewMode 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              Interviewer Mode
            </button>
            <button
              onClick={() => setInterviewMode(false)}
              className={`px-4 py-2 rounded-full transition-all ${
                !interviewMode 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              List Mode
            </button>
          </div>
        )}
        
        {!questions && interviewMode && (
          <p className="text-sm text-orange-700 bg-orange-100 p-2 rounded-md max-w-md mx-auto">
            <span className="font-semibold">Interviewer Mode:</span> Questions will be presented one by one and read aloud automatically.
          </p>
        )}
      </header>
      
      <main className="w-full max-w-3xl mx-auto mb-8">
        {questions ? (
          interviewMode ? (
            <InterviewerMode 
              questions={formattedQuestions} 
              onReset={handleReset} 
            />
          ) : (
            <QuestionsDisplay 
              questions={questions} 
              onReset={handleReset} 
            />
          )
        ) : (
          <JobDescriptionForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
      </main>
      
      <footer className="w-full max-w-4xl text-center text-sm text-orange-600 mt-auto pt-8">
        <p>&copy; {new Date().getFullYear()} Interview Rally. All rights reserved.</p>
      </footer>
    </div>
  );
}
