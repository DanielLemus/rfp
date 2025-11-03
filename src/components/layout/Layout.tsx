import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box as="main" p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};
