'use client';

import Link from 'next/link';
import { 
  Container, 
  Text, 
  Button, 
  Group, 
  Title, 
  SimpleGrid, 
  Paper, 
  Badge, 
  Stack,
  Divider
} from '@mantine/core';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';

// Add these imports
import MarketingNavbar from '@/components/marketing/navbar';
import MarketingFooter from '@/components/marketing/footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Replace the header with MarketingNavbar */}
      <MarketingNavbar />

      {/* Pricing Banner */}
      <section className="py-16 bg-gray-50">
        <Container size="xl">
          <Title order={1} ta="center" mb="sm">
            Pricing Plans
          </Title>
          <Text c="dimmed" ta="center" mb="xl" size="lg" maw={600} mx="auto">
            Choose the plan that works best for your interview preparation needs
          </Text>
        </Container>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            {/* Free Plan */}
            <Paper p="xl" radius="md" withBorder className="border-gray-200">
              <Badge color="gray" variant="outline" size="lg" radius="sm" mb="md">
                Free Plan
              </Badge>
              <Title order={1} fw={700}>
                $0<Text span size="sm" c="dimmed">/mo</Text>
              </Title>
              <Text mt="xs" mb="xl" c="dimmed">
                Try out our basic features
              </Text>
              
              <Stack gap="xs" mb="xl">
                {[
                  "3 AI Interview Sessions",
                  "Basic Questions Only",
                  "Text-based Interviews",
                  "Standard Questions Library"
                ].map((feature, index) => (
                  <Group key={index} gap="xs">
                    <IconCheck size={18} color="#F97316" />
                    <Text size="sm">{feature}</Text>
                  </Group>
                ))}
              </Stack>
              
              <Button 
                component={Link}
                href="/app"
                fullWidth 
                variant="outline"
                color="gray" 
                size="md" 
                radius="md"
              >
                Get Started
              </Button>
            </Paper>

            {/* Basic Plan */}
            <Paper p="xl" radius="md" withBorder className="border-orange-500 shadow-lg">
              <Badge color="orange" variant="filled" size="lg" radius="sm" mb="md">
                Popular
              </Badge>
              <Title order={1} fw={700}>
                $19<Text span size="sm" c="dimmed">/mo</Text>
              </Title>
              <Text mt="xs" mb="xl" c="dimmed">
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
                  "Basic Reporting"
                ].map((feature, index) => (
                  <Group key={index} gap="xs">
                    <IconCheck size={18} color="#F97316" />
                    <Text size="sm">{feature}</Text>
                  </Group>
                ))}
              </Stack>
              
              <Button 
                component={Link}
                href="/app"
                fullWidth 
                color="orange" 
                size="md" 
                radius="md"
              >
                Choose Plan
              </Button>
            </Paper>
            
            {/* Pro Plan */}
            <Paper p="xl" radius="md" withBorder className="border-gray-200">
              <Badge color="orange" variant="outline" size="lg" radius="sm" mb="md">
                Pro Plan
              </Badge>
              <Title order={1} fw={700}>
                $49<Text span size="sm" c="dimmed">/mo</Text>
              </Title>
              <Text mt="xs" mb="xl" c="dimmed">
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
                    <Text size="sm">{feature}</Text>
                  </Group>
                ))}
              </Stack>
              
              <Button 
                component={Link}
                href="/app"
                fullWidth 
                variant="outline"
                color="orange" 
                size="md" 
                radius="md"
              >
                Choose Plan
              </Button>
            </Paper>
          </SimpleGrid>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <Container size="xl">
          <Title order={2} ta="center" mb="xl">
            Frequently Asked Questions
          </Title>
          
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <div>
              <Title order={3} size="h5" mb="sm">
                Can I cancel my subscription anytime?
              </Title>
              <Text mb="xl">
                Yes, you can cancel your subscription at any time. Upon cancellation, you'll maintain access to your plan until the end of your billing period.
              </Text>
            </div>
            
            <div>
              <Title order={3} size="h5" mb="sm">
                What payment methods do you accept?
              </Title>
              <Text mb="xl">
                We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.
              </Text>
            </div>
            
            <div>
              <Title order={3} size="h5" mb="sm">
                How do I upgrade or downgrade my plan?
              </Title>
              <Text mb="xl">
                You can easily change your plan in the account settings. Changes will take effect on your next billing cycle.
              </Text>
            </div>
            
            <div>
              <Title order={3} size="h5" mb="sm">
                Is there a free trial available?
              </Title>
              <Text mb="xl">
                Yes, we offer a 7-day free trial on our Basic and Pro plans so you can experience the full features before committing.
              </Text>
            </div>
          </SimpleGrid>
          
          <div className="text-center mt-10">
            <Button
              component={Link}
              href="/marketing"
              variant="outline"
              color="gray"
              leftSection={<IconArrowLeft size={16} />}
            >
              Back to Homepage
            </Button>
          </div>
        </Container>
      </section>

      {/* Replace the footer with MarketingFooter */}
      <MarketingFooter />
    </div>
  );
} 