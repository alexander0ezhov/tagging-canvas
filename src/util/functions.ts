import { iCoord } from "../types";

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
