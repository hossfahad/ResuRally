'use client';

import Image from 'next/image';
import { 
  Container, 
  Text, 
  Button, 
  Group, 
  Title, 
  SimpleGrid, 
  Card, 
  Box,
  Stack,
  Timeline,
  List
} from '@mantine/core';
import { 
  IconArrowRight, 
  IconCheck, 
  IconMicrophone, 
  IconDeviceLaptop, 
  IconBulb,
  IconGraph,
  IconAward,
  IconBrandOpenai,
  IconReportAnalytics
} from '@tabler/icons-react';
import MarketingNavbar from '@/components/marketing/navbar';
import MarketingFooter from '@/components/marketing/footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container size="xl">
          <Title order={1} ta="center" mb="sm">
            Powerful Features for Effective Interview Preparation
          </Title>
          <Text c="dimmed" ta="center" mb="xl" size="lg" maw={600} mx="auto">
            Our comprehensive suite of tools helps you prepare with confidence and ace your next interview
          </Text>
        </Container>
      </section>

      {/* Main Features Section */}
      <section className="py-16">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconMicrophone size={40} color="#F97316" />
              <Title order={3} mt="md" mb="xs" size="h4">
                AI-Powered Interviews
              </Title>
              <Text size="sm" c="dimmed" mb="lg">
                Experience realistic interview sessions with our advanced AI interviewer that adapts to your responses in real-time.
              </Text>
              <List spacing="xs" size="sm" center icon={
                <IconCheck size={14} color="#F97316" />
              }>
                <List.Item>Natural conversation flow</List.Item>
                <List.Item>Adaptive follow-up questions</List.Item>
                <List.Item>Industry-specific terminology</List.Item>
                <List.Item>Multiple interview styles</List.Item>
              </List>
            </Card>
            
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconBulb size={40} color="#F97316" />
              <Title order={3} mt="md" mb="xs" size="h4">
                Personalized Questions
              </Title>
              <Text size="sm" c="dimmed" mb="lg">
                Get interview questions tailored specifically to your job description, experience level, and target role.
              </Text>
              <List spacing="xs" size="sm" center icon={
                <IconCheck size={14} color="#F97316" />
              }>
                <List.Item>Job description analysis</List.Item>
                <List.Item>Role-specific questions</List.Item>
                <List.Item>Technical and soft skill focus</List.Item>
                <List.Item>Customizable difficulty levels</List.Item>
              </List>
            </Card>
            
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconReportAnalytics size={40} color="#F97316" />
              <Title order={3} mt="md" mb="xs" size="h4">
                Performance Analysis
              </Title>
              <Text size="sm" c="dimmed" mb="lg">
                Receive detailed feedback on your responses, including content analysis, delivery assessment, and improvement suggestions.
              </Text>
              <List spacing="xs" size="sm" center icon={
                <IconCheck size={14} color="#F97316" />
              }>
                <List.Item>Response quality evaluation</List.Item>
                <List.Item>Keyword and content analysis</List.Item>
                <List.Item>Confidence and clarity metrics</List.Item>
                <List.Item>Improvement recommendations</List.Item>
              </List>
            </Card>
          </SimpleGrid>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <Container size="xl">
          <Title order={2} ta="center" mb="xl">
            How Interview Rally Works
          </Title>
          
          <Timeline active={3} bulletSize={32} lineWidth={2} color="orange">
            <Timeline.Item bullet={<IconDeviceLaptop size={16} />} title="Submit Your Job Description">
              <Text size="sm" mt={4}>
                Enter the job description or role you're interviewing for. Our AI analyzes the requirements and skills needed.
              </Text>
            </Timeline.Item>
            
            <Timeline.Item bullet={<IconBrandOpenai size={16} />} title="Generate Tailored Questions">
              <Text size="sm" mt={4}>
                Our system creates a set of interview questions specifically tailored to the position, including technical, behavioral, and scenario-based queries.
              </Text>
            </Timeline.Item>
            
            <Timeline.Item bullet={<IconMicrophone size={16} />} title="Practice with AI Interviewer">
              <Text size="sm" mt={4}>
                Experience a realistic interview with our AI interviewer that asks questions, listens to your responses, and provides natural conversation flow.
              </Text>
            </Timeline.Item>
            
            <Timeline.Item bullet={<IconGraph size={16} />} title="Review Performance & Improve">
              <Text size="sm" mt={4}>
                Get instant feedback on your responses, with detailed analysis and suggestions for improvement. Track your progress over time.
              </Text>
            </Timeline.Item>
          </Timeline>
        </Container>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} verticalSpacing={50}>
            <div>
              <Title order={2} mb="lg">
                Advanced AI Technology
              </Title>
              <Text size="lg" mb="xl">
                Our platform leverages cutting-edge artificial intelligence to deliver the most realistic and helpful interview practice experience available.
              </Text>
              <Stack gap="md">
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Natural Language Processing for conversational interactions</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Machine Learning algorithms that improve with each session</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Advanced speech recognition for accurate response analysis</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Semantic understanding of context and industry terminology</Text>
                </Group>
              </Stack>
            </div>
            <Box className="relative h-80 md:h-auto">
              <div className="w-full h-full bg-gray-300 rounded-lg"></div>
            </Box>
            
            <Box className="relative h-80 md:h-auto">
              <div className="w-full h-full bg-gray-300 rounded-lg"></div>
            </Box>
            <div>
              <Title order={2} mb="lg">
                Comprehensive Preparation
              </Title>
              <Text size="lg" mb="xl">
                Go beyond basic question-and-answer practice with our holistic interview preparation ecosystem.
              </Text>
              <Stack gap="md">
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Interview question database with thousands of real examples</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Industry-specific preparation modules for specialized roles</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Customizable practice sessions for different interview formats</Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={20} color="#F97316" />
                  <Text>Progress tracking and improvement analytics over time</Text>
                </Group>
              </Stack>
            </div>
          </SimpleGrid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-50">
        <Container size="md" ta="center">
          <IconAward size={64} color="#F97316" className="mb-4" />
          <Title order={2} mb="md">
            Ready to Ace Your Next Interview?
          </Title>
          <Text size="lg" mb="xl" maw={600} mx="auto">
            Join thousands of job seekers who have improved their interview skills and landed their dream positions using Interview Rally.
          </Text>
          <Button 
            size="lg" 
            radius="md"
            color="orange"
            rightSection={<IconArrowRight size={16} />}
            component="a"
            href="/app"
          >
            Start Free Practice
          </Button>
        </Container>
      </section>

      <MarketingFooter />
    </div>
  );
} 