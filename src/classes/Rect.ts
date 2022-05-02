class Rect implements iRect {
  constructor({ x, y, h, w }: iRect) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }
  public x: number;
  public y: number;
  public h: number;
  public w: number;
}

export default Rect;
