'use client';

import { useState, useEffect } from 'react';
import { 
  Paper, 
  Title, 
  Text, 
  Stack, 
  Group, 
  ScrollArea, 
  Button,
  Badge 
} from '@mantine/core';
import { IconBriefcase, IconHistory, IconCalendar } from '@tabler/icons-react';

// Define types for our interview history data
type JobInterview = {
  id: string;
  title: string;
  job_description: string;
  created_at: string;
  questions: string;
  score?: number;
};

interface InterviewHistorySidebarProps {
  onSelectInterview: (interview: JobInterview) => void;
}

const InterviewHistorySidebar = ({ onSelectInterview }: InterviewHistorySidebarProps) => {
  const [interviews, setInterviews] = useState<JobInterview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Load interviews from local storage when component mounts
  useEffect(() => {
    const loadInterviews = () => {
      try {
        const savedInterviews = localStorage.getItem('interview-history');
        if (savedInterviews) {
          setInterviews(JSON.parse(savedInterviews));
        }
      } catch (error) {
        console.error('Error loading interview history from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInterviews();
  }, []);
  
  if (interviews.length === 0 && !isLoading) {
    return (
      <Paper p="md" radius="md" withBorder>
        <Group align="center" mb="xs">
          <IconHistory size={20} color="#F97316" />
          <Title order={3} size="h4">Interview History</Title>
        </Group>
        <Text size="sm" c="dimmed" mb="md">
          No previous interviews found. Complete your first interview to see it here.
        </Text>
      </Paper>
    );
  }
  
  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Sort interviews by date (newest first)
  const sortedInterviews = [...interviews].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  return (
    <Paper p="md" radius="md" withBorder>
      <Group align="center" mb="md">
        <IconHistory size={20} color="#F97316" />
        <Title order={3} size="h4">Interview History</Title>
      </Group>
      
      <ScrollArea h={350} offsetScrollbars scrollbarSize={6}>
        <Stack gap="sm">
          {sortedInterviews.map((interview) => (
            <Paper 
              key={interview.id}
              p="sm" 
              radius="sm" 
              withBorder
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectInterview(interview)}
            >
              <Text size="sm" fw={500} lineClamp={1}>
                {interview.title || 'Untitled Interview'}
              </Text>
              
              <Group gap="xs" mt="xs">
                <IconCalendar size={14} color="#6B7280" />
                <Text size="xs" c="dimmed">
                  {formatDate(interview.created_at)}
                </Text>
              </Group>
              
              {interview.score !== undefined && (
                <Badge 
                  color={interview.score > 70 ? 'green' : interview.score > 40 ? 'yellow' : 'red'} 
                  variant="outline" 
                  size="sm" 
                  mt="xs"
                >
                  Score: {interview.score}%
                </Badge>
              )}
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
    </Paper>
  );
};

export default InterviewHistorySidebar; 