export const ROOM_WIDTH = 640;
export const ROOM_HEIGHT = 480;
export const TILE_SIZE = 32;

// Asset Paths
export const stoneWalls = [
  '/assets/game/crawl/dc-dngn/wall/stone2_gray0.png',
  '/assets/game/crawl/dc-dngn/wall/stone2_gray1.png',
  '/assets/game/crawl/dc-dngn/wall/stone2_gray2.png',
  '/assets/game/crawl/dc-dngn/wall/stone2_gray3.png',
];

export const crystalFloors = [
  '/assets/game/crawl/dc-dngn/floor/crystal_floor0.png',
  '/assets/game/crawl/dc-dngn/floor/crystal_floor1.png',
  '/assets/game/crawl/dc-dngn/floor/crystal_floor2.png',
  '/assets/game/crawl/dc-dngn/floor/crystal_floor3.png',
  '/assets/game/crawl/dc-dngn/floor/crystal_floor4.png',
  '/assets/game/crawl/dc-dngn/floor/crystal_floor5.png',
];

export const greyDirts = [
  '/assets/game/crawl/dc-dngn/floor/grey_dirt0.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt1.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt2.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt3.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt4.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt5.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt6.png',
  '/assets/game/crawl/dc-dngn/floor/grey_dirt7.png',
];

export const torchFrames = [
  '/assets/game/crawl/dc-dngn/wall/torches/torch1.png',
  '/assets/game/crawl/dc-dngn/wall/torches/torch2.png',
  '/assets/game/crawl/dc-dngn/wall/torches/torch3.png',
  '/assets/game/crawl/dc-dngn/wall/torches/torch4.png',
];

export const waterFrames = [
  '/assets/game/crawl/dc-dngn/water/dngn_shallow_water_murky.png',
  '/assets/game/crawl/dc-dngn/water/dngn_shallow_water_murky2.png',
];

export const bloodFountain = '/assets/game/crawl/dc-dngn/dngn_blood_fountain.png';
export const crumbledColumn = '/assets/game/crawl/dc-dngn/crumbled_column.png';
export const grate = '/assets/game/crawl/dc-dngn/vaults/grate.png';
export const abyssGateway = '/assets/game/crawl/dc-dngn/gateways/dngn_enter_abyss.png';
export const sewer = '/assets/game/crawl/dc-dngn/gateways/sewer_portal_rusted.png';

// Asset Load Configuration
export const TILE_ASSETS = [
  { name: 'stoneWalls', loader: 'loadFrames', source: stoneWalls, tileId: [50, 51, 52, 53] },
  { name: 'crystalFloors', loader: 'loadFrames', source: crystalFloors, tileId: [0, 1, 2, 3, 4, 5] },
  { name: 'greyDirts', loader: 'loadFrames', source: greyDirts, tileId: [100, 101, 102, 103, 104, 105, 106, 107] },
  { name: 'torchFrames', loader: 'loadFrames', source: torchFrames, tileId: 10 },
  { name: 'waterFrames', loader: 'loadFrames', source: waterFrames, tileId: 11 },
  { name: 'bloodFountain', loader: 'loadImage', source: bloodFountain, tileId: 13 },
  { name: 'crumbledColumn', loader: 'loadImage', source: crumbledColumn, tileId: 14 },
  { name: 'grate', loader: 'loadImage', source: grate, tileId: 15 },
  { name: 'abyssGateway', loader: 'loadImage', source: abyssGateway, tileId: 16 },
  { name: 'sewer', loader: 'loadImage', source: sewer, tileId: 17 },
];
