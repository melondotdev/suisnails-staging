// constants/tileMap.ts
import { ROOM_WIDTH, ROOM_HEIGHT, TILE_SIZE } from './tiles';

const WIDTH_IN_TILES = ROOM_WIDTH / TILE_SIZE; // 20
const HEIGHT_IN_TILES = ROOM_HEIGHT / TILE_SIZE; // 15

// Tile IDs used:
// Floor: 0
// Wall: 50
// Water: 11
// Overlay: Torch (10), Fountain/Statue (13), Grate (15)

const BASE_MAP: number[][] = [];
const centerX = Math.floor(WIDTH_IN_TILES / 2); // Center of the map
const centerY = Math.floor(HEIGHT_IN_TILES / 2);
const outerRadius = 6; // Radius of the water area
const innerRadius = 4; // Radius of the dry patch in the center

for (let y = 0; y < HEIGHT_IN_TILES; y++) {
  const row: number[] = [];
  for (let x = 0; x < WIDTH_IN_TILES; x++) {
    let tile = 0; // Default floor
    
    // Border walls
    if (y === 0 || y === HEIGHT_IN_TILES - 1 || x === 0 || x === WIDTH_IN_TILES - 1) {
      tile = 50 + Math.floor(Math.random() * 4); // Random wall variation (50-53)
    } else {
      // Calculate distance from the center of the circle
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance <= outerRadius && distance > innerRadius) {
        tile = 11; // Water within the circular area
      } else if (distance <= innerRadius) {
        tile = 0; // Dry patch in the middle
      }
    }
    
    row.push(tile);
  }
  BASE_MAP.push(row);
}

// Hard-coded overlay map (same dimensions, 0 means no overlay)
const OVERLAY_MAP: number[][] = [];
for (let y = 0; y < HEIGHT_IN_TILES; y++) {
  const row: number[] = [];
  for (let x = 0; x < WIDTH_IN_TILES; x++) {
    row.push(0);
  }
  OVERLAY_MAP.push(row);
}

// Add torches on some walls with even spacing
const TORCH_SPACING = 5; // Place a torch every 3 tiles

// Left and right walls
for (let y = 1; y < HEIGHT_IN_TILES - 1; y++) {
  if (y % TORCH_SPACING === 0) {
    OVERLAY_MAP[y][0] = 10; // torch on left wall
    OVERLAY_MAP[y][WIDTH_IN_TILES - 1] = 10; // torch on right wall
  }
}

// Top and bottom walls
for (let x = 1; x < WIDTH_IN_TILES - 1; x++) {
  if (x % TORCH_SPACING === 0) {
    OVERLAY_MAP[0][x] = 10; // torch on top wall
    OVERLAY_MAP[HEIGHT_IN_TILES - 1][x] = 10; // torch on bottom wall
  }
}

// Place the fountain at the center
OVERLAY_MAP[centerY-2][centerX] = 13; // Fountains
OVERLAY_MAP[1][17] = 14
OVERLAY_MAP[2][2] = 16
OVERLAY_MAP[12][17] = 14
OVERLAY_MAP[12][2] = 14
OVERLAY_MAP[7][4] = 15
OVERLAY_MAP[7][5] = 15
OVERLAY_MAP[7][15] = 15
OVERLAY_MAP[7][16] = 15


export { BASE_MAP, OVERLAY_MAP };
