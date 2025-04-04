import { StructureKey } from "./StructureKey";
import { TerrainKey } from "./TerrainKey";
import { Button } from "./ui/button";
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
      <DialogTrigger>
        <Button>How To Play</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl">How To Play</h2>
          </DialogTitle>
          <DialogDescription>
            <ul className="list-disc list-inside text-lg flex flex-col gap-4 text-justify">
              <li>
                Your job is to click the one correct tile. The correct tile will
                be the only tile that satisfies both conditions.
              </li>
              <li>
                If you click the wrong tile, or if the timer runs out, your
                streak will end.
              </li>
              <li>
                Some conditions refer to the tile being "within" a number of
                tiles of something else. For determining distance, diagonal
                moves don't count. Occupying the same tile counts as "within".
              </li>
            </ul>
            <TerrainKey />
            <StructureKey />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
