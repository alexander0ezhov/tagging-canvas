interface iCoord {
  x: number;
  y: number;
  h: number;
  w: number;
}

interface iRect extends iCoord {
  // color?:
  resize: (
    mouseX: iCoord["x"],
    mouseY: iCoord["y"],
    border: borderType
  ) => void;
}

type borderType = "sw" | "sn";
