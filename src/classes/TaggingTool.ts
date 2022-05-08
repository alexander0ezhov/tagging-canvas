import { canvas, ctx, clearCanvas } from "../util/canvas";
import Rect from "./Rect";

class TaggingTool {
  constructor() {
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      switch (true) {
        case this.mouseDown:
          if (this.currentRect) {
            this.currentRect.resize(e.clientX, e.clientY, "sw");
            const { x, y, h, w } = this.currentRect;
            this.redraw();
            TaggingTool.drawRect({ x, y, h, w });
          }
          break;
        default:
          break;
      }
    });
    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.mouseDown = true;
      this.createRect({ x: e.clientX, y: e.clientY, h: 0, w: 0 });
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

  private static drawRect({ x, y, h, w }: iCoord) {
    ctx.fillStyle = "#3ae6ca20";
    ctx.strokeStyle = "#3ae6ca";
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
    ctx.fill();
  }

  private render() {}
}

export default TaggingTool;