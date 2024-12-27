import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-[600px]">
        Create and manage interactive dashboards with ease. Collaborate with your team
        and share your insights in real-time.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="gap-2">
          <LayoutDashboard className="w-5 h-5" />
          Get Started
        </Button>
      </Link>
    </div>
  );
}