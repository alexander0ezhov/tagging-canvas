export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

canvas.style.border = "1px solid gray";
canvas.style.cursor = "crosshair";

export const clearCanvas = ctx.clearRect.bind(
  ctx,
  0,
  0,
  canvas.width,
  canvas.height
);
