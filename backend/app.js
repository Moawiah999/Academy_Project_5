const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./models/db");

const app = express();

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
app.use("/hotels", hotelsRouter);


// Notification
const notificationRouter = require("./routes/notifications");
app.use("/notifications", notificationRouter);

//reservationsRouter
const reservationsRoute = require('./routes/reservationsRoute')
app.use('/reservations',reservationsRoute)


app.listen(PORT, () => {
  console.log(`Server is run at https://localhost:${PORT}`);
});
