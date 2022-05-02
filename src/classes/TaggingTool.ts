import { canvas, ctx, clearCanvas } from "../util/canvas";
import Rect from "./Rect";

class TaggingTool {
  constructor() {
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      switch (true) {
        case this.mouseDown:
          console.log(this.currentRect);
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
  }
  private mouseDown = false;
  private rects: iRect[] = [];
  private currentRect: iRect | null = null;

  private createRect(rectParams: iRect) {
    this.rects.push(new Rect(rectParams));
    this.currentRect = this.rects[this.rects.length - 1];
    TaggingTool.drawRect(rectParams);
  }

  private static drawRect({ x, y, h, w }: iRect) {
    console.log("drawing");
    ctx.fillStyle = "#3ae6ca20";
    ctx.strokeStyle = "#3ae6ca";
    ctx.rect(x, y, w, h);
    ctx.fill();
  }

  private render() {}
}

export default TaggingTool;
