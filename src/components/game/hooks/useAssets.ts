import { useState, useEffect } from 'react';
import { TileDef, loadImage, loadFrames } from '../utils/drawScene';
import { TILE_ASSETS } from '../constants/tiles';
import { OBJECTS } from '../constants/objects';

export function useAssets() {
  const [tileImages, setTileImages] = useState<Map<number, TileDef>>(new Map());
  const [playerImage, setPlayerImage] = useState<HTMLImageElement | null>(null);
  const [objectImages, setObjectImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        // Load player image
        const playerImg = await loadImage('/assets/game/sprite/ghost.png').catch(err => {
          console.error(`Failed to load player image: /assets/game/sprite/ghost.png`, err);
          throw err;
        });
        setPlayerImage(playerImg);
        
        // Load object images
        const loadedObjects = await Promise.all(
          OBJECTS.map(async (o) => {
            try {
              return await loadImage(o.image);
            } catch (err) {
              console.error(`Failed to load object image: ${o.image}`, err);
              throw err;
            }
          })
        );
        setObjectImages(loadedObjects);

        // Load tile sets dynamically with fixed tile IDs
        const loadedTileImages = new Map<number, TileDef>();
        
        for (const asset of TILE_ASSETS) {
          try {
            const frames = asset.loader === 'loadFrames'
              ? await loadFrames(asset.source)
              : [await loadImage(asset.source)];
            
            if (Array.isArray(asset.tileId)) {
              // Assign multiple IDs for multi-frame assets
              asset.tileId.forEach((id, index) => {
                loadedTileImages.set(id, { frames: [frames[index]], animated: false });
              });
            } else {
              // Assign a single ID for static or animated assets
              loadedTileImages.set(asset.tileId, { frames, animated: asset.loader === 'loadFrames' });
            }
          } catch (err) {
            console.error(`Failed to load ${asset.name}:`, asset.source, err);
            throw err;
          }
        }

        setTileImages(loadedTileImages);
        setLoaded(true);
      } catch (error) {
        console.error('Failed to load assets completely. See logs for details.', error);
      }
    })();
  }, []);

  return { loaded, tileImages, playerImage, objectImages };
}
