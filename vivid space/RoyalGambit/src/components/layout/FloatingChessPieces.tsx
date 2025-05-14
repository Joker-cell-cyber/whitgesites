"use client";

import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

const chessPieces = [
  { type: 'king', paths: 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z' },
  { type: 'queen', paths: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 2.21L9.66 8.97l-5.38.79 3.9 3.78-.92 5.36L12 16.08l4.74 2.82-.92-5.36 3.9-3.78-5.38-.79L12 4.21z' },
  { type: 'rook', paths: 'M21 9H3V3h18v6zm-7.33 10.17L12 16.5l-1.67 2.67L5 16.5V9h14v7.5l-5.33 2.67z' },
  { type: 'bishop', paths: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L11 13.17l7.59-7.59L20 7l-8 8z' },
  { type: 'knight', paths: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z' },
  { type: 'pawn', paths: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2z' }
];

type ChessPieceProps = {
  type: string;
  paths: string;
  style: React.CSSProperties;
};

const ChessPiece: React.FC<ChessPieceProps> = ({ type, paths, style }) => {
  return (
    <div className={`chess-piece chess-piece-${type}`} style={style}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d={paths} />
      </svg>
    </div>
  );
};

export default function FloatingChessPieces() {
  const [pieces, setPieces] = useState<ReactElement[]>([]);

  useEffect(() => {
    // Add 15 random chess pieces in random positions
    const newPieces: ReactElement[] = [];
    for (let i = 0; i < 15; i++) {
      const pieceIndex = Math.floor(Math.random() * chessPieces.length);
      const piece = chessPieces[pieceIndex];
      const size = Math.floor(Math.random() * 50) + 50; // 50-100px
      
      const style = {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
        animationDelay: `${Math.random() * 5}s`,
      };
      
      newPieces.push(
        <ChessPiece
          key={i}
          type={piece.type}
          paths={piece.paths}
          style={style}
        />
      );
    }
    setPieces(newPieces);
  }, []);

  return <>{pieces}</>;
} 