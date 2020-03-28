const connection = require('../database/connection');

// Por conta da boa prática no MVC afirmar para deixar no máximo 5 métodos em uma classe, então em vez de deixar na 
// IncidentController.js, criou essa.
module.exports = {

    async index(request, response) {    

      const incidents = await connection('incidents').where('ong_id', request.headers.authorization).select('*');

      return response.json(incidents);

    }

}