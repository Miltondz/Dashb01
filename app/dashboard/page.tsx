'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardList from '@/components/dashboard/DashboardList';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CreateDashboardModal from '@/components/dashboard/CreateDashboardModal';
import { useAuthStore } from '@/store/auth.store';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardList />
      <CreateDashboardModal />
    </div>
  );
}