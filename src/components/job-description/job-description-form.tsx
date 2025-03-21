'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Schema for job description form validation
const formSchema = z.object({
  jobDescription: z
    .string()
    .min(50, {
      message: 'Job description must be at least 50 characters long',
    })
    .max(20000, {
      message: 'Job description must not exceed 20,000 characters',
    }),
});

// Type for the form values
type FormValues = z.infer<typeof formSchema>;

// Type for the component props
interface JobDescriptionFormProps {
  onSubmit: (jobDescription: string) => Promise<void>;
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
      jobDescription: '',
    },
  });

  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values.jobDescription);
    } catch (error) {
      toast.error('Failed to generate interview questions. Please try again.');
    }
  };

  return (
    <Card className="w-full border-orange-200 overflow-hidden bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
        <CardTitle className="text-orange-800">Job Description</CardTitle>
        <CardDescription className="text-orange-600">
          Paste a job description to generate tailored interview questions
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-orange-700">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the job description here..."
                      className="min-h-[200px] resize-y border-orange-200 focus-visible:ring-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-600" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-orange-50 to-white p-6">
            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700" 
              disabled={isLoading}
            >
              {isLoading ? 'Generating Questions...' : 'Start Interview'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default JobDescriptionForm; 