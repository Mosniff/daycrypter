import { RowData } from "../types";
import { GameMapTile } from "./GameMapTile";

type Props = { rowData: RowData };

export const GameMapRow = ({ rowData }: Props) => {
  const indexes = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="flex">
      {indexes.map((index) => (
        <GameMapTile terrainType={rowData[index].terrainType} />
      ))}
    </div>
  );
};
