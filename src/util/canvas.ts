export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

export const setCursorStyle = (cursorStyle: string = "crosshair"): void => {
  canvas.style.cursor = cursorStyle;
};

export const clearCanvas = ctx.clearRect.bind(
  ctx,
  0,
  0,
  canvas.width,
  canvas.height
);

export const RectBorderWidth = 2;

canvas.style.border = "1px solid gray";
setCursorStyle();
