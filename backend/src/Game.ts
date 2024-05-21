import { Chess } from "chess.js"
import WebSocket from "ws"
export class Game{
    public playerOne:WebSocket
    public playerTwo:WebSocket
    private board:Chess
    private startTime:Date

    constructor(playerOne:WebSocket,playerTwo:WebSocket){
       this.playerOne=playerOne
       this.playerTwo=playerTwo
       this.board=new Chess()
       this.startTime=new Date()
    }

    makeMove(socket:WebSocket,move:any){
        try {
            this.board.move(move)
        } catch (error) {
            console.log(error)
        }
        
    }
}