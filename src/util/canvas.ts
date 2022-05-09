let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
let setCursorStyle = (cursorStyle: string = "crosshair") => {};
let clearCanvas = () => {};

export const initCanvas = (node: HTMLCanvasElement) => {
  canvas = node;
  ctx = canvas.getContext("2d");
  setCursorStyle = (cursorStyle: string = "crosshair"): void => {
    canvas!.style.cursor = cursorStyle;
  };
  clearCanvas = ctx!.clearRect.bind(ctx, 0, 0, canvas.width, canvas.height);
  setCursorStyle();
};

export { canvas, ctx, setCursorStyle, clearCanvas };
