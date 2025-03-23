import { StructureData } from "../types";

type Props = StructureData;

export const StructureIcon = ({ color, structure }: Props) => {
  let styling;
  switch (structure) {
    case "pyramid":
      styling = {
        width: 0,
        height: 0,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        borderBottom: `15px solid ${color}`,
      };
      break;
    case "obelisk":
      styling = {
        width: "15px",
        height: "30px",
        borderRadius: "100% / 80px",
        background: `radial-gradient(50% 40px at 50% 40px, #0003 99.99%, #0000 0), radial-gradient(50% 40px at 50% calc(100% - 40px), #fff3 99.99%, #0000 0), ${color}`,
      };
      break;
  }
  return <div style={styling} />;
};
