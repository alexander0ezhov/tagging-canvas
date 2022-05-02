export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

export const clearCanvas = ctx.clearRect.bind(
  canvas,
  0,
  0,
  canvas.width,
  canvas.height
);
