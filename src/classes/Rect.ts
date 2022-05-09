import { iRect, iRectProps } from "../types";

class Rect implements iRect {
  constructor({ x, y, h, w, color }: iRectProps) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.color = color;
  }
  public x: number;
  public y: number;
  public h: number;
  public w: number;
  public color: string;

  public resize(mouseX: this["x"], mouseY: this["y"], border = "end-end") {
    const handleStartCenter = () => {
      this.w = this.x + this.w - mouseX;
      this.x = mouseX;
    };
    const handleEndCenter = () => {
      this.w = mouseX - this.x;
    };
    const handleCenterStart = () => {
      this.h = this.y + this.h - mouseY;
      this.y = mouseY;
    };
    const handleCenterEnd = () => {
      this.h = mouseY - this.y;
    };
    switch (border) {
      case "start-center":
        handleStartCenter();
        break;
      case "end-center":
        handleEndCenter();
        break;
      case "center-start":
        handleCenterStart();
        break;
      case "center-end":
        handleCenterEnd();
        break;
      case "start-start":
        handleStartCenter();
        handleCenterStart();
        break;
      case "start-end":
        handleStartCenter();
        handleCenterEnd();
        break;
      case "end-start":
        handleEndCenter();
        handleCenterStart();
        break;
      case "end-end":
        handleEndCenter();
        handleCenterEnd();
        break;
    }
  }
}

export default Rect;
