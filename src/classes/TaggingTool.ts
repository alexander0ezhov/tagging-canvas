import { canvas, ctx, clearCanvas, RectBorderWidth } from "../util/canvas";
import { iCoord, iRect, CursorByBorderType, iPos, iRectProps } from "../types";
import Rect from "./Rect";
import { convertRectCoordinatesToPositive } from "../util/functions";

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
          console.log(
            "getActiveRect",
            this.checkHoveredRect({ x: e.offsetX, y: e.offsetY })
          );
          // if (e.offsetX === this.currentRect?.x) {
          //   canvas.style.cursor = "pointer";
          // } else if (canvas.style.cursor !== "crosshair") {
          //   canvas.style.cursor = "crosshair";
          // }
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

    const onMouseUp = (e: MouseEvent) => {
      this.mouseDown = false;
      if (this.currentRect) {
        const { x, y, w, h } = convertRectCoordinatesToPositive(
          this.currentRect
        );
        this.currentRect.x = x;
        this.currentRect.y = y;
        this.currentRect.w = w;
        this.currentRect.h = h;
      }
    };
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseout", onMouseUp);
  }
  private mouseDown = false;
  private rects: iRect[] = [];
  private currentRect: iRect | null = null;

  private createRect(rectParams: iRectProps) {
    this.rects.push(new Rect(rectParams));
    this.currentRect = this.rects[this.rects.length - 1];
    TaggingTool.drawRect(rectParams);
  }

  private redraw() {
    clearCanvas();
    this.rects.forEach(TaggingTool.drawRect);
  }

  private static drawRect({ x, y, h, w, color }: iRectProps) {
    ctx.fillStyle = `${color}20`;
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
    ctx.fill();
  }

  private cursorByBorder: {
    [index: string]: CursorByBorderType;
  } = {
    "start-start": { cursor: "nwse-resize", mouseAction: "resize" },
    "start-end": { cursor: "nesw-resize", mouseAction: "resize" },
    "start-none": { cursor: "ew-resize", mouseAction: "resize" },
    "end-start": { cursor: "nesw-resize", mouseAction: "resize" },
    "end-end": { cursor: "nwse-resize", mouseAction: "resize" },
    "end-none": { cursor: "ew-resize", mouseAction: "resize" },
    "none-start": { cursor: "ns-resize", mouseAction: "resize" },
    "none-end": { cursor: "ns-resize", mouseAction: "resize" },
    "none-none": { cursor: "pointer", mouseAction: "move" },
  };

  private checkHoveredRect({ x, y }: iPos): any {
    return this.rects.find(
      (rect) =>
        rect.x <= x &&
        x <= rect.x + rect.w &&
        rect.y <= y &&
        y <= rect.y + rect.h
    );
  }
}

export default TaggingTool;
