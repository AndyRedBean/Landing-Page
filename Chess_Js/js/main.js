import Game from "./struct/Game.js";
import Load from "./struct/Load.js";

let game;
async function main(){
    const load = new Load();
    const loaddedData = await load.loadData();
    game = new Game(loaddedData);
    animate()
}
function animate(){
    game.update();
    requestAnimationFrame(animate)
}
main();