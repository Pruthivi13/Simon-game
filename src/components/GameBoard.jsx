import GameButton from './GameButton';
import './GameBoard.css';

function GameBoard({ activeButton, onButtonClick, disabled }) {
  const colors = ['green', 'red', 'yellow', 'blue'];
  
  return (
    <div className="game-board">
      {colors.map(color => (
        <GameButton
          key={color}
          color={color}
          isActive={activeButton === color}
          onClick={onButtonClick}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default GameBoard;
