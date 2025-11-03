import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { User } from '@/types/api/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        token: null,
        isLoading: false,

        // Actions
        login: (user, token) => {
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        },

        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          // Clear any other stores if needed
          localStorage.removeItem('auth-storage');
        },

        updateUser: userData => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
            });
          }
        },

        setLoading: loading => {
          set({ isLoading: loading });
        },

        initialize: async () => {
          const { token } = get();
          if (token) {
            try {
              set({ isLoading: true });
              // Here you would validate the token with your API
              // const user = await authService.validateToken(token);
              // set({ user, isAuthenticated: true });
            } catch (error) {
              // Token is invalid, clear auth state
              get().logout();
            } finally {
              set({ isLoading: false });
            }
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          token: state.token,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);
