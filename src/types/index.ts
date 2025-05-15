export interface RoutineItem {
  id: string;
  title: string;
  description: string;
  coinValue: number;
  category: string;
}

export interface CompletedTask {
  id: string;
  completedAt: string;
  count: number;
}