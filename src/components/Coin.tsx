import React from 'react';

interface CoinProps {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  onAnimationEnd?: () => void;
}

const Coin: React.FC<CoinProps> = ({ id, fromX, fromY, toX, toY, onAnimationEnd }) => {
  const handleAnimationEnd = () => {
    if (onAnimationEnd) {
      onAnimationEnd();
    }
  };

  return (
    <div
      id={id}
      className="fixed pointer-events-none z-50"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${fromX}px, ${fromY}px)`,
        width: '24px',
        height: '24px',
        animation: 'coin-flip 1s forwards',
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-2 border-yellow-700 flex items-center justify-center text-xs font-bold text-yellow-900 shadow-lg"
        style={{
          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)'
        }}
      >
        $
      </div>
      <style jsx>{`
        @keyframes coin-flip {
          0% {
            transform: translate(${fromX}px, ${fromY}px) scale(0.8) rotateY(0deg);
            opacity: 1;
          }
          25% {
            transform: translate(${fromX + (toX - fromX) * 0.25}px, ${fromY - 40}px) scale(1) rotateY(90deg);
          }
          50% {
            transform: translate(${fromX + (toX - fromX) * 0.5}px, ${fromY - 60}px) scale(1.1) rotateY(180deg);
          }
          75% {
            transform: translate(${fromX + (toX - fromX) * 0.75}px, ${fromY - 40 + (toY - fromY + 40) * 0.5}px) scale(1) rotateY(270deg);
          }
          100% {
            transform: translate(${toX}px, ${toY}px) scale(0.5) rotateY(360deg);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Coin;