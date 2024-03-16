const { Server } = require("socket.io");
require('dotenv').config()
const port = process.env.PORT
const userId = {};
const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connect", (socket) => {
    if (socket.handshake.query.userId) {
        userId[socket.handshake.query.userId] = socket.id;
        console.log("Active Users:", userId);
    }


    socket.on("sendMessage", (message) => {
        console.log("receiveNewMessage");
        io.to(userId[message.receiver]).emit("receiveNewMessage", message);
    });
    // socket.on("sendRequest", (data) => {
    //   console.log("sendRequest", data);
    //   // io.to(userId[message.receiver]).emit("receiveNewMessage", message);
    // });
    socket.on("notification", (notification) => {
        console.log("receiveNewnotification", notification);
        io.to(userId[notification.friendId]).emit(
            "receiveNewnotification",
            notification
        );
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
        Object.keys(userId).forEach((el) => {
            if (userId[el] === socket.id) {
                delete userId[el];
                console.log("Active Users:", userId);
            }
        });
    });
});

io.listen(port, () => {
    console.log("Socket.IO server is running on port 3005");
});