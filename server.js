const express = require("express");
const cookieParser = require("cookie-parser");
const { authRoutes } = require("./routes/authRoutes.js");
const { gameRoutes } = require("./routes/gameRoutes");
const { profileRoutes } = require("./routes/profileRoutes");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const mongoURI = `mongodb+srv://baggers:bubblebath9@matt-project.zbj1q.mongodb.net/english-session?retryWrites=true&w=majority`;
const { isAuth } = require("./middlewear/authMiddlewear");
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("connected"));

// const store = new MongoDBSession({
//   uri: mongoURI,
//   collection: "session",
// });

const app = express();
app.use(cookieParser());

app.use(express.json());
const corsOptions = {
  exposedHeaders: "authorization",
  credentials: true,
  origin: "https://create-react-app-games.herokuapp.com/",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
};
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/testroute", (req, res) => {
  res.send("test route");
});

app.use(authRoutes);
app.use(isAuth, gameRoutes);
app.use(isAuth, profileRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);

module.exports = app;
