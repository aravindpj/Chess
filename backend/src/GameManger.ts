import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";
export default class GameManger {
  private games: Game[];
  private users: WebSocket[];
  private pendingUser: WebSocket | null;
  constructor() {
    this.games = [];
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message: any = JSON.parse(data.toString());
      console.log(message)
      if (message.type === INIT_GAME) {
        console.log()
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          console.log("Game Started")
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.playerOne === socket || game.playerTwo === socket
        );
        if (game) {
          game.makeMove(socket, message.move);
        }
      }
    });
  }
}
