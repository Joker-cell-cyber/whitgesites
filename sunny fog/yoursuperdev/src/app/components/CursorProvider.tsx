"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cursor from "./Cursor";

type CursorContextType = {
  isCursorEnabled: boolean;
  enableCursor: () => void;
  disableCursor: () => void;
};

const CursorContext = createContext<CursorContextType | null>(null);

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor doit être utilisé à l'intérieur d'un CursorProvider");
  }
  return context;
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isCursorEnabled, setIsCursorEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Vérifier si on est sur mobile
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  };

  useEffect(() => {
    // Désactiver automatiquement sur mobile
    if (isMobile()) {
      setIsCursorEnabled(false);
    }
    
    // Indiquer que le composant est monté côté client
    setIsMounted(true);
  }, []);

  const enableCursor = () => setIsCursorEnabled(true);
  const disableCursor = () => setIsCursorEnabled(false);

  return (
    <CursorContext.Provider value={{ isCursorEnabled, enableCursor, disableCursor }}>
      {children}
      {/* Rendre le curseur seulement côté client */}
      {isMounted && isCursorEnabled && <Cursor />}
    </CursorContext.Provider>
  );
} 