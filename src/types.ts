export type MapData = { [key: number]: TileData };
export type RowData = { [key: number]: TileData; rowNumber: number };

export type TileData = { terrainType: TerrainType };

export type TerrainType = "lake" | "forest" | "swamp" | "desert";
