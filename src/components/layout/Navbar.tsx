import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  HStack,
} from '@chakra-ui/react';

import { useAuthStore } from '@/stores/slices/authSlice';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <Box bg="white" px={6} py={4} borderBottom="1px" borderColor="gray.200">
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold" color="brand.500">
          Enterprise App
        </Text>

        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar
                size="sm"
                name={user?.firstName + ' ' + user?.lastName}
                src={user?.avatar}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};
