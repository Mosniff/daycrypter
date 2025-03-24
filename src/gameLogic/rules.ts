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
      answer = checkIfTerrainTypeWithinOneTile(
        mapData,
        tileIndex,
        condition.requiredTerrainWithinOneTile
      );
    } else if (condition.requiredStructureTypeWithinTwoTiles) {
      answer = checkIfStructureTypeWithinTwoTiles(
        mapData,
        tileIndex,
        condition.requiredStructureTypeWithinTwoTiles
      );
    } else if (condition.requiredStructureColorWithinThreeTiles) {
      answer = checkIfStructureColorWithinThreeTiles(
        mapData,
        tileIndex,
        condition.requiredStructureColorWithinThreeTiles
      );
    } else {
      answer = true;
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
  const tiles = grabTilesWithinDistance(3, mapData, tileIndex);
  Object.values(tiles).forEach((tile) => {
    if (tile.structure?.color == requiredStructureColor) {
      answer = true;
    }
  });
  return answer;
};

export const countAcceptableTiles: (
  mapData: MapData,
  condition1: Condition,
  condition2: Condition
) => number = (mapData, condition1, condition2) => {
  let count = 0;
  Object.keys(mapData).forEach((tileIndex) => {
    if (
      checkIfTileMeetsCondition(mapData, parseInt(tileIndex), condition1) &&
      checkIfTileMeetsCondition(mapData, parseInt(tileIndex), condition2)
    ) {
      count++;
    }
  });

  return count;
};

export const generateCondition: () => Condition = () => {
  const number = Math.floor(Math.random() * 4);
  switch (number) {
    case 0:
      return generateOnTerrainCondition();
    case 1:
      return generateWithinOneTileCondition();
    case 2:
      return generateWithinTwoTilesCondition();
    case 3:
      return generateWithinThreeTilesCondition();
    default:
      return generateOnTerrainCondition();
  }
};

const possibleTerrains: TerrainType[] = ["lake", "forest", "swamp", "desert"];
const possibleStructureTypes: StructureType[] = ["pyramid", "obelisk"];
const possibleStructureColors: StructureColor[] = ["red", "blue"];

const generateOnTerrainCondition: () => Condition = () => {
  const duplicatedPossibleTerrains = [...possibleTerrains];
  const requiredTerrains: TerrainType[] = duplicatedPossibleTerrains.splice(
    Math.floor(Math.random() * 4),
    1
  );
  requiredTerrains.push(
    duplicatedPossibleTerrains[Math.floor(Math.random() * 3)]
  );
  return {
    acceptableTerrains: requiredTerrains,
    requiredTerrainWithinOneTile: null,
    requiredStructureTypeWithinTwoTiles: null,
    requiredStructureColorWithinThreeTiles: null,
  };
};

const generateWithinOneTileCondition: () => Condition = () => {
  const requiredTerrain: TerrainType =
    possibleTerrains[Math.floor(Math.random() * 4)];
  return {
    acceptableTerrains: possibleTerrains,
    requiredTerrainWithinOneTile: requiredTerrain,
    requiredStructureTypeWithinTwoTiles: null,
    requiredStructureColorWithinThreeTiles: null,
  };
};

const generateWithinTwoTilesCondition: () => Condition = () => {
  const requiredStructureType: StructureType =
    possibleStructureTypes[Math.floor(Math.random() * 2)];
  return {
    acceptableTerrains: possibleTerrains,
    requiredTerrainWithinOneTile: null,
    requiredStructureTypeWithinTwoTiles: requiredStructureType,
    requiredStructureColorWithinThreeTiles: null,
  };
};

const generateWithinThreeTilesCondition: () => Condition = () => {
  const requiredStructureColor: StructureColor =
    possibleStructureColors[Math.floor(Math.random() * 2)];
  return {
    acceptableTerrains: possibleTerrains,
    requiredTerrainWithinOneTile: null,
    requiredStructureTypeWithinTwoTiles: null,
    requiredStructureColorWithinThreeTiles: requiredStructureColor,
  };
};

export const generateAcceptableConditions: (mapData: MapData) =>
  | {
      condition1: Condition;
      condition2: Condition;
    }
  | "failed" = (mapData) => {
  let tries = 0;
  let conditions: { condition1: Condition; condition2: Condition } | "failed" =
    "failed";
  while (tries < 100) {
    const condition1 = generateCondition();
    const condition2 = generateCondition();
    if (countAcceptableTiles(mapData, condition1, condition2) == 1) {
      console.log(
        `successful conditions achieved with ${tries + 1} tries`,
        condition1,
        condition2
      );

      conditions = { condition1: condition1, condition2: condition2 };
      tries = 100;
    }
    tries++;
  }
  console.log(`finished looping ${tries + 1}`, conditions);
  return conditions;
};
