import {WebSocketServer} from "ws"

//initilize websocket port 

const wss = new WebSocketServer({port:8080})

wss.on("connection",(ws)=>{
  ws.on("message",(data)=>{
    console.log(data.toString("utf-8"))
  })
  ws.send("Hai welcome to chess game")
})