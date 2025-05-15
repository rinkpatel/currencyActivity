import React, { useRef, useEffect, useState } from 'react';
import { routineItems as defaultRoutineItems } from './data/routineItems';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCoinAnimation } from './hooks/useCoinAnimation';
import { CompletedTask, RoutineItem } from './types';
import { isSameDay, getDateKey, getTotalCoins } from './utils/helpers';
import Header from './components/Header';
import RoutineList from './components/RoutineList';
import CoinBag from './components/CoinBag';
import Coin from './components/Coin';
import DailyProgress from './components/DailyProgress';
import AddRoutineForm from './components/AddRoutineForm';

function App() {
  // Refs
  const coinBagRef = useRef<HTMLDivElement>(null);
  
  // Local storage state
  const [completedTasks, setCompletedTasks] = useLocalStorage<CompletedTask[]>('completedTasks', []);
  const [coinsByDay, setCoinsByDay] = useLocalStorage<Record<string, number>>('coinsByDay', {});
  const [customRoutines, setCustomRoutines] = useLocalStorage<RoutineItem[]>('customRoutines', []);
  
  // Combine default and custom routines
  const routineItems = [...defaultRoutineItems, ...customRoutines];
  
  // Coin animation
  const { animatingCoins, animateCoinToBag } = useCoinAnimation();

  // Get today's completed tasks with counts
  const todayCompletedTasks = completedTasks.filter(task => 
    isSameDay(new Date(task.completedAt), new Date())
  );

  const todayCompletedTaskIds = todayCompletedTasks.map(task => task.id);

  // Handle task completion
  const handleCompleteTask = (taskId: string, element: HTMLElement) => {
    if (todayCompletedTaskIds.includes(taskId) || !coinBagRef.current) {
      return;
    }

    const task = routineItems.find(item => item.id === taskId);
    if (!task) return;

    setCompletedTasks(prev => [
      ...prev,
      { id: taskId, completedAt: new Date().toISOString(), count: 1 }
    ]);

    const today = getDateKey(new Date());
    setCoinsByDay(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + task.coinValue
    }));

    animateCoinToBag(element, coinBagRef.current);
  };

  // Handle increment/decrement
  const handleIncrement = (taskId: string) => {
    const task = routineItems.find(item => item.id === taskId);
    if (!task) return;

    const today = getDateKey(new Date());
    
    setCompletedTasks(prev => {
      const taskIndex = prev.findIndex(t => 
        t.id === taskId && isSameDay(new Date(t.completedAt), new Date())
      );
      
      if (taskIndex === -1) return prev;
      
      const newTasks = [...prev];
      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        count: (newTasks[taskIndex].count || 1) + 1
      };
      
      return newTasks;
    });

    setCoinsByDay(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + task.coinValue
    }));

    if (coinBagRef.current) {
      const element = document.getElementById(taskId);
      if (element) {
        animateCoinToBag(element, coinBagRef.current);
      }
    }
  };

  const handleDecrement = (taskId: string) => {
    const task = routineItems.find(item => item.id === taskId);
    if (!task) return;

    const today = getDateKey(new Date());
    
    setCompletedTasks(prev => {
      const taskIndex = prev.findIndex(t => 
        t.id === taskId && isSameDay(new Date(t.completedAt), new Date())
      );
      
      if (taskIndex === -1 || prev[taskIndex].count <= 1) return prev;
      
      const newTasks = [...prev];
      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        count: newTasks[taskIndex].count - 1
      };
      
      return newTasks;
    });

    setCoinsByDay(prev => ({
      ...prev,
      [today]: Math.max(0, (prev[today] || 0) - task.coinValue)
    }));
  };

  // Handle adding new routine
  const handleAddRoutine = (newItem: Omit<RoutineItem, 'id'>) => {
    const id = `custom-${Date.now()}`;
    const routineItem: RoutineItem = {
      ...newItem,
      id
    };
    
    setCustomRoutines(prev => [...prev, routineItem]);
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        handleCompleteTask(id, element);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-md mx-auto px-3 py-4">
        <Header />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
            Today's Routines
          </h2>
          <CoinBag coinCount={getTotalCoins(coinsByDay)} bagRef={coinBagRef} />
        </div>
        
        <DailyProgress 
          routineItems={routineItems} 
          completedTaskIds={todayCompletedTaskIds}
        />
        
        <div className="space-y-1">
          <RoutineList 
            items={routineItems}
            completedTaskIds={todayCompletedTaskIds}
            completedTasks={todayCompletedTasks}
            onComplete={handleCompleteTask}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <AddRoutineForm onAdd={handleAddRoutine} />
        </div>
        
        {/* Animated coins */}
        {animatingCoins.map(coin => (
          <Coin 
            key={coin.id}
            id={coin.id}
            fromX={coin.fromX}
            fromY={coin.fromY}
            toX={coin.toX}
            toY={coin.toY}
          />
        ))}
      </div>
    </div>
  );
}

export default App