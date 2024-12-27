'use client';

import { create } from 'zustand';
import { AuthState } from '@/types/auth.types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user, loading: false }),
  setError: (error) => set({ error, loading: false }),
  clearError: () => set({ error: null }),
  reset: () => set({ user: null, loading: false, error: null }),
}));