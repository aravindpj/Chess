import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";
export default class GameChanger {
  private games: Game[];
  private users: WebSocket[];
  private pendingUser: WebSocket | null;
  constructor() {
    this.games = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message: any = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if(message.type===MOVE){
         const game=this.games.find(game=>game.playerOne===socket || game.playerTwo===socket)
         if(game){
           game.makeMove(socket,message.move)
         }
      }
    });
  }
}
