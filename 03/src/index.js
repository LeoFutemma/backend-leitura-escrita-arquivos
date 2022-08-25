const express = require('express');
const buscarUmEndereco = require('./controladores');

const app = express();

app.use(express.json());

app.get('/enderecos/:cep', buscarUmEndereco);

app.listen(3000);