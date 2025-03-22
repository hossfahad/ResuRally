'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Text, 
  Button, 
  Group, 
  Title, 
  SimpleGrid, 
  Card, 
  Badge, 
  Paper, 
  Divider, 
  Stack, 
  Box 
} from '@mantine/core';
import { 
  IconArrowRight, 
  IconCheck, 
  IconUserCircle, 
  IconDeviceLaptop, 
  IconAward 
} from '@tabler/icons-react';

// Add these imports
import MarketingNavbar from '@/components/marketing/navbar';
import MarketingFooter from '@/components/marketing/footer';

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      {/* Replace the header with MarketingNavbar */}
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="py-20">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <div>
              <Badge color="orange" variant="light" size="lg" radius="sm" mb="sm">
                Interview Preparation
              </Badge>
              <Title order={1} fw={700} mb="md" size="h1">
                Tailored Interview Questions for Your Unique Job Application
              </Title>
              <Text size="lg" c="dimmed" mb="xl">
                Practice with AI-generated questions specific to your job description and get real-time feedback to improve your interview skills.
              </Text>
              <Group>
                <Button 
                  component={Link} 
                  href="/app" 
                  size="md" 
                  radius="md"
                  color="orange"
                  rightSection={<IconArrowRight size={16} />}
                >
                  Try it Free
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  size="md"
                  radius="md"
                >
                  Learn More
                </Button>
              </Group>
            </div>
            <Box className="relative h-80 md:h-auto">
              <Image
                src="/interview-hero.jpg"
                alt="Interview preparation scene"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </Box>
          </SimpleGrid>
        </Container>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-gray-50">
        <Container size="xl">
          <Title order={2} ta="center" mb="sm">
            Experience the Future of Interviewing
          </Title>
          <Text c="dimmed" ta="center" mb="xl" size="lg" maw={600} mx="auto">
            Our AI-powered platform transforms how you prepare for interviews with personalized questions and real-time feedback.
          </Text>
          
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt={50}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconUserCircle size={40} color="#F97316" />
              <Title order={3} mt="md" mb="xs" size="h4">
                Realistic Practice
              </Title>
              <Text size="sm" c="dimmed">
                Face interview questions that match real-world scenarios for your specific role and industry.
              </Text>
              <Button 
                variant="light" 
                color="orange" 
                fullWidth 
                mt="md" 
                radius="md"
                rightSection={<IconArrowRight size={16} />}
              >
                Try Now
              </Button>
            </Card>
            
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconDeviceLaptop size={40} color="#F97316" />
              <Title order={3} mt="md" mb="xs" size="h4">
                Record & Review
              </Title>
              <Text size="sm" c="dimmed">
                Record your responses and get detailed feedback on your answers, delivery, and presence.
              </Text>
              <Button 
                variant="light" 
                color="orange" 
                fullWidth 
                mt="md" 
                radius="md"
                rightSection={<IconArrowRight size={16} />}
              >
                Try Now
              </Button>
            </Card>
            
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconAward size={40} color="#F97316" />
              <Title order={3} mt="md" mb="xs" size="h4">
                Structured Feedback
              </Title>
              <Text size="sm" c="dimmed">
                Receive actionable insights that help you improve your responses and build confidence.
              </Text>
              <Button 
                variant="light" 
                color="orange" 
                fullWidth 
                mt="md" 
                radius="md"
                rightSection={<IconArrowRight size={16} />}
              >
                Try Now
              </Button>
            </Card>
          </SimpleGrid>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Box className="relative h-80 md:h-auto">
              <Image
                src="/testimonial-image.jpg"
                alt="Person practicing interview"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </Box>
            <div>
              <Title order={2} mb="lg">
                Experience Realistic Interviews with Advanced AI Interviewers
              </Title>
              <Text size="lg" mb="xl">
                Our platform simulates real interview conditions with AI that adapts to your responses, providing a seamless and authentic experience.
              </Text>
              <Group gap="xs" mb="md">
                <IconCheck size={20} color="#F97316" />
                <Text>Adaptive questioning based on your responses</Text>
              </Group>
              <Group gap="xs" mb="md">
                <IconCheck size={20} color="#F97316" />
                <Text>Industry-specific terminology and scenarios</Text>
              </Group>
              <Group gap="xs" mb="md">
                <IconCheck size={20} color="#F97316" />
                <Text>Personalized feedback on your performance</Text>
              </Group>
              <Button 
                variant="outline" 
                color="orange" 
                size="md" 
                radius="md" 
                mt="lg"
                rightSection={<IconArrowRight size={16} />}
              >
                Learn More
              </Button>
            </div>
          </SimpleGrid>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-800 text-white">
        <Container size="xl">
          <Title order={2} ta="center" mb="sm" c="white">
            Pricing Plans
          </Title>
          <Text c="gray.3" ta="center" mb="xl" size="lg" maw={600} mx="auto">
            Choose the plan that works best for your interview preparation needs
          </Text>
          
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Paper p="xl" radius="md" className="border border-gray-700 bg-gray-800">
              <Badge color="gray" variant="outline" size="lg" radius="sm" mb="md">
                Basic Plan
              </Badge>
              <Title order={1} fw={700} c="white">
                $19<Text span size="sm" c="gray.3">/mo</Text>
              </Title>
              <Text mt="xs" mb="xl" c="gray.3">
                Perfect for job seekers in active search
              </Text>
              
              <Stack gap="xs" mb="xl">
                {[
                  "10 AI Interview Sessions",
                  "Basic Response Analysis",
                  "Job Description Analysis",
                  "Question Database Access",
                  "Email Support",
                  "Mobile Access",
                  "1 Interview Type",
                  "Basic Reporting",
                  "Standard Questions Library",
                  "1 Export Format"
                ].map((feature, index) => (
                  <Group key={index} gap="xs">
                    <IconCheck size={18} color="#F97316" />
                    <Text size="sm" c="gray.2">{feature}</Text>
                  </Group>
                ))}
              </Stack>
              
              <Button 
                fullWidth 
                color="orange" 
                size="md" 
                radius="md"
              >
                Get Started
              </Button>
            </Paper>
            
            <Paper p="xl" radius="md" className="border border-gray-700 bg-gray-800">
              <Badge color="orange" variant="outline" size="lg" radius="sm" mb="md">
                Pro Plan
              </Badge>
              <Title order={1} fw={700} c="white">
                $19<Text span size="sm" c="gray.3">/mo</Text>
              </Title>
              <Text mt="xs" mb="xl" c="gray.3">
                Ideal for professionals seeking career advancement
              </Text>
              
              <Stack gap="xs" mb="xl">
                {[
                  "Unlimited AI Interview Sessions",
                  "Advanced Response Analysis",
                  "Custom Job Description Analysis",
                  "Full Question Database Access",
                  "Priority Email Support",
                  "Mobile & Desktop Access",
                  "All Interview Types",
                  "Detailed Performance Reports",
                  "Premium Questions Library",
                  "Multiple Export Formats"
                ].map((feature, index) => (
                  <Group key={index} gap="xs">
                    <IconCheck size={18} color="#F97316" />
                    <Text size="sm" c="gray.2">{feature}</Text>
                  </Group>
                ))}
              </Stack>
              
              <Button 
                fullWidth 
                color="orange" 
                size="md" 
                radius="md"
              >
                Get Started
              </Button>
            </Paper>
          </SimpleGrid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <div>
              <Title order={2} mb="md">
                Unlock Your Interview Potential with Confidence
              </Title>
              <Text size="lg" mb="xl">
                Join thousands of successful job seekers who have improved their interview skills and landed their dream jobs.
              </Text>
              <Group>
                <Button 
                  color="orange" 
                  size="md" 
                  radius="md"
                  rightSection={<IconArrowRight size={16} />}
                >
                  Start Free
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  size="md"
                  radius="md"
                >
                  Learn More
                </Button>
              </Group>
            </div>
            <Box className="relative h-80 md:h-auto">
              <Image
                src="/interview-cta.jpg"
                alt="Professional at interview"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </Box>
          </SimpleGrid>
        </Container>
      </section>

      {/* Replace the footer with MarketingFooter */}
      <MarketingFooter />
    </div>
  );
} 