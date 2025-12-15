import { useState } from 'react';
import './GameRules.css';

function GameRules() {
  const [isOpen, setIsOpen] = useState(false);

  const rules = [
    "Press the Start button or tap to begin the game.",
    "Watch carefully as the game flashes a color sequence.",
    "Repeat the sequence by clicking/tapping the buttons in the same order.",
    "Each round adds one more color to the sequence.",
    "If you click the wrong color, the game ends.",
    "Try to remember the longest sequence possible!",
    "After game over, tap Start to play again."
  ];

  return (
    <div className="game-rules">
      <button 
        className="rules-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>📖 How to Play</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <ol className="rules-list">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default GameRules;
