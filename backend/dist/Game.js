"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.moveCount = 0;
    }
    makeMove(socket, move) {
        // when player make second move both condition check , and validate socket 
        if (this.moveCount % 2 == 0 && socket !== this.playerOne) {
            console.log(this.board.turn());
            return;
        }
        if (this.moveCount % 2 == 1 && socket !== this.playerTwo) {
            console.log(this.board.turn());
            return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        if (this.board.isGameOver()) {
            this.playerOne.send(JSON.stringify({
                type: messages_1.GAMEOVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.playerTwo.send(JSON.stringify({
                type: messages_1.GAMEOVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
        }
        // is that first playersend message to second player
        if (this.moveCount % 2 == 0) {
            this.playerTwo.send(JSON.stringify({
                type: "Move",
                player: this.board.turn() === "w" ? "black" : "white",
                payload: move
            }));
        }
        else {
            this.playerOne.send(JSON.stringify({
                type: "Move",
                player: this.board.turn() === "w" ? "black" : "white",
                payload: move
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
