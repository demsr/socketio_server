const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const io = new Server({
  /* options */
  path: "/ws",
});

io.on("connection", (socket) => {
  console.log(`New socket connection: ${socket.id}`);

  socket.on("ping", () => {
    console.log("client sent ping");
    socket.emit("pong", "hello client");
  });

  socket.on("message", (message) => {
    console.log(message);

    setTimeout(() => {
      socket.emit("received", { UID: message.UID });
    }, 2000);

    setTimeout(() => {
      socket.emit("read", { UID: message.UID });
    }, 5000);
    setTimeout(() => {
      socket.emit("message", {
        UID: uuidv4(),
        Text: `Du hast mir vor 10s folgendes geschrieben: ${message.Text}`,
        Sender: "Server",
      });
    }, 10000);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Lost socket ${socket.id} because: ${reason}`);
  });
});

io.listen(4000);
