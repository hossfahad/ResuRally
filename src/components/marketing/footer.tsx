'use client';

import Link from 'next/link';
import { Container, Text, Group, SimpleGrid, Stack, Divider } from '@mantine/core';
import { IconBrandTwitter, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';

export default function MarketingFooter() {
  const footerLinks = {
    company: [
      { label: 'Home', link: '/marketing' },
      { label: 'Features', link: '/marketing/features' },
      { label: 'Pricing', link: '/marketing/pricing' },
      { label: 'About Us', link: '/marketing/about' }
    ],
    support: [
      { label: 'FAQ', link: '/marketing/faq' },
      { label: 'Help Center', link: '/marketing/help' },
      { label: 'Contact Us', link: '/marketing/contact' }
    ],
    legal: [
      { label: 'Terms of Service', link: '/marketing/terms' },
      { label: 'Privacy Policy', link: '/marketing/privacy' },
      { label: 'Cookie Policy', link: '/marketing/cookies' }
    ]
  };

  return (
    <footer className="py-10 bg-gray-100">
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="xl">
          <div>
            <Text fw={700} mb="md">Interview Rally</Text>
            <Stack gap="xs">
              {footerLinks.company.map((link) => (
                <Link 
                  key={link.label}
                  href={link.link} 
                  className="no-underline text-gray-600 hover:text-orange-600"
                >
                  <Text size="sm">{link.label}</Text>
                </Link>
              ))}
            </Stack>
          </div>
          
          <div>
            <Text fw={700} mb="md">Support</Text>
            <Stack gap="xs">
              {footerLinks.support.map((link) => (
                <Link 
                  key={link.label}
                  href={link.link} 
                  className="no-underline text-gray-600 hover:text-orange-600"
                >
                  <Text size="sm">{link.label}</Text>
                </Link>
              ))}
            </Stack>
          </div>
          
          <div>
            <Text fw={700} mb="md">Legal</Text>
            <Stack gap="xs">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.label}
                  href={link.link} 
                  className="no-underline text-gray-600 hover:text-orange-600"
                >
                  <Text size="sm">{link.label}</Text>
                </Link>
              ))}
            </Stack>
          </div>
          
          <div>
            <Text fw={700} mb="md">Connect</Text>
            <Group gap="xs">
              <a href="#" className="text-gray-600 hover:text-orange-600" aria-label="Twitter">
                <IconBrandTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600" aria-label="Facebook">
                <IconBrandFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600" aria-label="LinkedIn">
                <IconBrandLinkedin size={24} />
              </a>
            </Group>
          </div>
        </SimpleGrid>
        
        <Divider my="lg" />
        
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            &copy; {new Date().getFullYear()} Interview Rally. All rights reserved.
          </Text>
          <Group gap="xs">
            <img src="/user-1.jpg" alt="" className="w-6 h-6 rounded-full" />
            <img src="/user-2.jpg" alt="" className="w-6 h-6 rounded-full" />
            <img src="/user-3.jpg" alt="" className="w-6 h-6 rounded-full" />
          </Group>
        </Group>
      </Container>
    </footer>
  );
} 