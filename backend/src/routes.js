const express = require('express');

// Desacopla o módulo de rotas nessa constante.
const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// ****** Tipos de requisições ************
// * Query Params:  Parâmetros nomeados enviados na rota após o símbolo "?" (usado para filtros, paginação, etc).
// * Router Params: Parâmetros utilizados para identificar recursos. exemplos: "/users", "/users/:id"                                                                                                                       
// * Request Body: Corpo da requisição utilizado para criar ou alterar recursos.

// ****** Acessando as requisições ********
// * Query Params: const params = request.query;                                                          
// * Route Params: const params = request.params;
// * Request Body: const params = request.body; (Vc precisa definir o que ele vai receber, JSON usando o framework express por exemplo precisa ser: app.use(express.json());)

// *** Ongs ***

routes.post('/ongs', OngController.create);

routes.get('/ongs', OngController.index);

// *** Incidents ***

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', IncidentController.delete);

// *** ProfileController ***

routes.get('/profile', ProfileController.index);

// *** SectionController ***

// Passsa o post para dar a entender que quer criar uma sessão.
routes.post('/sessions', SessionController.create);

// Permite exporta essa variável para outros arquivos.
module.exports = routes;