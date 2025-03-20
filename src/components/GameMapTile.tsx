import { TileData } from "../types";

type Props = TileData;

export const GameMapTile = ({ terrainType }: Props) => {
  let terrainTypeColor;
  switch (terrainType) {
    case "lake":
      terrainTypeColor = "bg-blue-300";
      break;
    case "forest":
      terrainTypeColor = "bg-green-300";
      break;
    case "swamp":
      terrainTypeColor = "bg-purple-300";
      break;
    case "desert":
      terrainTypeColor = "bg-yellow-300";
      break;
  }

  return <div className={`w-12 h-12 border ${terrainTypeColor}`}></div>;
};
