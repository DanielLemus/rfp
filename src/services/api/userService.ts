import { apiClient } from './client';

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UsersResponse,
  NormalizedUser,
} from '@/types/api/user';

// Data normalization functions
export const normalizeUser = (user: User): NormalizedUser => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
  initials: `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
  isAdmin: user.role === 'admin',
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
});

export const normalizeUsers = (users: User[]): NormalizedUser[] =>
  users.map(normalizeUser);

// API Service
export const userService = {
  // Get all users with pagination
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }): Promise<{
    users: NormalizedUser[];
    total: number;
    page: number;
    limit: number;
  }> => {
    const response = await apiClient.get<UsersResponse>('/users', { params });
    return {
      ...response.data,
      users: normalizeUsers(response.data.users),
    };
  },

  // Get user by ID
  getById: async (id: string): Promise<NormalizedUser> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return normalizeUser(response.data);
  },

  // Create new user
  create: async (userData: CreateUserRequest): Promise<NormalizedUser> => {
    const response = await apiClient.post<User>('/users', userData);
    return normalizeUser(response.data);
  },

  // Update user
  update: async (
    id: string,
    userData: UpdateUserRequest
  ): Promise<NormalizedUser> => {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return normalizeUser(response.data);
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  // Bulk operations
  bulkDelete: async (ids: string[]): Promise<void> => {
    await apiClient.post('/users/bulk-delete', { ids });
  },

  // Upload avatar
  uploadAvatar: async (id: string, file: File): Promise<NormalizedUser> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.post<User>(
      `/users/${id}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return normalizeUser(response.data);
  },
};
