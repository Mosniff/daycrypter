import { StructureKey } from "./StructureKey";
import { TerrainKey } from "./TerrainKey";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const HowToPlay = () => {
  return (
    <Dialog>
      <DialogTrigger className="font-bold rounded bg-gray-600 py-2 px-6 w-fit">
        How To Play
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">How To Play</DialogTitle>
          <DialogDescription>Rules</DialogDescription>
          <ul className="list-disc list-inside text-lg flex flex-col gap-4 text-justify">
            <li>
              Your job is to click the one correct tile. The correct tile will
              be the only tile that satisfies both conditions.
            </li>
            <li>
              If you click the wrong tile, or if the timer runs out, your streak
              will end.
            </li>
            <li>
              Some conditions refer to the tile being "within" a number of tiles
              of something else. For determining distance, diagonal moves don't
              count. Occupying the same tile counts as "within".
            </li>
          </ul>
          <TerrainKey />
          <StructureKey />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
