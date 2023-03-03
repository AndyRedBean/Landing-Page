export default class Piece {
	constructor({ tag, img }, { x, y }, boardMap) {
		this.boardMap = boardMap;
		this.tag = tag;
		this.img = img;
		(this.width = CANVAS_SCALE.width), (this.height = CANVAS_SCALE.height);
		this.position = {
			x: x,
			y: y,
		};
		this.scaledPosition = {
			x: x * CANVAS_SCALE.width,
			y: y * CANVAS_SCALE.height,
		};
	}
	possiblePiecesMove() {
		let move;
		switch (this.tag[1]) {
			case 'P':
				move = pawn(this.tag, this.position, this.boardMap);
				break;
			case 'N':
				move = knight(this.tag, this.position, this.boardMap);
				break;
			case 'B':
				move = bishop(this.tag, this.position, this.boardMap);
				break;
			case 'R':
				move = rook(this.tag, this.position, this.boardMap);
				break;
			case 'Q':
				move = queen(this.tag, this.position, this.boardMap);
				break;
			case 'K':
				move = king(this.tag, this.position, this.boardMap);
		}
		move != null
			? move.map((cor) => (this.boardMap[cor.y][cor.x].isActive = true))
			: '';
	}
	update() {
		this.scaledPosition = {
			x: this.position.x * CANVAS_SCALE.width,
			y: this.position.y * CANVAS_SCALE.height,
		};
	}
	draw() {
		c.imageSmoothingEnabled = false;
		c.drawImage(
			this.img,
			this.scaledPosition.x + 20,
			this.scaledPosition.y - this.img.height / 2,
			0.5 * this.width,
			1 * this.height
		);
	}
}
const pawn = (tag, { x, y }, boardMap) => {
	let move = [];
	let color = tag[0];
	if (color == 'w') {
		if (boardMap[y - 1][x].tag[0] == '-') move.push({ x: x, y: y - 1 });
		if (y == 6) {
			if (boardMap[y - 2][x].tag[0] == '-') move.push({ x: x, y: y - 2 });
		}
		let topRight = boardMap[y - 1][x + 1],
			topLeft = boardMap[y - 1][x - 1];

		// TODO: ATTACK ENEMy
		if (topRight) if (topRight.tag[0] == 'b') move.push({ x: x + 1, y: y - 1 });
		if (topLeft) if (topLeft.tag[0] == 'b') move.push({ x: x - 1, y: y - 1 });
	}
	if (color == 'b') {
		if (boardMap[y + 1][x].tag[0] == '-') move.push({ x: x, y: y + 1 });
		if (y == 1) {
			if (boardMap[y + 2][x].tag[0] == '-') move.push({ x: x, y: y + 2 });
		}
		let topRight = boardMap[y + 1][x + 1],
			topLeft = boardMap[y + 1][x - 1];

		// TODO: ATTACK ENEMy
		if (topRight) if (topRight.tag[0] == 'w') move.push({ x: x + 1, y: y + 1 });
		if (topLeft) if (topLeft.tag[0] == 'w') move.push({ x: x - 1, y: y + 1 });
	}
	return move;
};
const bishop = (tag, { x, y }, boardMap) => {
	let move = [];
	let color = tag[0];
	let stop = {
		topLeft: false,
		topRight: false,
		bottomLeft: false,
		bottomRight: false,
	};
	let i = 1,
		j = 1;
	for (let loop = 1; loop < 8; loop++) {
		let topLeftCor = x - j >= 0 && y - i >= 0,
			topRightCor = x + j <= 7 && y - i >= 0,
			bottomLeftCor = x - j >= 0 && y + i <= 7,
			bottomRightCor = x + j <= 7 && y + i <= 7;

		let topLeft = topLeftCor ? boardMap[y - i][x - j] : false,
			topRight = topRightCor ? boardMap[y - i][x + j] : false,
			bottomLeft = bottomLeftCor ? boardMap[y + i][x - j] : false,
			bottomRight = bottomRightCor ? boardMap[y + i][x + j] : false;

		if (topLeft && !stop.topLeft)
			if (topLeft.tag == '-') move.push(topLeft.position);
		if (topRight && !stop.topRight)
			if (topRight.tag == '-') move.push(topRight.position);
		if (bottomLeft && !stop.bottomLeft)
			if (bottomLeft.tag == '-') move.push(bottomLeft.position);
		if (bottomRight && !stop.bottomRight)
			if (bottomRight.tag == '-') move.push(bottomRight.position);

		if (topLeft) if (color == topLeft.tag[0]) stop.topLeft = true;
		if (topRight) if (color == topRight.tag[0]) stop.topRight = true;
		if (bottomLeft) if (color == bottomLeft.tag[0]) stop.bottomLeft = true;
		if (bottomRight) if (color == bottomRight.tag[0]) stop.bottomRight = true;

		// TODO: ATTACK ENEMY
		if (topLeft)
			if (color != topLeft.tag[0] && topLeft.tag != '-') {
				move.push(topLeft.position);
				stop.topLeft = true;
			}
		if (topRight)
			if (color != topRight.tag[0] && topRight.tag != '-') {
				move.push(topRight.position);
				stop.topRight = true;
			}
		if (bottomLeft)
			if (color != bottomLeft.tag[0] && bottomLeft.tag != '-') {
				move.push(bottomLeft.position);
				stop.bottomLeft = true;
			}
		if (bottomRight)
			if (color != bottomRight.tag[0] && bottomRight.tag != '-') {
				move.push(bottomRight.position);
				stop.bottomRight = true;
			}

		i++;
		j++;
	}
	return move;
};
const knight = (tag, { x, y }, boardMap) => {
	let move = [];
	let color = tag[0];

	let i = 1,
		j = 2;
	for (let loop = 0; loop < 2; loop++) {
		let newX = x - i,
			newY = y - j;
		if (newY >= 0 && newX >= 0) {
			let board = boardMap[newY][newX];
			if (board.tag == '-') move.push(board.position);
			// TODO: ATTACK ENEMY
		}

		newX = x + i;
		if (newY >= 0 && newX <= 7) {
			let board = boardMap[newY][newX];
			if (board.tag == '-') move.push(board.position);
		}

		newX = x - i;
		newY = y + j;
		if (newY <= 7 && newX >= 0) {
			let board = boardMap[newY][newX];
			if (board.tag == '-') move.push(board.position);
		}

		newX = x + i;
		if (newY <= 7 && newX <= 7) {
			let board = boardMap[newY][newX];
			if (board.tag == '-') move.push(board.position);
		}
		i++;
		j--;
	}
	return move;
};
const rook = (tag, { x, y }, boardMap) => {
	let move = [];
	let color = tag[0];

	let stop = {
		left: false,
		right: false,
		top: false,
		bottom: false,
	};
	let i = 1;
	for (let loop = 1; loop < 8; loop++) {
		let leftCor = x - i >= 0,
			rightCor = x + i <= 7,
			topCor = y - i >= 0,
			bottomCor = y + i <= 7;

		let left = leftCor ? boardMap[y][x - i] : false,
			right = rightCor ? boardMap[y][x + i] : false,
			top = topCor ? boardMap[y - i][x] : false,
			bottom = bottomCor ? boardMap[y + i][x] : false;

		if (left && !stop.left) {
			if (left.tag == '-') move.push(left.position);
			if (color != left.tag[0] && left.tag[0] != '-') {
				move.push(left.position);
				stop.left = true;
			}
		}
		if (right && !stop.right) {
			if (right.tag == '-') move.push(right.position);
			if (color == right.tag[0]) stop.right = true;
			if (color != right.tag[0] && right.tag != '-') {
				move.push(right.position);
				stop.right = true;
			}
		}
		if (top && !stop.top) {
			if (top.tag == '-') move.push(top.position);
			if (color != top.tag[0] && top.tag != '-') {
				move.push(top.position);
				stop.top = true;
			}
			if (color == top.tag[0]) stop.top = true;
		}
		if (bottom && !stop.bottom) {
			if (bottom.tag == '-') move.push(bottom.position);
			if (color == bottom.tag[0]) stop.bottom = true;
			if (color != bottom.tag[0] && bottom.tag != '-') {
				move.push(bottom.position);
				stop.bottom = true;
			}
		}

		i++;
	}
	return move;
};
const queen = (tag, { x, y }, boardMap) => {
	let move = [];
	move = [...rook(tag, { x, y }, boardMap)];
	move = [...move, ...bishop(tag, { x, y }, boardMap)];
	return move;
};

const king = (tag, { x, y }, boardMap) => {
	let move = [];
	let color = tag[0];
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (y + i <= 7 && y + i >= 0 && x + j <= 7 && x + j >= 0) {
				if (y == 0 && x == 0) continue;
				let board = boardMap[y + i][x + j];
				if (board.tag == '-') {
					move.push(board.position);
				}
				if (color == board.tag[0] && board.tag != '-') {
				}
				if (color != board.tag && board.tag != '-') {
				}
			}
		}
	}
	return move;
};
