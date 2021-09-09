const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const httpPort = 3000

io.on('connection', (socket) => {
  const timestamp = new Date()
  console.log('new connection ', socket.id)
  socket.broadcast.emit('newMessage', {
    time: timestamp,
    msg: socket.id + ' joined'
  })

  socket.on('message', (message) => {
    io.emit('newMessage', { time: timestamp, msg: socket.id + ': ' + message })
  })
})

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

server.listen(httpPort)
