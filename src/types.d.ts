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
  active: boolean;
}

interface iRect extends iRectProps {
  resize: (
    mouseX: iCoord["x"],
    mouseY: iCoord["y"],
    border: BorderType
  ) => void;
  move: (mouseX: iCoord["x"], mouseY: iCoord["y"]) => void;
}

type BorderType =
  | "start-center"
  | "end-center"
  | "center-start"
  | "center-end"
  | "start-start"
  | "start-end"
  | "end-start"
  | "end-end"
  | "center-center";

type ActionType = "move" | "resize" | null;

export type CursorPropsByPosType = {
  cursor: string;
  mouseAction: ActionType;
  direction: BorderType;
};
