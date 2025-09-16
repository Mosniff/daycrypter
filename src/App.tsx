import { useEffect, useRef, useState } from "react";
import { GameMap } from "./components/GameMap";
import { GameData } from "./types";
import { generateGame } from "./gameLogic/game";
import { ConditionsBox } from "./components/ConditionsBox";
import { HowToPlay } from "./components/HowToPlay";
import { Timer } from "./components/Timer";
import { motion } from "motion/react";

function App() {
  const [gameData, setGameData] = useState<GameData | "failed" | null>(null);
  const [winCount, setWinCount] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [flashRed, setFlashRed] = useState(false);
  const [flashGreen, setFlashGreen] = useState(false);
  useEffect(() => {
    const generatedGame = generateGame();
    setGameData(generatedGame);

    // Get High Scores
    const highScore = localStorage.getItem("highScore");
    if (highScore) {
      setHighScore(parseInt(highScore));
    }
  }, []);

  const onCorrectGuess = () => {
    setWinCount(winCount + 1);
    const generatedGame = generateGame();
    setGameData(generatedGame);
    if (winCount + 1 > highScore) {
      setHighScore(winCount + 1);
      localStorage.setItem("highScore", `${winCount + 1}`);
    }
    setFlashGreen(true);
    setTimeout(() => setFlashGreen(false), 1000);
    startTimer();
  };

  const onIncorrectGuess = () => {
    setWinCount(0);
    const generatedGame = generateGame();
    setGameData(generatedGame);
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 1000);
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

  const getAnimateColor = () => {
    if (flashRed) {
      return ["#ff0000", "#ffffffde"];
    } else if (flashGreen) {
      return ["#00ff00", "#ffffffde"];
    } else {
      return "#ffffffde";
    }
  };

  return (
    <div className="h-full flex justify-center">
      <div className="h-full flex flex-col gap-4 max-w-sm">
        {!gameData && <div>Loading...</div>}
        {gameData == "failed" && <div>Game failed, please refresh</div>}
        {gameData && gameData != "failed" && (
          <>
            <div className="text-xl font-semibold font-white">
              High Score: {highScore} |{" "}
              <motion.span
                animate={{
                  color: getAnimateColor(),
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                Streak: {winCount}
              </motion.span>
            </div>
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
    </div>
  );
}

export default App;
