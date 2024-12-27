'use client';

import { useState } from 'react';
import { DashboardComponent } from '@/types/dashboard.types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Grip } from 'lucide-react';

interface GridComponentProps {
  component: DashboardComponent;
  onUpdate: (component: DashboardComponent) => void;
}

export default function GridComponent({ component, onUpdate }: GridComponentProps) {
  const [isDragging, setIsDragging] = useState(false);

  const gridColumnClass = `col-span-${component.width}`;
  const gridRowClass = `row-span-${component.height}`;

  return (
    <Card 
      className={`
        ${gridColumnClass} 
        ${gridRowClass} 
        ${isDragging ? 'cursor-grabbing shadow-lg' : 'cursor-grab'}
        transition-shadow
      `}
    >
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <div className="text-sm font-medium">
          {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
        </div>
        <Grip className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-3">
        {component.content}
      </CardContent>
    </Card>
  );
}