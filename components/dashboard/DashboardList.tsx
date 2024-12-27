'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useDashboardStore } from '@/store/dashboard.store';
import { formatDate } from '@/lib/utils';

export default function DashboardList() {
  const router = useRouter();
  const { dashboards, fetchDashboards } = useDashboardStore();

  useEffect(() => {
    fetchDashboards();
  }, [fetchDashboards]);

  if (!dashboards.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No dashboards yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboards.map((dashboard) => (
        <Card
          key={dashboard.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push(`/dashboard/${dashboard.id}`)}
        >
          <CardHeader>
            <CardTitle>{dashboard.title}</CardTitle>
            <CardDescription>
              {dashboard.description || 'No description'}
              <div className="text-xs text-muted-foreground mt-2">
                Created {formatDate(dashboard.created_at)}
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}