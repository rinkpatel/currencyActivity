import { useState, useRef, useCallback } from 'react';

interface CoinPosition {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export const useCoinAnimation = () => {
  const [animatingCoins, setAnimatingCoins] = useState<CoinPosition[]>([]);
  const coinIdCounter = useRef(0);

  const animateCoinToBag = useCallback((fromElement: HTMLElement, toElement: HTMLElement) => {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    
    const coinId = `coin-${coinIdCounter.current++}`;
    
    const newCoin: CoinPosition = {
      id: coinId,
      fromX: fromRect.left + fromRect.width / 2,
      fromY: fromRect.top + fromRect.height / 2,
      toX: toRect.left + toRect.width / 2,
      toY: toRect.top + toRect.height / 2
    };
    
    setAnimatingCoins(prev => [...prev, newCoin]);
    
    // Remove coin from animation after it completes
    setTimeout(() => {
      setAnimatingCoins(prev => prev.filter(coin => coin.id !== coinId));
    }, 1000); // Animation duration
    
    return coinId;
  }, []);
  
  return {
    animatingCoins,
    animateCoinToBag
  };
};