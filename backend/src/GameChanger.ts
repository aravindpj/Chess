import WebSocket from "ws";
import { INIT_GAME } from "./messages";
import { Game } from "./Game";
export default class GameChanger {
  private games: Game[];
  private users: WebSocket[];
  private pendingUser: WebSocket;
  conatructor() {
    this.games = [];
    this.users = [];
    
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message: any = JSON.stringify(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          
          this.games.push(game)
          this.pendingUser = socket;
        } else {
          this.pendingUser = socket;
        }
      }
    });
  }
}
