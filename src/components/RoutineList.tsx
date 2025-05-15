import React from 'react';
import RoutineItem from './RoutineItem';
import { RoutineItem as RoutineItemType, CompletedTask } from '../types';

interface RoutineListProps {
  items: RoutineItemType[];
  completedTaskIds: string[];
  completedTasks: CompletedTask[];
  onComplete: (id: string, element: HTMLElement) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  onToggleCheck?: (id: string) => void;
}

const RoutineList: React.FC<RoutineListProps> = ({ 
  items, 
  completedTaskIds, 
  completedTasks,
  onComplete,
  onIncrement,
  onDecrement,
  onToggleCheck
}) => {
  const getCompletionCount = (taskId: string): number => {
    const task = completedTasks.find(t => t.id === taskId);
    return task?.count || 1;
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <RoutineItem
          key={item.id}
          item={item}
          isCompleted={completedTaskIds.includes(item.id)}
          completionCount={getCompletionCount(item.id)}
          onComplete={onComplete}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onToggleCheck={onToggleCheck}
        />
      ))}
    </div>
  );
};

export default RoutineList;