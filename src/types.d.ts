interface iPos {
  x: number;
  y: number;
}

interface iCoord extends iPos {
  h: number;
  w: number;
}

interface iRectProps extends iCoord {
  color: string;
}

interface iRect extends iRectProps {
  resize: (
    mouseX: iCoord["x"],
    mouseY: iCoord["y"],
    border: BorderType
  ) => void;
}

type BorderType = "sw" | "sn";

type ActionType = "move" | "resize" | null;

export type CursorActionByPosType = {
  cursor: string;
  mouseAction: ActionType;
};
