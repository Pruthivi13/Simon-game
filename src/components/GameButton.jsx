import './GameButton.css';

function GameButton({ color, isActive, onClick, disabled }) {
  return (
    <button
      className={`game-btn ${color} ${isActive ? 'active' : ''}`}
      onClick={() => onClick(color)}
      disabled={disabled}
      aria-label={`${color} button`}
    />
  );
}

export default GameButton;
