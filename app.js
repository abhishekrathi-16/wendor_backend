require("dotenv").config();
require("express-async-errors");
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const shopperRouter = require("./routes/shopperRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny")); // tracks the requests made by a user to the server along with other data
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

const allowedOrigins = ["http://localhost:3000","https://vendor-frontend-nine.vercel.app/"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/api", (req, res) => {
  // console.log(req.cookies)
  // console.log(req.signedCookies)
  res.send("Wendor Assignment Api");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/shopper", shopperRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      "0.0.0.0",
      console.log(`Server is listening on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = app;
