const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(express.json());
app.use(cors({origin: "http://localhost:8080"}));
app.use("/api/users", userRoutes);
app.get("/api", (req, res) => {
    res.status(200).json({message: "API is running"});
});

app.use("/api/rss", require("./routes/rssRoutes"));

app.use(errorHandler);

module.exports = app;
