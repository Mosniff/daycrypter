import { GameData, MapData, RowData } from "../types";
import { GameMapRow } from "./GameMapRow";

const getRowFromMapData = (mapData: MapData, rowNumber: number) => {
  const startingIndex = (rowNumber - 1) * 8;
  const rowData: RowData = { rowNumber: rowNumber };
  for (let i = 0; i < 8; i++) {
    rowData[i] = mapData[startingIndex + i];
  }
  return rowData;
};

type GameMapProps = {
  gameData: GameData;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
};

export const GameMap = ({
  gameData,
  onCorrectGuess,
  onIncorrectGuess,
}: GameMapProps) => {
  const rowNumbers = Array.from({ length: 8 }, (_, index) => index + 1);

  const guessTile = (guessedIndex: number) => {
    if (guessedIndex == gameData.winningTileIndex) {
      console.log("winner");
      onCorrectGuess();
    } else {
      console.log("loser");
      onIncorrectGuess();
    }
  };

  return (
    <>
      <div>
        {rowNumbers.map((rowNumber) => (
          <GameMapRow
            key={rowNumber}
            rowData={getRowFromMapData(gameData.mapData, rowNumber)}
            onTileClick={guessTile}
          />
        ))}
      </div>
    </>
  );
};
