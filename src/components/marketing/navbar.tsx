'use client';

import Link from 'next/link';
import { Container, Group, Text, Button, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function MarketingNavbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<string>('');

  const navLinks = [
    { link: '/marketing', label: 'Home' },
    { link: '/marketing/pricing', label: 'Pricing' },
    { link: '#', label: 'Help' }
  ];

  const navItems = navLinks.map((link) => (
    <Link 
      key={link.label}
      href={link.link}
      className={`no-underline text-gray-700 hover:text-orange-600 ${active === link.link ? 'text-orange-600 font-medium' : ''}`}
      onClick={() => {
        setActive(link.link);
        close();
      }}
    >
      <Text size="sm" fw={500} className={active === link.link ? 'text-orange-600' : ''}>
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <header className="py-4 border-b border-gray-200">
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Link href="/marketing" className="no-underline text-gray-900">
            <div className="font-bold text-xl">Interview Rally</div>
          </Link>

          {/* Desktop navigation */}
          <Group gap="xl" visibleFrom="sm">
            {navItems}
            <Link href="/app" className="no-underline">
              <Button variant="filled" radius="md" color="orange" size="xs">
                Log in
              </Button>
            </Link>
          </Group>

          {/* Mobile navigation */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          <Drawer
            opened={opened}
            onClose={close}
            title="Interview Rally"
            padding="xl"
            size="100%"
            position="right"
          >
            <Stack gap="lg">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.link}
                  className={`no-underline text-gray-700 hover:text-orange-600 ${active === link.link ? 'text-orange-600 font-medium' : ''}`}
                  onClick={() => {
                    setActive(link.link);
                    close();
                  }}
                >
                  <Text size="lg" fw={500}>
                    {link.label}
                  </Text>
                </Link>
              ))}
              <Link href="/app" className="no-underline">
                <Button variant="filled" radius="md" color="orange" fullWidth>
                  Log in
                </Button>
              </Link>
            </Stack>
          </Drawer>
        </Group>
      </Container>
    </header>
  );
} 