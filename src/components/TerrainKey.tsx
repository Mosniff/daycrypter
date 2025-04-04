import { GameMapTile } from "./GameMapTile";

export const TerrainKey = () => {
  return (
    <>
      <h2 className="text-2xl p-4 text-white">Terrain Types</h2>
      <div className="flex justify-center items-start gap-4">
        <div className="flex flex-col gap-2 items-center">
          <GameMapTile tileData={{ terrainType: "lake" }} />
          <div>Lake</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <GameMapTile tileData={{ terrainType: "forest" }} />
          <div>Forest</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <GameMapTile tileData={{ terrainType: "swamp" }} />
          <div>Swamp</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <GameMapTile tileData={{ terrainType: "desert" }} />
          <div>Desert</div>
        </div>
      </div>
    </>
  );
};
