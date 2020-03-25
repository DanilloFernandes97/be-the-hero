// importa o módulo express(um mini framework de rotas,etc) para a variável express.
const express = require('express');
const routes = require('./routes'); // É preciso colocar "./" pro node saber que isso é um arquivo e não um pacote
const cors = require('cors'); // O módulo CORS determina quem vai conseguir acessar essa aplicação.

// Instancia a aplicação.
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Escuta a porta 3333, assim vai acessar a aplicação nessa porta.
app.listen(3333);