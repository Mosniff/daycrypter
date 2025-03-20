import { MapData, RowData } from "../types";
import { GameMapRow } from "./GameMapRow";

const mapData: MapData = {
  0: { terrainType: "lake" },
  1: { terrainType: "lake" },
  2: { terrainType: "lake" },
  3: { terrainType: "lake" },
  4: { terrainType: "lake" },
  5: { terrainType: "lake" },
  6: { terrainType: "lake" },
  7: { terrainType: "lake" },
  8: { terrainType: "lake" },
  9: { terrainType: "lake" },
  10: { terrainType: "lake" },
  11: { terrainType: "lake" },
  12: { terrainType: "lake" },
  13: { terrainType: "lake" },
  14: { terrainType: "lake" },
  15: { terrainType: "swamp" },
};

const getRowFromMapData = (mapData: MapData, rowNumber: number) => {
  const startingIndex = (rowNumber - 1) * 8;
  const rowData: RowData = { rowNumber: rowNumber };
  for (let i = 0; i < 8; i++) {
    rowData[i] = mapData[startingIndex + i];
  }
  return rowData;
};

export const GameMap = () => {
  return (
    <div>
      <GameMapRow rowData={getRowFromMapData(mapData, 1)} />
      <GameMapRow rowData={getRowFromMapData(mapData, 2)} />
    </div>
  );
};
