import { CursorPropsByPosType, iCoord, iPos, iRectProps } from "../types";
import { setCursorStyle } from "./canvas";
import { RECT_BORDER_WIDTH } from "./data";

export const convertRectCoordinatesToPositive = ({ x, y, h, w }: iCoord) => {
  const result: iCoord = { x, y, h, w };
  if (h < 0) {
    result.h = -h;
    result.y = y + h;
  }
  if (w < 0) {
    result.w = -w;
    result.x = x + w;
  }
  return result;
};

export const CursorPropsByPos: {
  [index: string]: CursorPropsByPosType;
} = {
  "start-start": {
    cursor: "nwse-resize",
    mouseAction: "resize",
    direction: "start-start",
  },
  "start-end": {
    cursor: "nesw-resize",
    mouseAction: "resize",
    direction: "start-end",
  },
  "start-center": {
    cursor: "ew-resize",
    mouseAction: "resize",
    direction: "start-center",
  },
  "end-start": {
    cursor: "nesw-resize",
    mouseAction: "resize",
    direction: "end-start",
  },
  "end-end": {
    cursor: "nwse-resize",
    mouseAction: "resize",
    direction: "end-end",
  },
  "end-center": {
    cursor: "ew-resize",
    mouseAction: "resize",
    direction: "end-center",
  },
  "center-start": {
    cursor: "ns-resize",
    mouseAction: "resize",
    direction: "center-start",
  },
  "center-end": {
    cursor: "ns-resize",
    mouseAction: "resize",
    direction: "center-end",
  },
  "center-center": {
    cursor: "move",
    mouseAction: "move",
    direction: "center-center",
  },
};

const getMouseAxisOnRect = (
  mouseAxis: number,
  rectAxis: number,
  rectAxisSize: number
) => {
  if (mouseAxis - rectAxis < RECT_BORDER_WIDTH) return "start";
  if (rectAxis + rectAxisSize - mouseAxis < RECT_BORDER_WIDTH) return "end";
  return "center";
};

export const getCursorPropsOnRect = (rect: iRectProps, mousePos: iPos) => {
  const pos = `${getMouseAxisOnRect(
    mousePos.x,
    rect.x,
    rect.w
  )}-${getMouseAxisOnRect(mousePos.y, rect.y, rect.h)}`;

  const cursorProps = CursorPropsByPos[pos];
  setCursorStyle(cursorProps.cursor);
  return cursorProps;
};

export const generateUUID = (): string =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (sign) => {
    const date: number = new Date().getTime();
    const newSign: number = (date + Math.random() * 16) % 16 | 0;
    return (sign === "x" ? newSign : (newSign & 0x3) | 0x8).toString(16);
  });
