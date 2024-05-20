"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
//initilize websocket port 
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        console.log(data.toString("utf-8"));
    });
    ws.send("Hai welcome to chess game");
});
