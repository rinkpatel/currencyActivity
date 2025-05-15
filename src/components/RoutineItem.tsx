import React, { useRef } from 'react';
import { Check, Plus, Minus } from 'lucide-react';
import { RoutineItem as RoutineItemType } from '../types';

interface RoutineItemProps {
  item: RoutineItemType;
  isCompleted: boolean;
  completionCount?: number;
  onComplete: (id: string, element: HTMLElement) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
}

const RoutineItem: React.FC<RoutineItemProps> = ({ 
  item, 
  isCompleted, 
  completionCount = 1,
  onComplete,
  onIncrement,
  onDecrement
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  const handleComplete = () => {
    if (!isCompleted && itemRef.current) {
      onComplete(item.id, itemRef.current);
    }
  };

  const categoryColors: Record<string, string> = {
    health: 'bg-green-100 border-green-300',
    personal: 'bg-blue-100 border-blue-300',
    wellbeing: 'bg-purple-100 border-purple-300',
    home: 'bg-amber-100 border-amber-300',
    growth: 'bg-red-100 border-red-300',
  };

  const baseClasses = "p-2 rounded-lg border mb-1.5 transition-all duration-300 ease-in-out";
  const completedClasses = "bg-opacity-60 border-opacity-50";
  const hoverClasses = isCompleted ? "" : "hover:shadow-md hover:translate-y-[-1px]";
  const categoryClass = categoryColors[item.category] || 'bg-gray-100 border-gray-300';
  
  return (
    <div 
      ref={itemRef}
      id={item.id}
      className={`${baseClasses} ${categoryClass} ${isCompleted ? completedClasses : hoverClasses}`}
    >
      <div className="flex items-start space-x-2">
        <button 
          onClick={handleComplete}
          disabled={isCompleted}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isCompleted 
              ? 'bg-green-500 text-white cursor-default' 
              : 'border-2 border-gray-300 hover:border-green-500 cursor-pointer'
          }`}
        >
          {isCompleted ? <Check size={12} /> : null}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className={`font-medium text-sm truncate ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item.title}
            </h3>
            <div className="flex-shrink-0 flex items-center space-x-1">
              {isCompleted && (
                <div className="flex items-center mr-1 bg-gray-100 rounded overflow-hidden">
                  <button 
                    onClick={() => onDecrement?.(item.id)}
                    className="p-0.5 hover:bg-gray-200 text-gray-600"
                    disabled={completionCount <= 1}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-1 font-medium text-xs">{completionCount}×</span>
                  <button 
                    onClick={() => onIncrement?.(item.id)}
                    className="p-0.5 hover:bg-gray-200 text-gray-600"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              )}
              <div className="flex items-center space-x-0.5 bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-300">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-inner"></div>
                <span className="font-semibold text-xs text-yellow-800">×{item.coinValue * completionCount}</span>
              </div>
            </div>
          </div>
          <p className={`text-xs mt-0.5 ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.description}
          </p>
          <div className="mt-0.5">
            <span className="inline-block text-[10px] px-1.5 py-px rounded-full bg-white bg-opacity-50 text-gray-700">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineItem;