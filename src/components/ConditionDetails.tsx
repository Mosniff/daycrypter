import { Condition } from "../types";
import { StructureIcon } from "./StructureIcon";

const terrainColorMapping = {
  lake: "text-blue-300",
  forest: "text-green-300",
  swamp: "text-purple-300",
  desert: "text-yellow-300",
};

export const ConditionDetails = ({
  acceptableTerrains,
  requiredTerrainWithinOneTile,
  requiredStructureTypeWithinTwoTiles,
  requiredStructureColorWithinThreeTiles,
}: Condition) => {
  let conditionDetails;
  let structureColor;
  switch (requiredStructureColorWithinThreeTiles) {
    case "red":
      structureColor = "text-red-500";
      break;
    case "blue":
      structureColor = "text-blue-500";
      break;
  }
  let oneTileTerrainColor;
  if (requiredTerrainWithinOneTile) {
    oneTileTerrainColor = terrainColorMapping[requiredTerrainWithinOneTile];
  }
  const terrainColor1 = terrainColorMapping[acceptableTerrains[0]];
  const terrainColor2 = terrainColorMapping[acceptableTerrains[1]];

  if (requiredTerrainWithinOneTile) {
    conditionDetails = (
      <span>
        within one tile of{" "}
        <span className={`${oneTileTerrainColor} font-semibold`}>
          {requiredTerrainWithinOneTile}
        </span>
      </span>
    );
  } else if (requiredStructureTypeWithinTwoTiles) {
    conditionDetails = (
      <span>
        within two tiles of{" "}
        <div className="flex gap-2 justify-center items-center">
          <StructureIcon
            structure={requiredStructureTypeWithinTwoTiles}
            color="red"
          />
          or
          <StructureIcon
            structure={requiredStructureTypeWithinTwoTiles}
            color="blue"
          />
        </div>
      </span>
    );
  } else if (requiredStructureColorWithinThreeTiles) {
    conditionDetails = (
      <span>
        within three tiles of{" "}
        <span className={`${structureColor} font-semibold`}>
          {requiredStructureColorWithinThreeTiles} structure
        </span>
      </span>
    );
  } else {
    conditionDetails = (
      <span>
        must be on either{" "}
        <span className={`${terrainColor1} font-semibold`}>
          {acceptableTerrains[0]}
        </span>{" "}
        or{" "}
        <span className={`${terrainColor2} font-semibold`}>
          {acceptableTerrains[1]}
        </span>
      </span>
    );
  }
  return <div className="text-2xl">Must be {conditionDetails}</div>;
};
