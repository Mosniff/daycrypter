import { useEffect, useState } from "react";
import { GameMap } from "./components/GameMap";
import { GameData } from "./types";
import { generateGame } from "./gameLogic/game";
import { ConditionsBox } from "./components/ConditionsBox";
import { TerrainKey } from "./components/TerrainKey";

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
          <TerrainKey />
          {gameData.condition1 && gameData.condition2 && (
            <ConditionsBox
              condition1={gameData.condition1}
              condition2={gameData.condition2}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
