class Rect implements iRect {
  constructor({ x, y, h, w }: iCoord) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }
  public x: number;
  public y: number;
  public h: number;
  public w: number;

  public resize(mouseX: this["x"], mouseY: this["y"], border = "sw") {
    switch (border) {
      case "sw":
        this.w = mouseX - this.x;
        this.h = mouseY - this.y;
        break;
    }
  }
}

export default Rect;
