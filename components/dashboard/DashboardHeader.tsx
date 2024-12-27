'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard.store';

export default function DashboardHeader() {
  const { setCreateModalOpen } = useDashboardStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">My Dashboards</h1>
        <p className="text-muted-foreground">
          Create and manage your interactive dashboards
        </p>
      </div>
      <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" />
        New Dashboard
      </Button>
    </div>
  );
}