import { useEffect, useState } from "react";
import { GameMap } from "./components/GameMap";
import { GameData } from "./types";
import { generateGame } from "./gameLogic/game";

function App() {
  const [gameData, setGameData] = useState<GameData | "failed" | null>(null);
  useEffect(() => {
    const generatedGame = generateGame();
    setGameData(generatedGame);
  }, []);

  return (
    <>
      {!gameData && <div>Loading...</div>}
      {gameData == "failed" && <div>Game failed, please refresh</div>}
      {gameData && gameData != "failed" && (
        <>
          <GameMap gameData={gameData} />

          {/* Debug */}
          <div className="flex flex-col justify-start items-start">
            <div>Conditions Debug: </div>
            <div>First:</div>
            <div>must be on {gameData.condition1?.acceptableTerrains}</div>
            <div>
              within 1 {gameData.condition1?.requiredTerrainWithinOneTile}
            </div>
            <div>
              within 2{" "}
              {gameData.condition1?.requiredStructureTypeWithinTwoTiles}
            </div>
            <div>
              within 3{" "}
              {gameData.condition1?.requiredStructureColorWithinThreeTiles}
            </div>
            <div>Second:</div>
            <div>must be on {gameData.condition2?.acceptableTerrains}</div>
            <div>
              within 1 {gameData.condition2?.requiredTerrainWithinOneTile}
            </div>
            <div>
              within 2{" "}
              {gameData.condition2?.requiredStructureTypeWithinTwoTiles}
            </div>
            <div>
              within 3{" "}
              {gameData.condition2?.requiredStructureColorWithinThreeTiles}
            </div>
          </div>
          {/* Debug */}
        </>
      )}
    </>
  );
}

export default App;
