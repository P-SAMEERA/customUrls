const express = require("express");
const { db } = require("./connect");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/url.route"); // Import the router
const { corsOptions } = require("./config/cors.config");
const cors = require("cors");
const path = require("path"); // Import path module

dotenv.config();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 8001;
const dbURL = process.env.MONGO_URL;
console.log("HOST :", dbURL);

db(dbURL)
  .then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "32kb", extended: true }));
app.use("/api/url", urlRouter); // Use the imported router

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./build")));

// For any other routes, serve the React app's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
