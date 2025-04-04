import { StructureIcon } from "./StructureIcon";

export const StructureKey = () => {
  return (
    <>
      <h2 className="text-2xl p-4 text-white">Structure Types</h2>
      <div className="flex justify-center gap-8 items-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2 h-8 items-center">
            <StructureIcon structure="pyramid" color="red" />
            <StructureIcon structure="pyramid" color="blue" />
          </div>
          <div>Pyramid</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2 h-8 items-center">
            <StructureIcon structure="obelisk" color="red" />
            <StructureIcon structure="obelisk" color="blue" />
          </div>
          <div>Obelisk</div>
        </div>
      </div>
    </>
  );
};
