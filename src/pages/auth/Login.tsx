import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';

import { useAuthStore } from '@/stores/slices/authSlice';

const Login: React.FC = () => {
  const { login } = useAuthStore();

  const handleLogin = () => {
    // Mock login - replace with real authentication
    const mockUser = {
      id: '1',
      email: '',
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin' as any,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    login(mockUser, 'mock-jwt-token');
  };

  return (
    <>
      <Helmet>
        <title>Login - React Enterprise App</title>
        <meta name="description" content="Login to your account" />
      </Helmet>

      <Box position="relative">
        <Container
          as={SimpleGrid}
          maxW="7xl"
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            >
              Enterprise App{' '}
              <Text as="span" bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                &
              </Text>{' '}
              Modern Stack
            </Heading>
            <Stack direction="row" spacing={4} align="center">
              <AvatarGroup>
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  size="md"
                  position="relative"
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                  size="md"
                />
                <Avatar
                  name="Kent Dodds"
                  src="https://bit.ly/kent-c-dodds"
                  size="md"
                />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                  size="md"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                  size="md"
                />
              </AvatarGroup>
              <Text fontFamily="heading" fontSize="4xl">
                +
              </Text>
              <Flex
                align="center"
                justify="center"
                fontFamily="heading"
                fontSize={{ base: 'sm', md: 'lg' }}
                bg="gray.800"
                color="white"
                rounded="full"
                minW={{ base: '44px', md: '60px' }}
                minH={{ base: '44px', md: '60px' }}
                position="relative"
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Stack>
          <Stack
            bg="gray.50"
            rounded="xl"
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
          >
            <Stack spacing={4}>
              <Heading
                color="gray.800"
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              >
                Sign in to your account
                <Text as="span" bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                  !
                </Text>
              </Heading>
              <Text color="gray.500" fontSize={{ base: 'sm', sm: 'md' }}>
                Demo login - click the button below
              </Text>
            </Stack>
            <Box as="form" mt={10}>
              <Stack spacing={4}>
                <Input
                  placeholder="firstname@lastname.io"
                  bg="gray.100"
                  border={0}
                  color="gray.500"
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  value="admin@example.com"
                  readOnly
                />
                <Input
                  placeholder="password"
                  bg="gray.100"
                  border={0}
                  color="gray.500"
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type="password"
                  value="password"
                  readOnly
                />
              </Stack>
              <Button
                fontFamily="heading"
                mt={8}
                w="full"
                bgGradient="linear(to-r, red.400,pink.400)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={handleLogin}
              >
                Sign In (Demo)
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Login;
