import { WebSocketServer } from "ws";
import GameManger from "./GameManger";

//initilize websocket port

const wss = new WebSocketServer({ port: 8080 });
const gameManger = new GameManger();
wss.on("connection", (ws) => {
  console.log("Log")
  gameManger.addUser(ws)
  ws.send("Hai welcome to chess game");
});
