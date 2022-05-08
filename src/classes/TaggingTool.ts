import { canvas, ctx, clearCanvas } from "../util/canvas";
import Rect from "./Rect";

class TaggingTool {
  constructor() {
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      switch (true) {
        case this.mouseDown:
          if (this.currentRect) {
            this.currentRect.resize(e.offsetX, e.offsetY, "sw");
            const { x, y, h, w, color } = this.currentRect;
            this.redraw();
            TaggingTool.drawRect({ x, y, h, w, color });
          }
          break;
        default:
          break;
      }
    });
    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.mouseDown = true;
      this.createRect({
        x: e.offsetX,
        y: e.offsetY,
        h: 0,
        w: 0,
        color: "#cccccc",
      });
    });
    canvas.addEventListener("mouseup", (e: MouseEvent) => {
      this.mouseDown = false;
    });
    canvas.addEventListener("mouseout", (e: MouseEvent) => {
      this.mouseDown = false;
    });
  }
  private mouseDown = false;
  private rects: iRect[] = [];
  private currentRect: iRect | null = null;

  private createRect(rectParams: iCoord) {
    this.rects.push(new Rect(rectParams));
    this.currentRect = this.rects[this.rects.length - 1];
    TaggingTool.drawRect(rectParams);
  }

  private redraw() {
    clearCanvas();
    this.rects.forEach(TaggingTool.drawRect);
  }

  private static drawRect({ x, y, h, w, color }: iCoord) {
    ctx.fillStyle = `${color}20`;
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
    ctx.fill();
  }

  private render() {}
}

export default TaggingTool;
