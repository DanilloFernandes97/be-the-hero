const connection = require('../database/connection');
const crypto = require('crypto');


// ****** Tipos de requisições ************
// * Query Params:  Parâmetros nomeados enviados na rota após o símbolo "?" (usado para filtros, paginação, etc).
// * Router Params: Parâmetros utilizados para identificar recursos. exemplos: "/users", "/users/:id"                                                                                                                       
// * Request Body: Corpo da requisição utilizado para criar ou alterar recursos.

// ****** Acessando as requisições ********
// * Query Params: const params = request.query;                                                          
// * Route Params: const params = request.params;
// * Request Body: const params = request.body; (Vc precisa definir o que ele vai receber, JSON usando o framework express por exemplo precisa ser: app.use(express.json());)


module.exports = {

    async index(request, response) {

        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    
    },

    async create(request, response){

        const {name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); // 4 caracteres.    
    
        // Await faz o fluxo esperar a inserção no banco de dados para continuar e ai sim dar a resposta, lembre de deixar a função
        // assíncrona também: async (request, response) => {})/
        await connection('ongs').insert({
            id,
            name, 
            email, 
            whatsapp, 
            city, 
            uf
        });
    
        return response.json({ id });

    }

}