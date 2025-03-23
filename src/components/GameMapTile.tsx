import { TileData } from "../types";
import { StructureIcon } from "./StructureIcon";

type Props = TileData;

export const GameMapTile = ({ terrainType, structure }: Props) => {
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

  return (
    <div
      className={`w-12 h-12 border ${terrainTypeColor} flex justify-center items-center`}
    >
      {structure && <StructureIcon {...structure} />}
    </div>
  );
};
