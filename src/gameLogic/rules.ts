import {
  Condition,
  MapData,
  StructureColor,
  StructureType,
  TerrainType,
} from "../types";
import { grabTilesWithinDistance } from "./map";

export const checkIfTileMeetsCondition: (
  mapData: MapData,
  tileIndex: number,
  condition: Condition
) => boolean = (mapData, tileIndex, condition) => {
  let answer = false;
  const tile = mapData[tileIndex];
  if (condition.acceptableTerrains.includes(tile.terrainType)) {
    if (condition.requiredTerrainWithinOneTile) {
      checkIfTerrainTypeWithinOneTile(
        mapData,
        tileIndex,
        condition.requiredTerrainWithinOneTile
      );
    }
    if (condition.requiredStructureTypeWithinTwoTiles) {
      checkIfStructureTypeWithinTwoTiles(
        mapData,
        tileIndex,
        condition.requiredStructureTypeWithinTwoTiles
      );
    }
    if (condition.requiredStructureColorWithinThreeTiles) {
      checkIfStructureColorWithinThreeTiles(
        mapData,
        tileIndex,
        condition.requiredStructureColorWithinThreeTiles
      );
    }
  }
  return answer;
};

const checkIfTerrainTypeWithinOneTile: (
  mapData: MapData,
  tileIndex: number,
  requiredTerrain: TerrainType
) => boolean = (mapData, tileIndex, requiredTerrain) => {
  let answer = false;
  const tiles = grabTilesWithinDistance(1, mapData, tileIndex);
  Object.values(tiles).forEach((tile) => {
    if (tile.terrainType == requiredTerrain) {
      answer = true;
    }
  });
  return answer;
};

const checkIfStructureTypeWithinTwoTiles: (
  mapData: MapData,
  tileIndex: number,
  requiredStructureType: StructureType
) => boolean = (mapData, tileIndex, requiredStructureType) => {
  let answer = false;
  const tiles = grabTilesWithinDistance(2, mapData, tileIndex);
  Object.values(tiles).forEach((tile) => {
    if (tile.structure?.structure == requiredStructureType) {
      answer = true;
    }
  });
  return answer;
};

const checkIfStructureColorWithinThreeTiles: (
  mapData: MapData,
  tileIndex: number,
  requiredStructureColor: StructureColor
) => boolean = (mapData, tileIndex, requiredStructureColor) => {
  let answer = false;
  const tiles = grabTilesWithinDistance(2, mapData, tileIndex);
  Object.values(tiles).forEach((tile) => {
    if (tile.structure?.color == requiredStructureColor) {
      answer = true;
    }
  });
  return answer;
};
