import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAMEOVER } from "./messages";
export class Game {
  public playerOne: WebSocket;
  public playerTwo: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount: any;
  constructor(playerOne: WebSocket, playerTwo: WebSocket) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.board = new Chess();
    this.startTime = new Date();
    this.moveCount = 0;
  }

  makeMove(socket: WebSocket, move: any) {
    // when player make second move both condition check , and validate socket 
    if (this.moveCount % 2 == 0 && socket !== this.playerOne) {
      console.log(this.board.turn())
      return;
    }
    if (this.moveCount % 2 == 1 && socket !== this.playerTwo) {
      console.log(this.board.turn())
      return;
    }
    try {
      this.board.move(move);
    } catch (error) {
      console.log(error);
      return;
    }
    
    if (this.board.isGameOver()) {
      this.playerOne.send(
        JSON.stringify({
          type: GAMEOVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.playerTwo.send(
        JSON.stringify({
          type: GAMEOVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
    }
    
    // is that first playersend message to second player
    if(this.moveCount % 2==0){
      this.playerTwo.send(JSON.stringify({
        type:"Move",
        player:this.board.turn() === "w" ? "black" : "white",
        payload:move
      }))
    }else{
      this.playerOne.send(JSON.stringify({
        type:"Move",
        player:this.board.turn() === "w" ? "black" : "white",
        payload:move
      }))
    }
    this.moveCount++;
  }
}
