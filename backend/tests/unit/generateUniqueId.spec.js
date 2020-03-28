const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate an unique id', () => { // Cada um dos teste utiliza essa função it e expect (o que se espera)

    const id = generateUniqueId();

    expect(id).toHaveLength(8);

  } ); 
}
);