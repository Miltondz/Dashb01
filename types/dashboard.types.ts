export interface Dashboard {
  id: string;
  title: string;
  description: string | null;
  owner_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface DashboardComponent {
  id: string;
  dashboard_id: string;
  type: 'note' | 'code' | 'image';
  content: string | null;
  file_path: string | null;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  language: string | null;
  created_at: string;
  updated_at: string | null;
}