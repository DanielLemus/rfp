import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Page Not Found - React Enterprise App</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <VStack spacing={6} textAlign="center">
          <Heading size="2xl" color="gray.600">
            404
          </Heading>
          <Heading size="lg">Page Not Found</Heading>
          <Text color="gray.500" maxW="md">
            The page you're looking for doesn't exist or has been moved.
          </Text>
          <Button
            colorScheme="brand"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default NotFound;
