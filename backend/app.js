const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const clienteRoutes = require("./rotas/clientes");

mongoose
  .connect(
    "mongodb+srv://fefebfs1:fefebfs@cluster0.t72pr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    
    console.log("Conexão NOK");
  });
  
app.use(bodyParser.json());
app.use("/imagens", express.static(path.join("backend/imagens")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/clientes", clienteRoutes);

module.exports = app;
