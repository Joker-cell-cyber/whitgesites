"use client";

import React from 'react';

interface ChessIconProps {
  className?: string;
  size?: number;
}

export const KingIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L8 6H16L12 2ZM11 7V10H13V7H11ZM8 11V20H16V11H8ZM6 21V22H18V21H6Z" />
    </svg>
  );
};

export const QueenIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L8 20H16L12 2ZM6 21V22H18V21H6Z" />
    </svg>
  );
};

export const RookIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 2V4H10V6H6V13H10V16H14V13H18V6H14V4H16V2H8ZM6 17V20H18V17H6ZM5 21V22H19V21H5Z" />
    </svg>
  );
};

export const BishopIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C10.9 2 10 2.9 10 4C10 4.7 10.4 5.4 11 5.7V7H13V5.7C13.6 5.4 14 4.7 14 4C14 2.9 13.1 2 12 2ZM10 8V20H14V8H10ZM8 21V22H16V21H8Z" />
    </svg>
  );
};

export const KnightIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 22H5V20H19V22ZM13 2V8L14 9V19H10V9L11 8V2H13ZM11 8H13V4H11V8Z" />
    </svg>
  );
};

export const PawnIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM9.5 9L8 19H16L14.5 9H9.5ZM7.5 20V22H16.5V20H7.5Z" />
    </svg>
  );
};

export const ChessboardIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 3V21H21V3H3ZM19 19H5V5H19V19ZM8 8H5V5H8V8ZM11 8H8V11H5V14H8V11H11V14H14V11H17V14H14V17H11V14H8V17H5V14H8V11H5V8H8V5H11V8ZM14 8H11V5H14V8ZM17 8H14V5H17V8ZM17 11H14V8H17V11ZM17 17H14V14H17V17ZM11 17H8V14H11V17ZM11 11H8V8H11V11ZM14 11H11V8H14V11ZM14 14H11V11H14V14Z" />
    </svg>
  );
};

export const EloIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 3H3V21H21V3ZM9 15H7V9H9V15ZM13 15H11V9H13V15ZM17 15H15V9H17V15Z" />
    </svg>
  );
};

export const StrategyIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2ZM12 4.04L18 6.38V11.09C18 15.09 15.45 18.79 12 19.92C8.55 18.79 6 15.1 6 11.09V6.38L12 4.04ZM11 7V13H13V7H11ZM11 15V17H13V15H11Z" />
    </svg>
  );
};

export const OpeningIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z" />
    </svg>
  );
};

export const EndgameIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2 12C2 9.21 3.64 6.8 6 5.68V3.5C2.5 4.76 0 8.09 0 12C0 15.91 2.5 19.24 6 20.5V18.32C3.64 17.2 2 14.79 2 12ZM15 3C10.04 3 6 7.04 6 12C6 16.96 10.04 21 15 21C19.96 21 24 16.96 24 12C24 7.04 19.96 3 15 3ZM15 19C11.14 19 8 15.86 8 12C8 8.14 11.14 5 15 5C18.86 5 22 8.14 22 12C22 15.86 18.86 19 15 19ZM16 12L10 7.5V16.5L16 12Z" />
    </svg>
  );
};

export const TrainingIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.1 15.8C13.7 16.2 12.9 16.2 12.5 15.8L10.2 13.5C9.8 13.1 9.8 12.3 10.2 11.9C10.6 11.5 11.4 11.5 11.8 11.9L12.3 12.4L16.2 8.5C16.6 8.1 17.4 8.1 17.8 8.5C18.2 8.9 18.2 9.7 17.8 10.1L14.1 15.8Z" />
    </svg>
  );
};

export const ResourceIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 9H18V11H10V9ZM10 12H14V14H10V12ZM10 6H18V8H10V6Z" />
    </svg>
  );
};

export const CheckmateIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
    </svg>
  );
};

export const HomeIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
};

export const PricingIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
  );
};

export const ContactIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
};

export const BrainIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.87 10.5c.14.24.13.51-.03.76-.12.2-.31.36-.52.45l.01.01c.32.17.54.51.54.9 0 .35-.18.66-.46.86.18.21.3.48.3.79 0 .57-.41 1.04-.96 1.14v.03c0 .5-.38.93-.87 1l-.13.01-.14.01h-.41c.01.41-.19.75-.48.75h-3c-.29 0-.5-.25-.53-.55h-.04c-.41-.1-.7-.48-.7-.9v-.84l-.91-.34c-.45-.17-.75-.62-.68-1.12.08-.47.44-.83.9-.9l.57-.05c.11-.15.25-.3.46-.37l.4-.14c.35-.13.6-.46.6-.84 0-.31-.17-.6-.43-.76l-.23-.15c-.49-.32-.7-.97-.41-1.54.28-.55.93-.76 1.47-.5l.1.05c.05-.19.15-.38.31-.55.52-.48 1.28-.47 1.77.02.46-.48 1.18-.51 1.7-.07.4.33.56.83.49 1.29.38.05.72.32.83.7.06.21.04.42-.03.62.19.15.33.36.4.6.5.16.07.32.07.48-.01.37-.21.7-.52.87-.1.06-.21.1-.33.13-.2.3-.6.38-.83.2-.28-.22-.62-.33-.97-.33-.38-.01-.74.11-1.03.32.09.4-.22.77-.63.85h-.3c-.25 0-.47-.05-.64-.15-.57-.3-.88-.95-.7-1.6z" />
      <path d="M21 12c0-2.76-2.24-5-5-5h-1.44l-.73-2.93c-.29-1.16-1.32-2.04-2.56-2.07H8.5C7.12 2 6 3.12 6 4.5v.5C4.35 5 3 6.35 3 8s1.35 3 3 3h9.58c.57-1.29 1.85-2.23 3.34-2.24.15 0 .29.01.44.03V8.5c0-.83.67-1.5 1.5-1.5h.042v3.56l.16-.01c.26-.03.51-.1.74-.2.17-.07.33-.17.48-.28z" />
    </svg>
  );
};

export const FocusIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z" />
    </svg>
  );
};

export const MemoryIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z" />
    </svg>
  );
};

export const PlanningIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z" />
    </svg>
  );
};

export const AnalysisIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  );
};

export const PatienceIcon: React.FC<ChessIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.22-13h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l4.15 2.49c.34.2.78.1.98-.24.21-.34.1-.79-.25-.99l-3.87-2.3V7.72c0-.4-.32-.72-.72-.72z" />
    </svg>
  );
}; 