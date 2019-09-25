import axios from 'axios';

const PREFIJO="/comentarios";

export default {

    store(data) {
        const util = {
            comentario:data.texto,
            id:data.obj.code_im,
        };
        return axios.post(PREFIJO, util);
    },
    show(data) {
        return axios.get(`${PREFIJO}/${data.code_im}`, data);
    },
}