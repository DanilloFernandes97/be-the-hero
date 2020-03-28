const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys( { 
        name: Joi.string().required(), // required() = Not Null
        email: Joi.string().required().email(), // email() = Vai validar o formato de email
        whatsapp: Joi.string().required().min(10).max(11), // min(10) mínino 10, max(11) máximo 11
        city: Joi.string().required(),
        uf: Joi.string().required().length(2) // O tamanho dele é dois e pronto.
    })
}), OngController.create);

routes.get('/ongs', OngController.index);

// *** Incidents ***

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({ 
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate( {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })    
} ), IncidentController.delete);

// *** ProfileController ***

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()}
    ).unknown()
}), ProfileController.index);

// *** SectionController ***

// Passsa o post para dar a entender que quer criar uma sessão.
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

// Permite exporta essa variável para outros arquivos.
module.exports = routes;