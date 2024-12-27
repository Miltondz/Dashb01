'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Dashboard } from '@/types/dashboard.types';

interface DashboardState {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
  loading: boolean;
  error: string | null;
  createModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
  fetchDashboards: () => Promise<void>;
  fetchDashboardById: (id: string) => Promise<void>;
  createDashboard: (data: Partial<Dashboard>) => Promise<Dashboard | null>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboards: [],
  currentDashboard: null,
  loading: false,
  error: null,
  createModalOpen: false,
  setCreateModalOpen: (open) => set({ createModalOpen: open }),
  
  fetchDashboards: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('dashboards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ dashboards: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchDashboardById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('dashboards')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      set({ currentDashboard: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createDashboard: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: dashboard, error } = await supabase
        .from('dashboards')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        dashboards: [dashboard, ...state.dashboards],
      }));

      return dashboard;
    } catch (error: any) {
      set({ error: error.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));