import { TileData } from "../types";
import { StructureIcon } from "./StructureIcon";

type Props = {
  tileData: TileData;
  onClick?: (guessedIndex: number) => void;
  tileIndex?: number;
};

export const GameMapTile = ({
  tileData: { terrainType, structure },
  onClick,
  tileIndex,
}: Props) => {
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
      onClick={() => {
        if (onClick && (tileIndex || tileIndex === 0)) {
          onClick(tileIndex);
        }
      }}
    >
      {structure && <StructureIcon {...structure} />}
    </div>
  );
};
