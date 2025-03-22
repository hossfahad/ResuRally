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

// Add image imports
import appInActionImage from '@/assets/images/app-in-action.png';
import appDescriptionFormImage from '@/assets/images/kaitlyn-baker-vZJdYl5JVXY-unsplash.jpg';
import interviewSimulationImage from '@/assets/images/olena-bohovyk-dIMJWLx1YbE-unsplash.jpg';

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
                src={appInActionImage}
                alt="App in action"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                priority
                style={{ objectPosition: 'center 30%' }}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-20 bg-gray-50">
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
                component={Link}
                href="/app"
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
                component={Link}
                href="/app"
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
                component={Link}
                href="/app"
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
                src={appDescriptionFormImage}
                alt="Interview Rally job description form"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain rounded-lg bg-gray-50"
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
                component={Link}
                href="#pricing"
                variant="outline" 
                color="orange" 
                size="md" 
                radius="md" 
                mt="lg"
                rightSection={<IconArrowRight size={16} />}
              >
                View Pricing
              </Button>
            </div>
          </SimpleGrid>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-800 text-white">
        <Container size="xl">
          <Title order={2} ta="center" mb="sm" c="white">
            Pricing Plans
          </Title>
          <Text c="gray.3" ta="center" mb="xl" size="lg" maw={600} mx="auto">
            Choose the plan that works best for your interview preparation needs
          </Text>
          
          <div className="flex justify-center">
            <table className="divide-y divide-gray-200 mt-12">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    Plan
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Interviews included
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Subscribe</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                    Playing Around
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    $0
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    3 interviews
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                      href="/auth/signup"
                      className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      Get started
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                    Brushing Up
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    $5
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    5 interviews
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                      href="/auth/signup"
                      className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      Subscribe
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                    Help Me
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    $10
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    15 interviews
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                      href="/auth/signup"
                      className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      Subscribe
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                  component={Link}
                  href="#features"
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
                src={interviewSimulationImage}
                alt="Interview Rally simulation interface"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain rounded-lg bg-gray-50"
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