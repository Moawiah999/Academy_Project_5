const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const auth = require("./middlewares/auth");
const messageHandler = require("./controllers/message");
const example = require("./middlewares/messageExample");
require("dotenv").config();

require("./models/db");

const app = express();

//==========Sokit io
const io = new Server(8080, { cors: { origin: "*" } });
const clients = {};
io.use(auth);
io.on("connection", (socket) => {
  // console.log(socket.id);
  // console.log(socket.handshake.headers);
  socket.use(example);
  const user_id = socket.handshake.headers.user_id;
  clients[user_id] = { socket_id: socket.id, user_id };
  console.log(clients);

  messageHandler(socket, io);
  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });
  socket.on("disconnect", () => {
    console.log(socket.id);
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
    console.log(clients);
  });
});

//built-in middleware
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use(express.json());
//required userRoter
const userRouter = require("./routes/users");
app.use("/user", userRouter);
//required roleRoter
const roleRoter = require("./routes/roles");

app.use("/role", roleRoter);

//
const flightsRouter = require("./routes/flights");
app.use("/flights", flightsRouter);

const tour_packagesRouter = require("./routes/tourPagesRoute");
app.use("/Tour", tour_packagesRouter);

//==========Hotels==========
const hotelsRouter = require("./routes/hotels");
const userHotelRouter = require("./routes/userHotel");
app.use("/hotels", hotelsRouter);
app.use("/userHotel", userHotelRouter);

// Notification
const notificationRouter = require("./routes/notifications");
app.use("/notifications", notificationRouter);

//reservationsRouter
const reservationsRoute = require("./routes/reservationsRoute");
app.use("/reservations", reservationsRoute);

app.listen(PORT, () => {
  console.log(`Server is run at http://localhost:${PORT}`);
});
