"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManger_1 = __importDefault(require("./GameManger"));
//initilize websocket port
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManger = new GameManger_1.default();
wss.on("connection", (ws) => {
    console.log("Log");
    gameManger.addUser(ws);
    ws.send("Hai welcome to chess game");
});
