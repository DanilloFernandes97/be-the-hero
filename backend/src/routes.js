const express = require('express');

// Desacopla o módulo de rotas nessa constante.
const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

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