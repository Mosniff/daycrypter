import { Condition, GameData } from "../types";
import { generateMap } from "./map";
import { generateAcceptableConditions, grabWinningTileIndex } from "./rules";

export const generateGame: () => GameData | "failed" = () => {
  let conditions:
    | {
        condition1: Condition;
        condition2: Condition;
      }
    | "failed" = "failed";
  let mapData;
  let tries = 0;
  while (tries < 1000 && conditions == "failed") {
    mapData = generateMap();
    conditions = generateAcceptableConditions(mapData);
    tries++;
  }

  if (conditions == "failed" || !mapData) {
    return "failed";
  } else {
    const gameData: GameData = {
      mapData: mapData,
      condition1: conditions.condition1,
      condition2: conditions.condition2,
      failed: false,
      winningTileIndex: grabWinningTileIndex(
        mapData,
        conditions.condition1,
        conditions.condition2
      ),
    };
    return gameData;
  }
};
