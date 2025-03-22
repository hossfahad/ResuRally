'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TextToSpeech from './text-to-speech';

interface QuestionsDisplayProps {
  questions: string | null;
  onReset: () => void;
}

const QuestionsDisplay = ({ questions, onReset }: QuestionsDisplayProps) => {
  const [readAllLoading, setReadAllLoading] = useState(false);
  
  if (!questions) return null;

  // Function to format questions for better display
  const formatQuestions = (questionsText: string) => {
    // Split the questions by line breaks or numbered patterns
    const questionArray = questionsText
      .split(/\n+/)
      .filter(line => line.trim().length > 0)
      .map(question => {
        // Remove leading numbers and dots if present
        return question.replace(/^\d+\.\s*/, '').trim();
      });

    return questionArray;
  };

  const formattedQuestions = formatQuestions(questions);

  // Handle reading all questions aloud
  const handleReadAll = async () => {
    setReadAllLoading(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: formattedQuestions.join('. Next question. ') }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Error reading all questions:', error);
    } finally {
      setReadAllLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Generated Interview Questions</CardTitle>
            <CardDescription>
              Use these questions to prepare for your interview
            </CardDescription>
          </div>
          <Button 
            onClick={handleReadAll} 
            variant="outline"
            disabled={readAllLoading}
            className="flex items-center gap-2"
          >
            {readAllLoading ? 'Reading...' : 'Read All Questions'}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-4">
          {formattedQuestions.map((question, index) => (
            <li key={index} className="pl-2 flex items-start gap-2">
              <TextToSpeech text={question} />
              <span className="text-base">{question}</span>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full"
        >
          Generate New Questions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionsDisplay; 