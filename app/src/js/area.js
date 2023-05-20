export default class Area {
  constructor(width, height, x1, y1) {
    this.width = width;
    this.height = height;
    this.x1 = x1;
    this.y1 = y1;
  }
  get x2() {
    return this.x1 + this.width;
  }
  get y2() {
    return this.y1 + this.height;
  }

  setPosition(positionX, positionY) {
    this.x1 = positionX;
    this.y1 = positionY;
  }

  containsCord(positionX, positionY) {
    return this.x1 <= positionX && positionX <= this.x2 && this.y1 <= positionY && positionY <= this.y2;
  }

  containsArea(area) {
    return (
      this.containsCord(area.x1, area.y1) ||
      this.containsCord(area.x1, area.y2) ||
      this.containsCord(area.x2, area.y1) ||
      this.containsCord(area.x2, area.y2)
    );
  }
}
