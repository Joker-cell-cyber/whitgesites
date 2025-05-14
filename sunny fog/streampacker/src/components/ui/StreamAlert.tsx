"use client";

import { useState, useEffect } from 'react';

type AlertType = 'follow' | 'subscribe' | 'donation' | 'raid';

interface AlertData {
  type: AlertType;
  username: string;
  details?: string;
}

const alertMessages: Record<AlertType, string> = {
  follow: 'a commencé à suivre le stream!',
  subscribe: 'vient de s\'abonner!',
  donation: 'a fait un don!',
  raid: 'fait un raid avec',
};

const alertIcons: Record<AlertType, string> = {
  follow: '👋',
  subscribe: '🌟',
  donation: '💰',
  raid: '🚀',
};

export default function StreamAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<AlertData | null>(null);

  useEffect(() => {
    const usernames = [
      'GalaxyGamer', 'PixelQueen', 
      'VaporWaver', 'StreamBot', 'NightOwl'
    ];

    const generateRandomAlert = () => {
      const types: AlertType[] = ['follow', 'subscribe', 'donation', 'raid'];
      const type = types[Math.floor(Math.random() * types.length)];
      const username = usernames[Math.floor(Math.random() * usernames.length)];
      
      let details = '';
      
      if (type === 'donation') {
        details = `${(Math.random() * 100).toFixed(2)}€`;
      } else if (type === 'raid') {
        details = `${Math.floor(Math.random() * 100) + 5} viewers`;
      }
      
      return { type, username, details };
    };

    // Simulate random alerts every 20 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const alertData = generateRandomAlert();
        setAlertData(alertData);
        setShowAlert(true);
        
        // Masque l'alerte après 4 secondes
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);
  
  if (!showAlert || !alertData) return null;
  
  const { type, username, details } = alertData;

  return (
    <div 
      id="stream-alert" 
      className="stream-alert"
    >
      <div className="alert-icon">{alertIcons[type]}</div>
      <div className="alert-content">
        <div className="alert-title">{username}</div>
        <div className="alert-message">
          {alertMessages[type]} {details && <span>{details}</span>}
        </div>
      </div>
    </div>
  );
} 