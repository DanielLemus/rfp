import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Heading } from '@chakra-ui/react';

const Users: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Users - React Enterprise App</title>
        <meta name="description" content="User management page" />
      </Helmet>

      <Box>
        <Heading mb={6}>Users</Heading>
        <Box>
          {/* User management components will go here */}
          <p>User management functionality coming soon...</p>
        </Box>
      </Box>
    </>
  );
};

export default Users;
