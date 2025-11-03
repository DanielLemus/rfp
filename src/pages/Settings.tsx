import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Heading } from '@chakra-ui/react';

const Settings: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Settings - React Enterprise App</title>
        <meta name="description" content="Application settings" />
      </Helmet>

      <Box>
        <Heading mb={6}>Settings</Heading>
        <Box>
          {/* Settings components will go here */}
          <p>Settings functionality coming soon...</p>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
