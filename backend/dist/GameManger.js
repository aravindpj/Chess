"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManger {
    constructor() {
        this.games = [];
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            console.log(message);
            if (message.type === messages_1.INIT_GAME) {
                console.log();
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    console.log("Game Started");
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find((game) => game.playerOne === socket || game.playerTwo === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.default = GameManger;
