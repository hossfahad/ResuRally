'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { 
  Paper, 
  Title, 
  Text, 
  Textarea, 
  Button, 
  Group,
  Box,
} from '@mantine/core';
import { IconBriefcase, IconSend } from '@tabler/icons-react';

// Schema for job description form validation
const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.',
    })
    .max(100, {
      message: 'Title cannot exceed 100 characters.',
    }),
  jobDescription: z
    .string()
    .min(50, {
      message: 'Job description must include at least 50 characters for meaningful analysis.',
    })
    .max(20000, {
      message: 'Job description exceeds the 20,000 character limit.',
    }),
});

// Type for the form values
type FormValues = z.infer<typeof formSchema>;

// Type for the component props
interface JobDescriptionFormProps {
  onSubmit: (jobDescription: string, title: string) => Promise<void>;
  isLoading: boolean;
}

const JobDescriptionForm = ({
  onSubmit,
  isLoading,
}: JobDescriptionFormProps) => {
  // Initialize form with default values and validation resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      jobDescription: '',
    },
  });

  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values.jobDescription, values.title);
    } catch (_) {
      notifications.show({
        title: 'Process Failed',
        message: 'We encountered an issue generating your interview questions. Please try again.',
        color: 'red',
      });
    }
  };

  const { errors } = form.formState;

  return (
    <Paper radius="md" p="xl" withBorder shadow="md" style={{ position: 'relative' }}>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10,
        display: isLoading ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isLoading && <div className="loading-spinner" />}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box>
          <Group align="center" mb="xs">
            <IconBriefcase size={24} color="#F97316" />
            <Title order={2} size="h3">Job Description Analysis</Title>
          </Group>
          <Text c="dimmed" size="sm">
            Paste a job description below to generate tailored interview questions for your preparation.
          </Text>
        </Box>
        
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              placeholder="E.g., Senior Software Engineer at Google"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...form.register('title')}
              aria-label="Interview Title"
            />
            {errors.title && (
              <Text size="xs" c="red">
                {errors.title.message}
              </Text>
            )}
            
            <Textarea
              placeholder="Paste the complete job description here..."
              label="Job Description"
              description="Our AI will analyze the job requirements to create relevant interview questions."
              minRows={8}
              maxRows={12}
              autosize
              required
              error={errors.jobDescription?.message}
              {...form.register('jobDescription')}
            />
            
            <Button 
              type="submit" 
              fullWidth
              color="orange"
              leftSection={<IconSend size={18} />}
              loading={isLoading}
            >
              {isLoading ? 'Analyzing Job Description...' : 'Generate Interview Questions'}
            </Button>
            
            <Text size="xs" c="dimmed" ta="center">
              Your data is processed securely. We do not store job descriptions or use them for training.
            </Text>
          </div>
        </form>
      </div>
    </Paper>
  );
};

export default JobDescriptionForm; 