"use client";

import { useState } from 'react';
import { KingIcon, QueenIcon, RookIcon, BishopIcon, KnightIcon, PawnIcon } from './ChessIcons';

interface PuzzleProps {
  puzzleId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caption?: string;
  onSolved?: () => void;
}

type ChessPiece = {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  position: [number, number]; // column, row (0-based)
};

type PuzzleType = {
  id: string;
  pieces: ChessPiece[];
  solution: [number, number][]; // from, to positions
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  message: string;
};

// Sample puzzles (simplified)
const puzzles: PuzzleType[] = [
  {
    id: 'puzzle-1',
    difficulty: 'beginner',
    pieces: [
      { type: 'king', color: 'white', position: [4, 7] },
      { type: 'queen', color: 'white', position: [3, 6] },
      { type: 'king', color: 'black', position: [4, 0] },
    ],
    solution: [[3, 6], [3, 0]],
    message: 'A classic chess position showing queen and king coordination.'
  },
  {
    id: 'puzzle-2',
    difficulty: 'intermediate',
    pieces: [
      { type: 'king', color: 'white', position: [4, 7] },
      { type: 'rook', color: 'white', position: [0, 6] },
      { type: 'king', color: 'black', position: [7, 7] },
    ],
    solution: [[0, 6], [0, 7]],
    message: 'A strategic position featuring the rook and king.'
  },
  {
    id: 'puzzle-3',
    difficulty: 'advanced',
    pieces: [
      { type: 'king', color: 'white', position: [4, 7] },
      { type: 'knight', color: 'white', position: [5, 5] },
      { type: 'king', color: 'black', position: [7, 7] },
      { type: 'pawn', color: 'black', position: [6, 6] },
    ],
    solution: [[5, 5], [7, 6]],
    message: 'An interesting position with the knight in focus.'
  }
];

export default function ChessPuzzle({ puzzleId, difficulty, caption, onSolved }: PuzzleProps) {
  const puzzle = puzzles.find(p => p.id === puzzleId) || puzzles.find(p => p.difficulty === difficulty) || puzzles[0];
  
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
  const [pieces, setPieces] = useState<ChessPiece[]>(puzzle.pieces);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(puzzle.message);

  const handleSquareClick = (col: number, row: number) => {
    if (isSolved) return;
    
    // Find if there's a piece at this position
    const pieceIndex = pieces.findIndex(p => p.position[0] === col && p.position[1] === row);
    
    // If a piece is already selected
    if (selectedPiece !== null) {
      const [selectedCol, selectedRow] = selectedPiece;
      const selectedPieceIndex = pieces.findIndex(p => p.position[0] === selectedCol && p.position[1] === selectedRow);
      
      // If player clicks on the same square, deselect
      if (selectedCol === col && selectedRow === row) {
        setSelectedPiece(null);
        return;
      }
      
      // If the selected piece is white (player's piece)
      if (selectedPieceIndex >= 0 && pieces[selectedPieceIndex].color === 'white') {
        // Check if this move matches the solution
        const isCorrectMove = puzzle.solution[0][0] === selectedCol && 
                             puzzle.solution[0][1] === selectedRow && 
                             puzzle.solution[1][0] === col && 
                             puzzle.solution[1][1] === row;
        
        // Make the move
        if (isCorrectMove) {
          const newPieces = [...pieces];
          // Remove piece at target position if there is one (capture)
          const targetIndex = pieces.findIndex(p => p.position[0] === col && p.position[1] === row);
          if (targetIndex >= 0) {
            newPieces.splice(targetIndex, 1);
          }
          // Move selected piece
          newPieces[selectedPieceIndex].position = [col, row];
          setPieces(newPieces);
          setSelectedPiece(null);
          setIsSolved(true);
          setMessage("Excellent! You found the checkmate move!");
          onSolved?.();
        } else {
          // Wrong move
          setMessage("Try again! That's not the winning move.");
          setSelectedPiece(null);
        }
      }
    } else {
      // If clicked on a piece, select it
      if (pieceIndex >= 0 && pieces[pieceIndex].color === 'white') {
        setSelectedPiece([col, row]);
      }
    }
  };

  const getPieceComponent = (type: ChessPiece['type'], color: ChessPiece['color']) => {
    const props = { 
      size: 32, 
      className: `${color === 'white' ? 'text-white' : 'text-gray-800'}`
    };
    
    switch (type) {
      case 'king': return <KingIcon {...props} />;
      case 'queen': return <QueenIcon {...props} />;
      case 'rook': return <RookIcon {...props} />;
      case 'bishop': return <BishopIcon {...props} />;
      case 'knight': return <KnightIcon {...props} />;
      case 'pawn': return <PawnIcon {...props} />;
    }
  };

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <div className="mb-3 text-center text-sm text-gray-300">
        {caption || puzzle.message}
      </div>
      
      <div className="chess-board-container">
        <div className="grid grid-cols-8 gap-0 border border-chess-gold-800 shadow-lg">
          {Array.from({ length: 8 }, (_, row) => (
            Array.from({ length: 8 }, (_, col) => {
              const isWhiteSquare = (row + col) % 2 === 0;
              const isSelected = selectedPiece && selectedPiece[0] === col && selectedPiece[1] === row;
              
              // Find piece at this position
              const piece = pieces.find(p => p.position[0] === col && p.position[1] === row);
              
              return (
                <div 
                  key={`${col}-${row}`}
                  className={`aspect-square flex items-center justify-center
                    ${isWhiteSquare ? 'bg-[#e8c39e]' : 'bg-[#8a5a44]'}
                    ${isSelected ? 'ring-2 ring-chess-gold-500' : ''}
                    ${isSelected ? 'bg-chess-gold-500/30' : ''}
                    cursor-pointer transition-all`}
                  onClick={() => handleSquareClick(col, row)}
                >
                  {piece && getPieceComponent(piece.type, piece.color)}
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <p className={`text-sm ${isSolved ? 'text-chess-gold-500' : 'text-gray-300'}`}>
          {message}
        </p>
        {isSolved && (
          <button 
            className="mt-2 text-sm px-3 py-1 bg-chess-blue-700 text-white rounded hover:bg-chess-blue-600 transition-colors"
            onClick={() => {
              setPieces(puzzle.pieces);
              setIsSolved(false);
              setMessage(puzzle.message);
            }}
          >
            Reset Puzzle
          </button>
        )}
      </div>
    </div>
  );
} 