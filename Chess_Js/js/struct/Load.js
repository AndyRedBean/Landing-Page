const loadImage = (src) =>
	new Promise((resolve) => {
		const img = new Image();
		img.addEventListener('load', resolve(img));
		img.src = src;
	});
export default class Load {
	constructor() {}
	async loadData() {
        /**
         * p : Pawn
         * n : Knight
         * b : Bishop
         * r : Rook
         * q : Queen
         * k : Knight
         */
		const whitePiecesImg = {
			P: await loadImage(`../../assets/W_Pawn.png`),
			N: await loadImage(`../../assets/W_Knight.png`),
			B: await loadImage(`../../assets/W_Bishop.png`),
			R: await loadImage(`../../assets/W_Rook.png`),
			Q: await loadImage(`../../assets/W_Queen.png`),
			K: await loadImage(`../../assets/W_King.png`),
		};
		const blackPiecesImg = {
			P: await loadImage(`../../assets/B_Pawn.png`),
			N: await loadImage(`../../assets/B_Knight.png`),
			B: await loadImage(`../../assets/B_Bishop.png`),
			R: await loadImage(`../../assets/B_Rook.png`),
			Q: await loadImage(`../../assets/B_Queen.png`),
			K: await loadImage(`../../assets/B_King.png`),
		};
		return { whitePiecesImg, blackPiecesImg };
	}
}
