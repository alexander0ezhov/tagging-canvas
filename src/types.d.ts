interface iCoord {
  x: number;
  y: number;
  h: number;
  w: number;
  color: string;
}

interface iRect extends iCoord {
  resize: (
    mouseX: iCoord["x"],
    mouseY: iCoord["y"],
    border: borderType
  ) => void;
}

type borderType = "sw" | "sn";
