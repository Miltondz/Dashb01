'use client';

import { Button } from '@/components/ui/button';
import { Plus, Save, Share, Settings } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard.store';

export default function DashboardToolbar() {
  const { currentDashboard } = useDashboardStore();

  if (!currentDashboard) return null;

  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{currentDashboard.title}</h1>
          <p className="text-sm text-muted-foreground">
            {currentDashboard.description || 'No description'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Component
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}