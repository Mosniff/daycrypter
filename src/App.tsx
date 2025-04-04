import { useEffect, useState } from "react";
import { GameMap } from "./components/GameMap";
import { GameData } from "./types";
import { generateGame } from "./gameLogic/game";
import { ConditionsBox } from "./components/ConditionsBox";
import { HowToPlay } from "./components/HowToPlay";

function App() {
  const [gameData, setGameData] = useState<GameData | "failed" | null>(null);
  const [winCount, setWinCount] = useState<number>(0);
  useEffect(() => {
    const generatedGame = generateGame();
    setGameData(generatedGame);
  }, []);

  const onCorrectGuess = () => {
    setWinCount(winCount + 1);
    const generatedGame = generateGame();
    setGameData(generatedGame);
  };

  const onIncorrectGuess = () => {
    setWinCount(0);
    const generatedGame = generateGame();
    setGameData(generatedGame);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {!gameData && <div>Loading...</div>}
      {gameData == "failed" && <div>Game failed, please refresh</div>}
      {gameData && gameData != "failed" && (
        <>
          <div className="text-xl font-semibold">Streak: {winCount}</div>
          {/* <Timer /> */}
          <GameMap
            gameData={gameData}
            onCorrectGuess={onCorrectGuess}
            onIncorrectGuess={onIncorrectGuess}
          />
          {gameData.condition1 && gameData.condition2 && (
            <ConditionsBox
              condition1={gameData.condition1}
              condition2={gameData.condition2}
            />
          )}
          <HowToPlay />
        </>
      )}
    </div>
  );
}

export default App;
