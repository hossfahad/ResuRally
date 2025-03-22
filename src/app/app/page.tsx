'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Text, Group, Button, Paper, Tabs, Divider, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconMicrophone, IconList, IconPlayerPlay } from '@tabler/icons-react';

import JobDescriptionForm from '@/components/job-description/job-description-form';
import QuestionsDisplay from '@/components/job-description/questions-display';
import InterviewerMode from '@/components/job-description/interviewer-mode';
import InterviewHistorySidebar from '@/components/interview-history/interview-history-sidebar';
import { saveInterview, getInterviews, JobInterview } from '@/utils/interview-storage';

export default function AppPage() {
  const [questions, setQuestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewMode, setInterviewMode] = useState(true); // Enable interviewer mode by default
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentJobDescription, setCurrentJobDescription] = useState<string>('');
  const [selectedInterview, setSelectedInterview] = useState<JobInterview | null>(null);

  // Handler for submitting job description
  const handleSubmit = async (jobDescription: string, title: string) => {
    setCurrentTitle(title);
    setCurrentJobDescription(jobDescription);
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
      
      // Save interview to storage
      saveInterview({
        title: title,
        job_description: jobDescription,
        questions: data.questions,
      });
      
      // Show success notification with appropriate mode info
      if (interviewMode) {
        notifications.show({
          title: 'Interview Prepared',
          message: 'Your personalized interview session is ready. Click Play to begin your practice.',
          color: 'orange',
        });
      } else {
        notifications.show({
          title: 'Questions Generated',
          message: 'Your tailored interview questions are ready. Utilize the audio feature for a more immersive experience.',
          color: 'orange',
        });
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      notifications.show({
        title: 'Generation Failed',
        message: 'We encountered an issue creating your questions. Please try again.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for resetting questions
  const handleReset = () => {
    setQuestions(null);
    setSelectedInterview(null);
  };
  
  // Handler for loading a selected interview
  const handleSelectInterview = (interview: JobInterview) => {
    setSelectedInterview(interview);
    setCurrentTitle(interview.title);
    setCurrentJobDescription(interview.job_description);
    setQuestions(interview.questions);
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
    <div style={{ 
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
      minHeight: '100vh'
    }}>
      <Container size="lg" py="xl">
        <header className="text-center mb-10">
          <div
            style={{
              backgroundImage: 'linear-gradient(to right, #EA580C, #FB923C)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem',
              fontWeight: 400,
              marginBottom: '0.5rem',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Interview Rally
          </div>
          <Text color="dimmed" size="lg" mb="lg" style={{ fontFamily: 'Calibri, sans-serif' }}>
            Elevate your interview preparation with AI-powered personalized questions
          </Text>
          
          {!questions && (
            <Paper radius="md" p="md" withBorder mb="lg">
              <Text size="sm" mb="md" fw={500}>
                Select your preparation mode:
              </Text>
              <Tabs 
                value={interviewMode ? 'interviewer' : 'list'} 
                onChange={(value) => setInterviewMode(value === 'interviewer')}
                radius="xl"
              >
                <Tabs.List grow>
                  <Tabs.Tab 
                    value="interviewer"
                    leftSection={<IconMicrophone size={16} />}
                  >
                    Interactive Interview
                  </Tabs.Tab>
                  <Tabs.Tab 
                    value="list"
                    leftSection={<IconList size={16} />}
                  >
                    Question List
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
              
              {interviewMode && (
                <Paper radius="md" p="sm" withBorder mt="md" bg="rgba(249, 115, 22, 0.05)">
                  <Text size="sm" c="orange.8">
                    <strong>Interactive Mode:</strong> Experience a realistic interview simulation with questions presented one by one. Speak your responses aloud for the full interview experience.
                  </Text>
                </Paper>
              )}
            </Paper>
          )}
        </header>
        
        <main>
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <InterviewHistorySidebar onSelectInterview={handleSelectInterview} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 9 }}>
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
            </Grid.Col>
          </Grid>
        </main>
        
        <Divider my="xl" />
        
        <footer className="text-center">
          <Text size="sm" c="dimmed">
            &copy; {new Date().getFullYear()} Interview Rally. All rights reserved.
          </Text>
          <Text size="xs" c="dimmed" mt={5}>
            Powered by advanced AI to help you succeed in your career journey.
          </Text>
        </footer>
      </Container>
    </div>
  );
} 