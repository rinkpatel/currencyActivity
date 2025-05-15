import React, { useRef } from 'react';
import { Coins } from 'lucide-react';

interface CoinBagProps {
  coinCount: number;
  bagRef: React.RefObject<HTMLDivElement>;
}

const CoinBag: React.FC<CoinBagProps> = ({ coinCount, bagRef }) => {
  return (
    <div 
      ref={bagRef}
      className="flex items-center space-x-3 bg-gradient-to-r from-amber-800 to-amber-600 px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <Coins size={28} className="text-yellow-300" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
      </div>
      <div className="font-bold text-xl text-yellow-100">
        {coinCount} <span className="text-xs uppercase tracking-wider opacity-80">Coins</span>
      </div>
    </div>
  );
};

export default CoinBag;