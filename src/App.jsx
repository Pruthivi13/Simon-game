import { useEffect } from 'react';
import { useSimonGame } from './hooks/useSimonGame';
import GameBoard from './components/GameBoard';
import GameRules from './components/GameRules';
import './App.css';

function App() {
  const {
    level,
    isStarted,
    isGameOver,
    activeButton,
    isPlayingSequence,
    startGame,
    handleUserClick,
  } = useSimonGame();

  // Allow keyboard start (for desktop)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isStarted && !isPlayingSequence) {
        startGame();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [isStarted, isPlayingSequence, startGame]);

  const getTitle = () => {
    if (isGameOver) return 'Game Over!';
    if (!isStarted) return 'Simon Game';
    return `Level ${level}`;
  };

  const getSubtitle = () => {
    if (isGameOver) return `You reached Level ${level}`;
    if (!isStarted) return 'Press Start or any key to begin';
    if (isPlayingSequence) return 'Watch the sequence...';
    return 'Your turn!';
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className={`title ${isGameOver ? 'game-over' : ''}`}>
          {getTitle()}
        </h1>
        <p className="subtitle">{getSubtitle()}</p>
      </header>

      <main className="main">
        <GameBoard
          activeButton={activeButton}
          onButtonClick={handleUserClick}
          disabled={!isStarted || isPlayingSequence}
        />

        {(!isStarted || isGameOver) && (
          <button className="start-btn" onClick={startGame}>
            {isGameOver ? '🔄 Play Again' : '🎮 Start Game'}
          </button>
        )}
      </main>

      <GameRules />

      <footer className="footer">
        <p>Built with React ⚛️</p>
      </footer>
    </div>
  );
}

export default App;
