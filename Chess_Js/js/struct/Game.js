import Blank from './Blank.js';
import Piece from './Piece.js';

/*
 * Pawn
 * Knight
 * Bishop
 * Rook
 * Queen
 * King
 */
export default class Game {
	constructor({ whitePiecesImg, blackPiecesImg }) {
		this.w = whitePiecesImg;
		this.b = blackPiecesImg;
		this.boardMap = [
			['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
			['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
			['-', '-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-', '-'],
			['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
			['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
		].map((row, y) =>
			row.map((col, x) => {
				let tag = col,
					img;
				if (col[0] == 'b') img = this.b[col[1]];
				else img = this.w[col[1]];

				return tag != '-'
					? new Piece({ tag, img }, { x, y })
					: new Blank({ x, y });
			})
		);
		this.selectedPiece = null;
		this.listener();
		this.init();
	}
	listener() {
		canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
	}
	init() {
		this.boardMap.map((row) =>
			row.map((col) => (col.boardMap = this.boardMap))
		);
	}
	update() {
		this.init();
		this.drawBackground();
		this.boardMap.map((row) => row.map((p) => p.draw()));
		this.boardMap.map((row) => row.map((p) => p.update()));
		this.boardMap.map((row) =>
			row.map((p) => (p == this.selectedPiece ? p.possiblePiecesMove() : ''))
		);
	}
	drawBackground() {
		this.boardMap.map((row, y) =>
			row.map((_, x) => {
				c.fillStyle = (x + y) % 2 == 0 ? '#FAFAFA' : '#E6E6E6';
				c.fillRect(
					x * CANVAS_SCALE.width,
					y * CANVAS_SCALE.height,
					CANVAS_SCALE.width,
					CANVAS_SCALE.height
				);
			})
		);
	}
	reset() {
		this.boardMap.map((row) =>
			row.map((p) => (p.tag == '-' ? (p.isActive = false) : ''))
		);
	}
	mouseDown(e) {
		if (this.selectedPiece) this.movePiece(e);
		this.reset();
		const { offsetX, offsetY } = e;
		let select;
		this.boardMap.map((row) => {
			let filteredRow = row.filter(
				(col) =>
					col.tag != '-' &&
					col.scaledPosition.x < offsetX &&
					col.scaledPosition.x + col.width > offsetX &&
					col.scaledPosition.y < offsetY &&
					col.scaledPosition.y + col.height > offsetY
			);
			if (filteredRow.length !== 0) select = filteredRow[0];
		});
		this.selectedPiece = select;
	}
	movePiece(e) {
		const { offsetX, offsetY } = e;
		let select;
		this.boardMap.map((row) => {
			let filteredRow = row.filter(
				(col) =>
					col.tag == '-' &&
					col.isActive &&
					col.scaledPosition.x < offsetX &&
					col.scaledPosition.x + col.width > offsetX &&
					col.scaledPosition.y < offsetY &&
					col.scaledPosition.y + col.height > offsetY
			);
			if (filteredRow.length !== 0) select = filteredRow[0];
		});
		if (!select) return;
		let { x, y } = select.position;
		let { x: oldX, y: oldY } = this.selectedPiece.position;
		this.boardMap[oldY][oldX] = new Blank(this.selectedPiece.position);
		this.boardMap[y][x] = this.selectedPiece;
		this.selectedPiece.position = { x, y };
	}
}
