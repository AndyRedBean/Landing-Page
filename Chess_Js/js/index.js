const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = canvas;
const CANVAS_SCALE = {
	width: CANVAS_WIDTH / 8,
	height: CANVAS_HEIGHT / 8,
};
const CANVAS_HINT = true;
// c.scale(CANVAS_SCALE.width, CANVAS_SCALE.height)
