import axios from 'axios';

const PREFIJO = '/api/comments';

export default {
    especifico(usuario,imagen){
        axios.defaults.headers.common['Authorization']=usuario;
        return axios.get(`${PREFIJO}/${imagen._id}`);
    },
    nuevo(usuario,imagen,data){
        axios.defaults.headers.common['Authorization']=usuario;
        const datos = {
            comentario:data,
            id:imagen._id
        };
        return axios.post(`${PREFIJO}`,datos);
    }
}
