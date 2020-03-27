import axios from 'axios';

const api = axios.create( {

    // ip da máquina aonde roda o node é claro, rs.
    baseURL: 'http://10.0.0.109:3333',

} );

export default api;