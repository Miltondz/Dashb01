'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDashboardStore } from '@/store/dashboard.store';
import DashboardToolbar from '@/components/dashboard/DashboardToolbar';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function DashboardPage() {
  const params = useParams();
  const { fetchDashboardById } = useDashboardStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      if (params.id) {
        await fetchDashboardById(params.id as string);
        setLoading(false);
      }
    };
    loadDashboard();
  }, [params.id, fetchDashboardById]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <DashboardToolbar />
      <DashboardGrid />
    </div>
  );
}