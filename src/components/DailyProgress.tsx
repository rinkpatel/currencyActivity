import React, { useMemo } from 'react';
import { RoutineItem } from '../types';

interface DailyProgressProps {
  routineItems: RoutineItem[];
  completedTaskIds: string[];
}

const DailyProgress: React.FC<DailyProgressProps> = ({ routineItems, completedTaskIds }) => {
  const { progress, totalTasks } = useMemo(() => {
    const completed = completedTaskIds.length;
    const total = routineItems.length;
    return {
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
      totalTasks: total
    };
  }, [routineItems, completedTaskIds]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <h3 className="text-sm text-gray-700 font-medium">Today's Progress</h3>
        <span className="text-xs font-semibold text-gray-900">
          {completedTaskIds.length}/{totalTasks} Tasks
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DailyProgress