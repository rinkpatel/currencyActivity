import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { RoutineItem } from '../types';

interface AddRoutineFormProps {
  onAdd: (item: Omit<RoutineItem, 'id'>) => void;
}

const AddRoutineForm: React.FC<AddRoutineFormProps> = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim() || 'Custom routine',
        coinValue: 1,
        category: 'personal'
      });
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center space-x-2 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
      >
        <Plus size={20} />
        <span>Add New Routine</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-xl border-2 border-gray-300 bg-white mb-3">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="What's your new routine?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          autoFocus
        />
        
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Add Routine
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRoutineForm;