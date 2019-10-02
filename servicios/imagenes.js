import axios from 'axios';

const PREFIJO = '/api/files';

export default {
    misFotos(usuario) {
        axios.defaults.headers.common['Authorization']=usuario;
        return axios.get(`${PREFIJO}/create`);
    },
    mundoFotos() {
        return axios.get(`${PREFIJO}`);
    }
}
