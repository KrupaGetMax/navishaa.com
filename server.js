const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
const allowedOrigins = [
  process.env.LOCAL_ORIGIN,
  process.env.PRODUCTION_ORIGIN,
  // process.env.NETLIFY_ORIGIN,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Import routes
const submitFormRoute = require("./routes/submitForm");
const sendEmailRoute = require("./routes/sendEmail");

// Use routes
app.use("/submit-form", submitFormRoute);
app.use("/send-email", sendEmailRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
