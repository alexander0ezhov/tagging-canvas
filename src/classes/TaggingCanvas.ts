import { canvas, ctx, clearCanvas } from "../util/canvas";
import {
  iRect,
  iPos,
  iRectProps,
  CursorPropsByPosType,
  TagMetaType,
} from "../types";
import Rect from "./Rect";
import {
  convertRectCoordinatesToPositive,
  getCursorPropsOnRect,
} from "../util/functions";
import { DEFAULT_COLOR, RECT_BORDER_WIDTH } from "../util/data";

class TaggingCanvas {
  constructor() {
    const moveWithMouseDown = (e: MouseEvent) => {
      if (!this.currentRect) return;
      const x = e.offsetX;
      const y = e.offsetY;
      switch (this.hoveredRectCursorProps?.mouseAction) {
        case "move":
          this.hoveredRect!.move(e.movementX, e.movementY);
          break;
        case "resize":
          this.hoveredRect!.resize(x, y, this.hoveredRectCursorProps.direction);
          break;
        default:
          this.currentRect.resize(x, y, "end-end");
          break;
      }
      this.redraw();
    };

    const moveWithoutMouseDown = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const hoveredRect = this.checkHoveredRect({ x, y });
      if (hoveredRect) {
        const cursorProps = getCursorPropsOnRect(hoveredRect, { x, y });
        this.hoveredRect = hoveredRect;
        this.hoveredRectCursorProps = cursorProps;
      } else {
        canvas.style.cursor = "crosshair";
        this.hoveredRect = null;
        this.hoveredRectCursorProps = null;
      }
    };

    const onMouseUp = () => {
      this.mouseDown = false;
      this.hoveredRect = null;
      this.hoveredRectCursorProps = null;
      if (this.currentRect) {
        const { x, y, w, h } = convertRectCoordinatesToPositive(
          this.currentRect
        );
        this.currentRect.x = x;
        this.currentRect.y = y;
        this.currentRect.w = w;
        this.currentRect.h = h;
      }
      this.redraw();
    };

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.mouseDown ? moveWithMouseDown(e) : moveWithoutMouseDown(e);
    });

    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.button !== 0) return;
      this.rects.forEach((rect) => (rect.active = false));
      this.mouseDown = true;
      if (this.hoveredRect) {
        this.hoveredRect.active = true;
      } else {
        this.createRect({
          x: e.offsetX,
          y: e.offsetY,
          h: 0,
          w: 0,
          color: this.activeTag.color,
          label: this.activeTag.label,
          active: true,
        });
      }
      this.redraw();
    });

    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseout", onMouseUp);
  }
  private mouseDown = false;
  private rects: iRect[] = [];
  private currentRect: iRect | null = null;
  private hoveredRect: iRect | null = null;
  private hoveredRectCursorProps: CursorPropsByPosType | null = null;
  private activeTag: TagMetaType = { color: DEFAULT_COLOR };
  private _disableLabels: boolean = false;

  get disableLabels() {
    return this._disableLabels;
  }

  set disableLabels(value) {
    this._disableLabels = value;
    this.redraw();
  }

  private createRect(rectParams: iRectProps) {
    this.rects.push(new Rect(rectParams));
    this.currentRect = this.rects[this.rects.length - 1];
    this.drawRect(rectParams);
  }

  private redraw() {
    clearCanvas();
    this.rects.forEach(this.drawRect.bind(this));
  }

  private drawRect({ x, y, h, w, color, active, label }: iRectProps) {
    ctx.fillStyle = `${color}20`;
    ctx.strokeStyle = color;
    ctx.setLineDash(active ? [] : [15, 5]);
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
    ctx.fill();
    ctx.setLineDash([]);
    if (label && (!this._disableLabels || active)) {
      ctx.fillStyle = color;
      ctx.font = "18px serif";
      ctx.fillText(label, x, y - 4);
    }
  }

  private checkHoveredRect({ x, y }: iPos): any {
    return this.rects.find(
      (rect) =>
        rect.x - RECT_BORDER_WIDTH <= x &&
        x <= rect.x + rect.w + RECT_BORDER_WIDTH &&
        rect.y - RECT_BORDER_WIDTH <= y &&
        y <= rect.y + rect.h + RECT_BORDER_WIDTH
    );
  }

  public setActiveTag = (tag: TagMetaType) => {
    this.activeTag = tag;
    const activeRect = this.rects.find((rect) => rect.active);
    if (activeRect) {
      activeRect.color = tag.color;
      activeRect.label = tag.label;
    }
    this.redraw();
  };

  public deleteRect = (id: string) => {
    this.rects = this.rects.filter((rect) => rect.id !== id);
    if (this.currentRect?.id === id) this.currentRect = null;
    this.redraw();
  };
}

export default TaggingCanvas;
