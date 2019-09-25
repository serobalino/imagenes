import axios from 'axios';

const PREFIJO="/archivos";

export default {

    store(archivo){
        const data = new FormData();
        data.append('archivo', archivo);
        return axios.post(PREFIJO,data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Charset': ' utf-8'
            }
        });
    },
    index(){
        return axios.get(PREFIJO);
    }
};