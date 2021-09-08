const express = require('express')
const app=express()
const http=require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const httpPort = 3000

io.on('connection', socket=>{
  console.log(socket.id)
})

app.get('/', (request, response)=>{
  response.sendFile(__dirname + '/index.html')
})

server.listen(httpPort)
