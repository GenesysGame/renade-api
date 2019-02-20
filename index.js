// index.js 
// 20.02.2019
// Renage API. GenesysGame

const io = require('socket.io').listen(8081);

io.sockets.on('connection', function(socket) {
    let id = socket.id.substr(0, 5);
    let time = (new Date()).toLocaleTimeString();

    console.log('connected ' + time + ': ' + id);

    socket.json.send({
        event: 'connected',
        name: id,
        time: time
    });

    socket.broadcast.json.send({
        event: 'userJoined',
        name: id,
        time: time
    });

    socket.on('message', function(msg) {
        let time = (new Date()).toLocaleTimeString();

        socket.json.send({
            event: 'messageSent',
            name: id,
            text: msg,
            time: time
        });

        socket.broadcast.json.send({
            event: 'messageReceived',
            name: id,
            text: msg,
            time: time
        });
    })

    socket.on('disconnect', function() {
        let time = (new Date()).toLocaleTimeString();
        io.sockets.json.send({
            event: 'userSplit',
            name: id,
            time: time
        });
    })

});

