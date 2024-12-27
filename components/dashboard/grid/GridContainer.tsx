'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import GridComponent from './GridComponent';
import { DashboardComponent } from '@/types/dashboard.types';

export default function GridContainer() {
  const { currentDashboard } = useDashboardStore();
  const [components, setComponents] = useState<DashboardComponent[]>([]);

  if (!currentDashboard) return null;

  return (
    <div className="relative h-full overflow-auto bg-grid-pattern">
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-6">
        {components.map((component) => (
          <GridComponent
            key={component.id}
            component={component}
            onUpdate={(updatedComponent) => {
              setComponents(components.map(c => 
                c.id === updatedComponent.id ? updatedComponent : c
              ));
            }}
          />
        ))}
        {components.length === 0 && (
          <div className="col-span-12 flex items-center justify-center text-muted-foreground">
            Click &quot;Add Component&quot; to start building your dashboard
          </div>
        )}
      </div>
    </div>
  );
}