import { generateMap } from "../game";
import { MapData, RowData } from "../types";
import { GameMapRow } from "./GameMapRow";

const getRowFromMapData = (mapData: MapData, rowNumber: number) => {
  const startingIndex = (rowNumber - 1) * 8;
  const rowData: RowData = { rowNumber: rowNumber };
  for (let i = 0; i < 8; i++) {
    rowData[i] = mapData[startingIndex + i];
  }
  return rowData;
};

export const GameMap = () => {
  const mapData = generateMap();
  const rowNumbers = Array.from({ length: 8 }, (_, index) => index + 1);
  return (
    <div>
      {rowNumbers.map((rowNumber) => (
        <GameMapRow rowData={getRowFromMapData(mapData, rowNumber)} />
      ))}
    </div>
  );
};
