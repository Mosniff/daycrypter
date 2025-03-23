import { MapData, TerrainType, TileData } from "./types";

// Map Generation
export const generateMap: () => MapData = () => {
  const indexes = Array.from({ length: 64 }, (_, index) => index);
  const mapData: MapData = {};

  // Generate seed tiles
  const seedTiles = {
    lake: Math.floor(Math.random() * 16),
    forest: Math.floor(Math.random() * 16) + 16,
    swamp: Math.floor(Math.random() * 16) + 32,
    desert: Math.floor(Math.random() * 16) + 48,
  };
  mapData[seedTiles.lake] = { terrainType: "lake" };
  mapData[seedTiles.forest] = { terrainType: "forest" };
  mapData[seedTiles.swamp] = { terrainType: "swamp" };
  mapData[seedTiles.desert] = { terrainType: "desert" };

  // Generate normal tiles
  for (let i = 0; i < indexes.length; i++) {
    // Only generate if this index is not a seed tile
    if (!mapData[i]) {
      mapData[i] = generateRandomTile(i, seedTiles);
    }
  }

  const populatedMapData = populateMap(mapData);

  return populatedMapData;
};

const populateMap: (mapData: MapData) => MapData = (mapData) => {
  const randomTiles: number[] = [];
  while (randomTiles.length < 4) {
    const pickedIndex = Math.floor(Math.random() * 64);
    if (
      mapData[pickedIndex].terrainType != "lake" &&
      !randomTiles.includes(pickedIndex)
    ) {
      randomTiles.push(pickedIndex);
    }
  }

  mapData[randomTiles[0]].structure = { color: "red", structure: "pyramid" };
  mapData[randomTiles[1]].structure = { color: "red", structure: "obelisk" };
  mapData[randomTiles[2]].structure = { color: "blue", structure: "pyramid" };
  mapData[randomTiles[3]].structure = { color: "blue", structure: "obelisk" };
  return mapData;
};

const generateRandomTile: (
  index: number,
  seedIndexes: {
    lake: number;
    forest: number;
    swamp: number;
    desert: number;
  }
) => TileData = (index, seedIndexes) => {
  const nearestSeed = calculateNearestSeed(index, seedIndexes);
  const terrainType = generateRandomTerrain(
    nearestSeed.distance,
    nearestSeed.terrainType
  );
  return { terrainType: terrainType };
};

const generateRandomTerrain: (
  distanceToSeed: number,
  seedTerrain: TerrainType
) => TerrainType = (distanceToSeed, seedTerrain) => {
  const terrainRolls = {
    lake: Math.floor(Math.random() * 10),
    forest: Math.floor(Math.random() * 10),
    swamp: Math.floor(Math.random() * 10),
    desert: Math.floor(Math.random() * 10),
  };

  terrainRolls[seedTerrain] = terrainRolls[seedTerrain] + (9 - distanceToSeed);

  let winner: TerrainType = "lake";
  if (terrainRolls.forest >= terrainRolls[winner]) {
    winner = "forest";
  }
  if (terrainRolls.swamp >= terrainRolls[winner]) {
    winner = "swamp";
  }
  if (terrainRolls.desert >= terrainRolls[winner]) {
    winner = "desert";
  }
  return winner;
};

const calculateRowIndex: (index: number) => number = (index) => {
  let rowIndex;
  if (index < 8) {
    rowIndex = 0;
  } else if (index >= 8 && index < 16) {
    rowIndex = 1;
  } else if (index >= 16 && index < 24) {
    rowIndex = 2;
  } else if (index >= 24 && index < 32) {
    rowIndex = 3;
  } else if (index >= 32 && index < 40) {
    rowIndex = 4;
  } else if (index >= 40 && index < 48) {
    rowIndex = 5;
  } else if (index >= 48 && index < 56) {
    rowIndex = 6;
  } else {
    rowIndex = 7;
  }
  return rowIndex;
};

const calculateCoordinates: (index: number) => { x: number; y: number } = (
  index
) => {
  const rowNumber = calculateRowIndex(index);
  return { x: index - rowNumber * 8, y: rowNumber };
};

const calculateDistanceBetweenTiles: (
  index1: number,
  index2: number
) => number = (index1, index2) => {
  const coordinates1 = calculateCoordinates(index1);
  const coordinates2 = calculateCoordinates(index2);
  return (
    Math.abs(coordinates1.x - coordinates2.x) +
    Math.abs(coordinates1.y - coordinates2.y)
  );
};

const calculateNearestSeed: (
  index: number,
  seedIndexes: {
    lake: number;
    forest: number;
    swamp: number;
    desert: number;
  }
) => {
  distance: number;
  terrainType: TerrainType;
} = (index, seedIndexes) => {
  const distances = {
    lake: calculateDistanceBetweenTiles(index, seedIndexes.lake),
    forest: calculateDistanceBetweenTiles(index, seedIndexes.forest),
    swamp: calculateDistanceBetweenTiles(index, seedIndexes.swamp),
    desert: calculateDistanceBetweenTiles(index, seedIndexes.desert),
  };

  const answer: {
    distance: number;
    terrainType: TerrainType;
  } = {
    distance: distances.lake,
    terrainType: "lake",
  };
  if (distances.forest <= answer.distance) {
    answer.distance = distances.forest;
    answer.terrainType = "forest";
  }
  if (distances.swamp <= answer.distance) {
    answer.distance = distances.swamp;
    answer.terrainType = "swamp";
  }
  if (distances.desert <= answer.distance) {
    answer.distance = distances.desert;
    answer.terrainType = "desert";
  }
  return answer;
};
