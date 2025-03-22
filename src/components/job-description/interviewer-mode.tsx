'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Paper, 
  Text, 
  Group, 
  Button, 
  Progress, 
  Avatar, 
  Tooltip, 
  Box
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconPlayerPlay, 
  IconPlayerPause, 
  IconChevronLeft, 
  IconChevronRight, 
  IconRefresh 
} from '@tabler/icons-react';

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
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

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
      notifications.show({
        title: 'Question Ready',
        message: 'Click play to hear the question spoken aloud.',
        color: 'orange',
      });
      
    } catch (error) {
      console.error('Error generating speech:', error);
      notifications.show({
        title: 'Audio Generation Failed',
        message: 'We were unable to prepare the audio. Please try again.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentQuestion]);
  
  // Prepare the first question on component mount
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
        notifications.show({
          title: 'Playback Failed',
          message: 'Please ensure your browser has permission to play audio and try again.',
          color: 'red',
        });
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
        notifications.show({
          title: 'Playback Failed',
          message: 'Please ensure your browser has permission to play audio and try again.',
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      notifications.show({
        title: 'Audio Generation Failed',
        message: 'We were unable to generate the speech audio. Please try again.',
        color: 'red',
      });
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
      {/* Interviewer avatar */}
      <div style={{ 
        width: '100px', 
        height: '100px', 
        position: 'relative',
        marginBottom: '20px'
      }}>
        <Avatar
          size="xl"
          radius="xl"
          src={null}
          color="orange"
          variant="gradient"
          gradient={{ from: 'orange', to: 'red', deg: 35 }}
          className="animate-float"
          style={{ 
            width: '100px', 
            height: '100px',
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          IR
        </Avatar>
      </div>

      {/* Progress */}
      <div style={{ width: '100%', maxWidth: '700px', marginBottom: '5px' }}>
        <Group justify="space-between" mb="xs">
          <Text size="sm" c="dimmed">Progress</Text>
          <Text size="sm" c="dimmed" fw={500}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </Group>
        <Progress value={progressPercentage} color="orange" size="sm" radius="xl" />
      </div>
      
      {/* Question display */}
      <Paper 
        radius="md" 
        p="xl" 
        withBorder 
        shadow="md"
        style={{
          width: '100%',
          maxWidth: '700px',
          background: 'linear-gradient(to bottom right, #fff7ed, white)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '-30px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(249, 115, 22, 0.1)',
          zIndex: 0
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(249, 115, 22, 0.1)',
          zIndex: 0
        }} />
        
        <Box my="md" style={{ position: 'relative', zIndex: 1 }}>
          <Text size="xl" lh={1.6}>
            {currentQuestion}
          </Text>
        </Box>
        
        <Group justify="space-between" mt="xl">
          <Group>
            <Tooltip label="Previous question">
              <Button 
                variant="outline" 
                color="orange"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0 || isLoading}
                size="sm"
              >
                <IconChevronLeft size={18} />
              </Button>
            </Tooltip>
            
            <Tooltip label={isPlaying ? "Pause audio" : "Play question aloud"}>
              <Button 
                variant="outline"
                color="orange"
                onClick={handleToggleAudio}
                disabled={isLoading}
                size="sm"
                loading={isLoading}
                leftSection={!isLoading && (isPlaying ? (
                  <IconPlayerPause size={18} />
                ) : (
                  <IconPlayerPlay size={18} />
                ))}
              >
                {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Listen'}
              </Button>
            </Tooltip>
          </Group>
          
          {isLastQuestion ? (
            <Button 
              color="orange"
              onClick={onReset}
              leftSection={<IconRefresh size={18} />}
            >
              Complete & Reset
            </Button>
          ) : (
            <Button 
              color="orange"
              onClick={handleNextQuestion}
              rightSection={<IconChevronRight size={18} />}
            >
              Next Question
            </Button>
          )}
        </Group>
      </Paper>
      
      <Text size="sm" c="dimmed" ta="center" mt="md" style={{ maxWidth: '600px' }}>
        Speak your answer aloud after hearing each question to simulate a real interview experience.
      </Text>
    </div>
  );
};

export default InterviewerMode; 