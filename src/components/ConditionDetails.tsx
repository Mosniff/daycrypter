import { Condition } from "../types";

export const ConditionDetails = ({
  acceptableTerrains,
  requiredTerrainWithinOneTile,
  requiredStructureTypeWithinTwoTiles,
  requiredStructureColorWithinThreeTiles,
}: Condition) => {
  let conditionDetails;
  if (requiredTerrainWithinOneTile) {
    conditionDetails = `within one tile of ${requiredTerrainWithinOneTile}`;
  } else if (requiredStructureTypeWithinTwoTiles) {
    conditionDetails = `within two tiles of ${requiredStructureTypeWithinTwoTiles}`;
  } else if (requiredStructureColorWithinThreeTiles) {
    conditionDetails = `within three tiles of ${requiredStructureColorWithinThreeTiles}`;
  } else {
    conditionDetails = `must be on either ${acceptableTerrains[0]} or ${acceptableTerrains[1]}`;
  }
  return (
    <div className="text-xl font-semibold">Must be {conditionDetails}</div>
  );
};
