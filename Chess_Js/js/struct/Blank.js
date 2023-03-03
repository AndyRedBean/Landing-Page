export default class Blank {
	constructor({ x, y }) {
		this.tag = '-';
		this.width = CANVAS_SCALE.width;
		this.height = CANVAS_SCALE.height;
		this.position = {
			x: x,
			y: y,
		};
		this.scaledPosition = {
			x: x * CANVAS_SCALE.width,
			y: y * CANVAS_SCALE.height,
		};
		this.isActive = false;
	}
	update() {}
	draw() {
		if (!this.isActive) return;
		if (!CANVAS_HINT) return;
		c.beginPath();
		c.arc(
			this.scaledPosition.x + this.width / 2,
			this.scaledPosition.y + this.height / 2,
			15,
			0,
			2 * Math.PI
		);
		c.stroke();
	}
}
