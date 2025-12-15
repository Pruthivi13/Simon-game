import { useState, useCallback, useRef, useEffect } from 'react';

const BUTTON_COLORS = ['green', 'red', 'yellow', 'blue'];

export function useSimonGame() {
  const [gamePattern, setGamePattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [level, setLevel] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  
  const audioRefs = useRef({});

  // Preload audio files
  useEffect(() => {
    BUTTON_COLORS.forEach(color => {
      audioRefs.current[color] = new Audio(`/sounds/${color}.mp3`);
    });
    audioRefs.current.wrong = new Audio('/sounds/wrong.mp3');
  }, []);

  const playSound = useCallback((name) => {
    const audio = audioRefs.current[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const flashButton = useCallback((color, duration = 300) => {
    return new Promise(resolve => {
      setActiveButton(color);
      setTimeout(() => {
        setActiveButton(null);
        setTimeout(resolve, 100);
      }, duration);
    });
  }, []);

  const playSequence = useCallback(async (pattern) => {
    setIsPlayingSequence(true);
    for (const color of pattern) {
      await new Promise(r => setTimeout(r, 300));
      playSound(color);
      await flashButton(color);
    }
    setIsPlayingSequence(false);
  }, [playSound, flashButton]);

  const nextSequence = useCallback(() => {
    setUserPattern([]);
    const randomColor = BUTTON_COLORS[Math.floor(Math.random() * 4)];
    const newPattern = [...gamePattern, randomColor];
    setGamePattern(newPattern);
    setLevel(prev => prev + 1);
    
    setTimeout(() => {
      playSequence(newPattern);
    }, 500);
  }, [gamePattern, playSequence]);

  const startGame = useCallback(() => {
    setGamePattern([]);
    setUserPattern([]);
    setLevel(0);
    setIsGameOver(false);
    setIsStarted(true);
    
    setTimeout(() => {
      const randomColor = BUTTON_COLORS[Math.floor(Math.random() * 4)];
      setGamePattern([randomColor]);
      setLevel(1);
      setTimeout(() => {
        playSequence([randomColor]);
      }, 500);
    }, 300);
  }, [playSequence]);

  const handleUserClick = useCallback((color) => {
    if (!isStarted || isGameOver || isPlayingSequence) return;
    
    playSound(color);
    const newUserPattern = [...userPattern, color];
    setUserPattern(newUserPattern);
    
    const currentIndex = newUserPattern.length - 1;
    
    if (gamePattern[currentIndex] !== color) {
      // Wrong answer
      playSound('wrong');
      setIsGameOver(true);
      setIsStarted(false);
      return;
    }
    
    if (newUserPattern.length === gamePattern.length) {
      // Completed current level
      setTimeout(nextSequence, 1000);
    }
  }, [isStarted, isGameOver, isPlayingSequence, userPattern, gamePattern, playSound, nextSequence]);

  return {
    level,
    isStarted,
    isGameOver,
    activeButton,
    isPlayingSequence,
    startGame,
    handleUserClick,
  };
}
