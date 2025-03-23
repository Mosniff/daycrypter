export type MapData = { [key: number]: TileData };
export type RowData = { [key: number]: TileData; rowNumber: number };

export type TileData = {
  terrainType: TerrainType;
  structure?: StructureData | null;
};
export type StructureData = {
  color: "red" | "blue";
  structure: "pyramid" | "obelisk";
};

export type TerrainType = "lake" | "forest" | "swamp" | "desert";
