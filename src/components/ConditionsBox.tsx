import { Condition } from "../types";
import { ConditionDetails } from "./ConditionDetails";

type Props = { condition1: Condition; condition2: Condition };

export const ConditionsBox = ({ condition1, condition2 }: Props) => {
  return (
    <div className="flex-1 bg-gray-700 p-2 rounded flex flex-col">
      <h2 className="text-3xl p-2 uppercase font-semibold">Conditions</h2>
      <div className="flex flex-col gap-8 items-center justify-center h-full">
        <ConditionDetails {...condition1} />
        <ConditionDetails {...condition2} />
      </div>
    </div>
  );
};
