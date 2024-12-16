// utils/drawScene.ts
import { ROOM_WIDTH, ROOM_HEIGHT, TILE_SIZE } from '../constants/tiles';
import { OBJECTS } from '../constants/objects';

export interface TileDef {
  frames: HTMLImageElement[];
  animated: boolean;
}

// Reintroduce these helper loaders:
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export function loadFrames(paths: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(paths.map(p => loadImage(p)));
}

interface DrawSceneParams {
  ctx: CanvasRenderingContext2D;
  tileMap: number[][];
  overlayMap: number[][];
  tileImages: Map<number, TileDef>;
  frameCount: number;
  playerImage: HTMLImageElement;
  player: { x: number; y: number; width: number; height: number; direction: string };
  objectImages: HTMLImageElement[];
}

export function drawScene({
  ctx,
  tileMap,
  overlayMap,
  tileImages,
  frameCount,
  playerImage,
  player,
  objectImages,
}: DrawSceneParams) {
  ctx.clearRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {
      const tileId = tileMap[y][x];
      drawTile(ctx, x, y, tileId, tileImages, frameCount);
    }
  }

  for (let y = 0; y < overlayMap.length; y++) {
    for (let x = 0; x < overlayMap[y].length; x++) {
      const overlayId = overlayMap[y][x];
      if (overlayId !== 0) {
        drawTile(ctx, x, y, overlayId, tileImages, frameCount);
      }
    }
  }
  
  // Draw player with horizontal flip if facing left
  ctx.save();
  if (player.direction === 'left') {
    ctx.scale(-1, 1); // Flip horizontally
    ctx.drawImage(
      playerImage,
      -player.x - player.width, // Adjust for the flipped position
      player.y,
      player.width,
      player.height
    );
  } else {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
  }
  ctx.restore();
  
  // Draw objects
  OBJECTS.forEach((obj, i) => {
    const img = objectImages[i];
    if (img) {
      ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
    }
  });
}

const sizeOverrides = [
  { tileId: 13, size: 72 }, // Blood fountain
  { tileId: 14, size: 64 }, // Crumbled column
  { tileId: 16, size: 48 }, // gate
];

function drawTile(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  tileId: number, 
  tileImages: Map<number, TileDef>, 
  frameCount: number
) {
  const tileDef = tileImages.get(tileId);
  if (!tileDef) return;
  
  const { frames, animated } = tileDef;
  let frame = 0;

  if (animated) {
    frame = Math.floor(frameCount / 20) % frames.length;
  }

  const img = frames[frame];
  if (img) {
    // Check for size override
    const override = sizeOverrides.find(override => override.tileId === tileId);
    const size = override?.size || TILE_SIZE; // Default to TILE_SIZE if no override
    const offset = override ? (size - TILE_SIZE) / 2 : 0; // Center the tile if overridden
    
    ctx.drawImage(
      img,
      x * TILE_SIZE - offset,
      y * TILE_SIZE - offset,
      size,
      size
    );
  }
}

