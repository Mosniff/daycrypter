import { RowData } from "../types";
import { GameMapTile } from "./GameMapTile";

type Props = { rowData: RowData; onTileClick: (guessedIndex: number) => void };

export const GameMapRow = ({ rowData, onTileClick }: Props) => {
  const indexes = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="flex">
      {indexes.map((index) => (
        <GameMapTile
          key={index}
          tileData={rowData[index]}
          onClick={onTileClick}
          tileIndex={index + (rowData.rowNumber - 1) * 8}
        />
      ))}
    </div>
  );
};
