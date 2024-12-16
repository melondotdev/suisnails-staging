import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DPad } from './DPad';
import { ROOM_WIDTH, ROOM_HEIGHT } from './constants/tiles';
import { RotationWarning } from "./RotationWarning"
import { BASE_MAP, OVERLAY_MAP } from './constants/tileMap';
import { OBJECTS } from './constants/objects';
import { useAssets } from './hooks/useAssets';
import { drawScene } from './utils/drawScene';
import { BackButton } from './BackButton';

const INTERACT_DISTANCE = 32; // Maximum distance to interact with objects (1 tile)

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 480 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Maintain aspect ratio 4:3
      const aspectRatio = 4 / 3;
      let newWidth = screenWidth;
      let newHeight = Math.floor(screenWidth / aspectRatio);

      if (newHeight > screenHeight) {
        newHeight = screenHeight;
        newWidth = Math.floor(screenHeight * aspectRatio);
      }

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [player, setPlayer] = useState({
    x: 64,
    y: 64,
    width: 32,
    height: 32,
    speed: 7,
    direction: 'right', // default facing right
  });
  
  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>({});
  const [interactionText, setInteractionText] = useState<{ title: string; body: string } | null>(null);
  const [highlightedObject, setHighlightedObject] = useState<{ x: number; y: number } | null>(null);
  
  const { loaded, tileImages, playerImage, objectImages } = useAssets();
  
  const TILE_SIZE = 32; // Tile size in pixels
  const HITBOX_MARGIN = 8; // Smaller hitbox margin for smoother movement

  function isTileWalkable(x: number, y: number): boolean {
    // Check overlay first
    const overlayTile = OVERLAY_MAP[y]?.[x];
    if (overlayTile === 15) {
      return true; // Grate overrides everything
    }
  
    // Otherwise, check base map
    const baseTile = BASE_MAP[y]?.[x];
    return baseTile === 0 || baseTile === 15; // floor or grate in BASE_MAP
  }  
  
  const movePlayer = useCallback((dx: number, dy: number) => {
    setPlayer(prev => {
      let newX = prev.x + dx * prev.speed;
      let newY = prev.y + dy * prev.speed;

      // Apply HITBOX_MARGIN to player's bounding box
      const hitboxLeft = newX + HITBOX_MARGIN;
      const hitboxRight = newX + prev.width - HITBOX_MARGIN;
      const hitboxTop = newY + HITBOX_MARGIN;
      const hitboxBottom = newY + prev.height - HITBOX_MARGIN;

      // Convert these hitbox edges to tile coordinates
      const topLeft = { x: Math.floor(hitboxLeft / TILE_SIZE), y: Math.floor(hitboxTop / TILE_SIZE) };
      const topRight = { x: Math.floor(hitboxRight / TILE_SIZE), y: Math.floor(hitboxTop / TILE_SIZE) };
      const bottomLeft = { x: Math.floor(hitboxLeft / TILE_SIZE), y: Math.floor(hitboxBottom / TILE_SIZE) };
      const bottomRight = { x: Math.floor(hitboxRight / TILE_SIZE), y: Math.floor(hitboxBottom / TILE_SIZE) };

      // Check horizontal movement first
      let tempX = prev.x;
      {
        const testLeft = newX + HITBOX_MARGIN;
        const testRight = newX + prev.width - HITBOX_MARGIN;

        const topLeftX    = { x: Math.floor(testLeft / TILE_SIZE), y: Math.floor((prev.y + HITBOX_MARGIN) / TILE_SIZE) };
        const topRightX   = { x: Math.floor(testRight / TILE_SIZE), y: Math.floor((prev.y + HITBOX_MARGIN) / TILE_SIZE) };
        const bottomLeftX = { x: Math.floor(testLeft / TILE_SIZE), y: Math.floor((prev.y + prev.height - HITBOX_MARGIN) / TILE_SIZE) };
        const bottomRightX= { x: Math.floor(testRight / TILE_SIZE), y: Math.floor((prev.y + prev.height - HITBOX_MARGIN) / TILE_SIZE) };

        if (isTileWalkable(topLeftX.x, topLeftX.y) && isTileWalkable(topRightX.x, topRightX.y) &&
            isTileWalkable(bottomLeftX.x, bottomLeftX.y) && isTileWalkable(bottomRightX.x, bottomRightX.y)) {
          tempX = newX; // Allow horizontal movement
        }
      }

      // Now check vertical movement with the updated X
      let tempY = prev.y;
      {
        const testTop = newY + HITBOX_MARGIN;
        const testBottom = newY + prev.height - HITBOX_MARGIN;

        const topLeftY    = { x: Math.floor((tempX + HITBOX_MARGIN) / TILE_SIZE), y: Math.floor(testTop / TILE_SIZE) };
        const topRightY   = { x: Math.floor((tempX + prev.width - HITBOX_MARGIN) / TILE_SIZE), y: Math.floor(testTop / TILE_SIZE) };
        const bottomLeftY = { x: Math.floor((tempX + HITBOX_MARGIN) / TILE_SIZE), y: Math.floor(testBottom / TILE_SIZE) };
        const bottomRightY= { x: Math.floor((tempX + prev.width - HITBOX_MARGIN) / TILE_SIZE), y: Math.floor(testBottom / TILE_SIZE) };

        if (isTileWalkable(topLeftY.x, topLeftY.y) && isTileWalkable(topRightY.x, topRightY.y) &&
            isTileWalkable(bottomLeftY.x, bottomLeftY.y) && isTileWalkable(bottomRightY.x, bottomRightY.y)) {
          tempY = newY; // Allow vertical movement
        }
      }

      // Determine direction based on dx, dy
      let newDirection = prev.direction;
      if (dx > 0) newDirection = 'right';
      else if (dx < 0) newDirection = 'left';
      else if (dy > 0) newDirection = 'down';
      else if (dy < 0) newDirection = 'up';

      return { ...prev, x: tempX, y: tempY, direction: newDirection };
    });
  }, []);
  
  const handleInteraction = useCallback(() => {
    console.log("Interaction triggered"); // Debug to confirm the function is invoked
    for (let obj of OBJECTS) {
      const distX = Math.abs(player.x + player.width / 2 - (obj.x + obj.width / 2));
      const distY = Math.abs(player.y + player.height / 2 - (obj.y + obj.height / 2));
      if (distX <= INTERACT_DISTANCE && distY <= INTERACT_DISTANCE) {
        console.log(`Interacting with: ${obj.name}`); // Debug to confirm the object is identified
        setInteractionText({ title: obj.name, body: obj.description });
        return;
      }
    }
    setInteractionText(null);
  }, [player]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(`Key pressed: ${e.key}`);
      if (['w', 'a', 's', 'd'].includes(e.key)) {
        setKeysPressed(prev => ({ ...prev, [e.key]: true }));
      }
      if (e.key.toLowerCase() === 'x') {
        handleInteraction();
      }
    };
  
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['w', 'a', 's', 'd'].includes(e.key)) {
        setKeysPressed(prev => ({ ...prev, [e.key]: false }));
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleInteraction]);  

  useEffect(() => {
    let dx = 0, dy = 0;
    if (keysPressed['w']) dy -= 1;
    if (keysPressed['a']) dx -= 1;
    if (keysPressed['s']) dy += 1;
    if (keysPressed['d']) dx += 1;
    if (dx !== 0 || dy !== 0) {
      movePlayer(dx, dy);
    }
  }, [keysPressed, movePlayer]);

  const [frameCount, setFrameCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameCount(fc => fc + 1);
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (!loaded || !playerImage || objectImages.length === 0 || tileImages.size === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      drawScene({
        ctx,
        tileMap: BASE_MAP,
        overlayMap: OVERLAY_MAP,
        tileImages,
        frameCount,
        playerImage,
        player, // pass along player with direction
        objectImages,
      });
      
      // Highlight nearby objects
      checkForProximity(ctx);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [loaded, tileImages, playerImage, objectImages, player, frameCount]);  

  const checkForProximity = (ctx: CanvasRenderingContext2D) => {
    let nearbyObject = null;
  
    for (let obj of OBJECTS) {
      const distX = Math.abs(player.x + player.width / 2 - (obj.x + obj.width / 2));
      const distY = Math.abs(player.y + player.height / 2 - (obj.y + obj.height / 2));
      if (distX <= INTERACT_DISTANCE && distY <= INTERACT_DISTANCE) {
        nearbyObject = obj;
        break;
      }
    }
  
    if (nearbyObject) {
      setHighlightedObject({ x: nearbyObject.x, y: nearbyObject.y });
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '16px monospace';
      ctx.fillText('Press X to interact', nearbyObject.x, nearbyObject.y - 10);
    } else {
      setHighlightedObject(null);
      setInteractionText(null); // Clear the interaction text when no object is nearby
    }
  };
  
  return (
    <div style={{ position: 'relative', width: `${ROOM_WIDTH}px`, margin: '0 auto' }}>
      <BackButton to="/" />
      <RotationWarning />
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          display: 'block',
          margin: '0 auto',
          border: '2px solid #000',
          backgroundColor: '#000',
        }}
      />
      {interactionText && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid #666',
            borderRadius: '4px',
            maxWidth: '300px',
            fontFamily: 'monospace',
          }}
        >
          <h4 style={{ margin: '0 0 5px 0' }}>{interactionText.title}</h4>
          <p style={{ margin: 0 }}>{interactionText.body}</p>
        </div>
      )}
      <DPad onMove={movePlayer} onInteract={handleInteraction} />
    </div>
  );
};
