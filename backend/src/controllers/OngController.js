const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async index(request, response) {

        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    
    },

    async create(request, response){

        const {name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();
    
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