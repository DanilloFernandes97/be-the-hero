const request = require('supertest');

const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('ONG', () => {
	
	beforeEach( async () => {

		// Como isso pode demorar eu passo o async await pra não sair disso antes de terminar.

		await connection.migrate.rollback(); // Sempre zera o banco de dados pra executar o teste.

		await connection.migrate.latest();

	});

	// Destruo a conexão para evitar warnings nos testes.
	afterAll(async () => {

		await connection.destroy();

	});

	it('should be able to create a new ONG', async () => {
		
		const response = await request(app)
		.post('/ongs')
		.send({
			
			name: "APOEMA",
			email: "contato@apoma.com.br",
			whatsapp: "62986314447",
			city: "Itapuranga",
			uf: "GO"                               
			
		});
		
		expect(response.body).toHaveProperty('id');

		expect(response.body.id).toHaveLength(8);

	});
	
}); 
