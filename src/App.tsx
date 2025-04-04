import { useEffect, useRef, useState } from "react";
import { GameMap } from "./components/GameMap";
import { GameData } from "./types";
import { generateGame } from "./gameLogic/game";
import { ConditionsBox } from "./components/ConditionsBox";
import { HowToPlay } from "./components/HowToPlay";
import { Timer } from "./components/Timer";

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
    startTimer();
  };

  const onIncorrectGuess = () => {
    setWinCount(0);
    const generatedGame = generateGame();
    setGameData(generatedGame);
    startTimer();
  };

  // Timer
  const initialTimeLimitInMilliseconds = 20000;
  const [timeLeft, setTimeLeft] = useState(initialTimeLimitInMilliseconds);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    setTimeLeft(initialTimeLimitInMilliseconds);
    timerInterval.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      onIncorrectGuess();
    }
  }, [timeLeft]);

  // /Timer

  return (
    <div className="h-full flex flex-col gap-4">
      {!gameData && <div>Loading...</div>}
      {gameData == "failed" && <div>Game failed, please refresh</div>}
      {gameData && gameData != "failed" && (
        <>
          <div className="text-xl font-semibold">Streak: {winCount}</div>
          <Timer
            TimeLeftInMilliseconds={timeLeft}
            initialTimeLimitInMilliseconds={initialTimeLimitInMilliseconds}
          />
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
          <div>
            <HowToPlay />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
