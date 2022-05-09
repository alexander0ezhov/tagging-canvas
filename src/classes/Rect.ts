import { iRect, iRectProps } from "../types";
import { BROWSER_ZOOM } from "../util/data";

class Rect implements iRect {
  constructor({ x, y, h, w, color, active }: iRectProps) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.color = color;
    this.active = active;
  }
  public x;
  public y;
  public h;
  public w;
  public color;
  public active;

  public move(movementX: this["x"], movementY: this["y"]) {
    this.x = this.x + movementX * BROWSER_ZOOM;
    this.y = this.y + movementY * BROWSER_ZOOM;
  }

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
