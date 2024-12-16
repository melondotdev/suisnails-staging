import React, { FC, useEffect, useState } from 'react';

interface DPadProps {
  onMove: (dx: number, dy: number) => void;
  onInteract: () => void;
}

export const DPad: FC<DPadProps> = ({ onMove, onInteract }) => {
  const buttonStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    background: 'rgba(102, 102, 102, 0.6)',
    color: '#fff',
    border: '1px solid rgba(51, 51, 51, 0.8)',
    textAlign: 'center',
    lineHeight: '40px',
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: '4px',
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'grid',
    gridTemplateColumns: '40px 40px 40px',
    gridTemplateRows: '40px 40px 40px',
    gap: '5px',
    alignItems: 'center',
    justifyItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '10px',
    borderRadius: '10px',
  };

  // State to track button presses
  const [pressedButtons, setPressedButtons] = useState<{ [key: string]: boolean }>({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (pressedButtons.up) onMove(0, -1);
      if (pressedButtons.down) onMove(0, 1);
      if (pressedButtons.left) onMove(-1, 0);
      if (pressedButtons.right) onMove(1, 0);
    }, 50); // Adjust movement speed by changing the interval time

    return () => clearInterval(interval);
  }, [pressedButtons, onMove]);

  const handlePress = (direction: string) => {
    setPressedButtons(prev => ({ ...prev, [direction]: true }));
  };

  const handleRelease = (direction: string) => {
    setPressedButtons(prev => ({ ...prev, [direction]: false }));
  };

  return (
    <div style={containerStyle}>
      <div />
      <div
        style={buttonStyle}
        onMouseDown={() => handlePress('up')}
        onMouseUp={() => handleRelease('up')}
        onTouchStart={() => handlePress('up')}
        onTouchEnd={() => handleRelease('up')}
      >
        w
      </div>
      <div />
      <div
        style={buttonStyle}
        onMouseDown={() => handlePress('left')}
        onMouseUp={() => handleRelease('left')}
        onTouchStart={() => handlePress('left')}
        onTouchEnd={() => handleRelease('left')}
      >
        a
      </div>
      <button
        style={{
          ...buttonStyle,
          background: 'rgba(0, 128, 0, 0.6)', // Green for interaction button
        }}
        onClick={onInteract}
      >
        x
      </button>
      <div
        style={buttonStyle}
        onMouseDown={() => handlePress('right')}
        onMouseUp={() => handleRelease('right')}
        onTouchStart={() => handlePress('right')}
        onTouchEnd={() => handleRelease('right')}
      >
        d
      </div>
      <div />
      <div
        style={buttonStyle}
        onMouseDown={() => handlePress('down')}
        onMouseUp={() => handleRelease('down')}
        onTouchStart={() => handlePress('down')}
        onTouchEnd={() => handleRelease('down')}
      >
        s
      </div>
      <div />
    </div>
  );
};
