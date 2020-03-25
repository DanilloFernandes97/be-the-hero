const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

      // Array de paginaçao. 
      const {page = 1} = request.query; 
 
      // limit(5) -> limite a consulta pra 5 registros. 
      // offset(5) -> Pula 5 registros por páginas(a partir do 5 registros, etc).
      // Para passar a página use: http://localhost:3333/incidents?page=2, por exemplo.
      // Coloque isso no arquivo de anotações depois.
      const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // faz o join com a tabela ongs
            .limit(5)
            .offset( (page - 1) * 5) // Pula de 5 em 5, essa conta acontece pela primeira página ser 0 e depois vai incrementando
            .select(['incidents.*', // Como o nome dos atributos das entidades se sobrepoem (no caso o id), eu defino quais campos eu quero em um array.
                     'ongs.name', 
                     'ongs.email', 
                     'ongs.whatsapp', 
                     'ongs.city', 
                     'ongs.uf']);  

      // Faz assim pois count retorna um array, count[0] também daria certo.      
      const [count] = await connection('incidents').count();
        
      // Cria um campo no header com o total de registros.
      // count['count(*)'] -> Acessa o valor do field do objeto count dentro da array acima.
      response.header('X-Total-Count', count['count(*)']);

      return response.json(incidents);

    },

    async create(request, response) {

        const {title, description, value} = request.body;

        // Pega o id da ong pelo header com o nome de authorization.
        const ong_id = request.headers.authorization;

        // O método insert vai retornar um array de ids, nesse caso será somente um, então só passo esse valor.
       const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id
        });

        // passa dentro de um objeto para criar o json com o campo id e o valor.
        return response.json({ id });

    },

    async delete(request, response) {

        const { id } = request.params;

        const ong_id = request.headers.authorization;

        // Valida se o id passado é realmente da ong logada.
        // Depois teste -> connection('incidents').select('ong_id').where('id', id).first();
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id != ong_id) {

            console.log('id incident ' + id);
            console.log('id ong ' + incident.ong_id);            
            return response.status(401).json({error: 'Operation not permitted'});

        }

        // Depois teste -> connection('incidents').delete().where('id', id);
        await connection('incidents').where('id', id).delete();

        // send() -> retorna a requisição sem corpo algum, vazia.
        return response.status(204).send();

    }

}