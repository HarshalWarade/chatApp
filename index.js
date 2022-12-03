const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } });
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const port = 5000;

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});
server.listen(port, (err) => {
    console.log('connected')
});
io.on('connection', (socket) => {
    socket.on("message", (data) => {
        socket.broadcast.emit('message', data)
    })
})

