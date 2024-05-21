import { Chess } from "chess.js"
import WebSocket from "ws"
export class Game{
    public playerOne:WebSocket
    public playerTwo:WebSocket
    private board:Chess
    private moves=[]
    private startTime:Date

    constructor(playerOne:WebSocket,playerTwo:WebSocket){
       this.playerOne=playerOne
       this.playerTwo=playerTwo
       this.board=new Chess()
       this.moves=[]
       this.startTime=new Date()
    }
}