import { RoutineItem } from '../types';

export const routineItems: RoutineItem[] = [
  {
    id: '1',
    title: 'Uthine Bed ma Bhajan',
    description: 'Do Bhajan first thing in the morning',
    coinValue: 1,
    category: 'Morning',
    checked: false
  },
  {
    id: '2',
    title: 'Bhajan during Pooja',
    description: 'Bhajan while doing Pooja',
    coinValue: 1,
    category: 'Morning',
    checked: false
  },
  {
    id: '3',
    title: 'Bhajan before Drinking Water',
    description: 'Bhajan before drinking water',
    coinValue: 1,
    category: 'Morning',
    checked: false
  },
  {
    id: '4',
    title: 'Bhajan before Breakfast',
    description: 'Bhajan before eating',
    coinValue: 2,
    category: 'Breakfast',
    checked: false
  },
  {
    id: '5',
    title: 'Bhajan before Lunch',
    description: 'Bhajan before eating',
    coinValue: 3,
    category: 'Lunch',
    checked: false
  },
  {
    id: '6',
    title: '30 Min bhajan',
    description: 'Do daily bhajan for 30 minutes',
    coinValue: 50,
    category: 'personal',
    checked: false
  },
  {
    id: '7',
    title: 'Seva kartakarta bhajan',
    description: 'Do Bhajan while doing Seva',
    coinValue: 50,
    category: 'personal',
    checked: false
  },
  {
    id: '8',
    title: 'Smruti Sathe bhajan',
    description: 'smriti sathe bhajan',
    coinValue: 100,
    category: 'home',
    checked: false
  },
  {
    id: '9',
    title: 'Sahaj Smruti',
    description: 'Sahaj Smruti',
    coinValue: Infinity,
    category: 'growth',
    checked: false
  }
];