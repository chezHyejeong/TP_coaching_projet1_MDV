const express = require("express");
const cors = require("cors");

const hostname = "0.0.0.0";
const port = 3002;

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Importing routes
const birthdayRoute = require("./api/routes/birthdayRoute");
const importRoutes = require("./api/routes/importRoutes");
const quoteRoute = require("./api/routes/quoteRoute");

// Registering routes
server.use("/api", importRoutes);
server.use("/api", birthdayRoute);
server.use("/api", quoteRoute);

server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
