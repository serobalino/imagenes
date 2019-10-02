import axios from 'axios';

const PREFIJO = '/api/files';

export default {
    misFotos(usuario) {
        axios.defaults.headers.common['Authorization']=usuario;
        return axios.get(`${PREFIJO}/create`);
    },
    mundoFotos(usuario) {
        axios.defaults.headers.common['Authorization']=usuario;
        return axios.get(`${PREFIJO}`);
    },
    nueva(usuario,foto) {
        axios.defaults.headers.common['Authorization']=usuario;
        const data = new FormData();
        data.append('archivo', foto);
        return axios.post(`${PREFIJO}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Charset': ' utf-8'
            }
        });
    }
}
