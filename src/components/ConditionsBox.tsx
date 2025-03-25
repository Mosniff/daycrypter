import { Condition } from "../types";
import { ConditionDetails } from "./ConditionDetails";

type Props = { condition1: Condition; condition2: Condition };

export const ConditionsBox = ({ condition1, condition2 }: Props) => {
  return (
    <>
      <h2 className="text-2xl p-2">Conditions</h2>
      <div className="flex flex-col gap-4 items-center">
        <ConditionDetails {...condition1} />
        <ConditionDetails {...condition2} />
        <div className="italic">
          (Click the correct tile. Only one tile will be correct. Diagonal moves
          not allowed)
        </div>
      </div>
    </>
  );
};
