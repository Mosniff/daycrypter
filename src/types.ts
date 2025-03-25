export type GameData = {
  mapData: MapData;
  condition1?: Condition;
  condition2?: Condition;
  failed?: boolean;
  winningTileIndex: number;
};
export type MapData = {
  [key: number]: TileData;
};
export type RowData = { [key: number]: TileData; rowNumber: number };
export type TileData = {
  terrainType: TerrainType;
  structure?: StructureData | null;
  chosenTile?: boolean;
};

export type Coordinates = { x: number; y: number };

export type StructureData = {
  color: StructureColor;
  structure: StructureType;
};

export type StructureColor = "red" | "blue";
export type StructureType = "pyramid" | "obelisk";

export type TerrainType = "lake" | "forest" | "swamp" | "desert";

export type Condition = {
  acceptableTerrains: TerrainType[];
  requiredTerrainWithinOneTile: TerrainType | null;
  requiredStructureTypeWithinTwoTiles: StructureType | null;
  requiredStructureColorWithinThreeTiles: StructureColor | null;
};
