import { CursorActionByPosType, iCoord, iPos, iRectProps } from "../types";
import { RectBorderWidth, setCursorStyle } from "./canvas";

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

export const CursorActionByPos: {
  [index: string]: CursorActionByPosType;
} = {
  "start-start": { cursor: "nwse-resize", mouseAction: "resize" },
  "start-end": { cursor: "nesw-resize", mouseAction: "resize" },
  "start-center": { cursor: "ew-resize", mouseAction: "resize" },
  "end-start": { cursor: "nesw-resize", mouseAction: "resize" },
  "end-end": { cursor: "nwse-resize", mouseAction: "resize" },
  "end-center": { cursor: "ew-resize", mouseAction: "resize" },
  "center-start": { cursor: "ns-resize", mouseAction: "resize" },
  "center-end": { cursor: "ns-resize", mouseAction: "resize" },
  "center-center": { cursor: "pointer", mouseAction: "move" },
};

const getMouseAxisOnRect = (
  mouseAxis: number,
  rectAxis: number,
  rectAxisSize: number
) => {
  if (mouseAxis - rectAxis < RectBorderWidth) return "start";
  if (rectAxis + rectAxisSize - mouseAxis < RectBorderWidth) return "end";
  return "center";
};

export const getMousePosOnRect = (rect: iRectProps, mousePos: iPos) => {
  const pos = `${getMouseAxisOnRect(
    mousePos.x,
    rect.x,
    rect.w
  )}-${getMouseAxisOnRect(mousePos.y, rect.y, rect.h)}`;

  const cursorAction = CursorActionByPos[pos];
  setCursorStyle(cursorAction.cursor);
};
