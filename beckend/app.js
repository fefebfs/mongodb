const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Cliente = require("./models/cliente");
const mongoose = require("mongoose");
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://fefebfs:gosmapreta1@cluster0.t72pr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });
const clientes = [
  {
    id: "1",
    nome: "Jose",
    fone: "11223344",
    email: "jose@email.com",
  },
  {
    id: "2",
    nome: "Jaqueline",
    fone: "22112211",
    email: "jaqueline@email.com",
  },
];
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.post("/api/clientes", (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email,
  });
  cliente.save();
  console.log(cliente);
  res.status(201).json({ mensagem: "Cliente inserido" });
});

//app.use((req, res, next) => {
// console.log("Chegou uma requisição");
// next();
//});

app.get("/api/clientes", (req, res, next) => {
  Cliente.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents,
    });
  });
});
module.exports = app;
