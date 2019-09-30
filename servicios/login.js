import axios from 'axios';
import constantes from "../constants/constantes";
import { AsyncStorage } from 'react-native';

const PREFIJO = '/api';

export default {
    async iniciarSesion(data) {
        const objeto = {
            grant_type: "password",
            client_id: constantes.token.id,
            client_secret: constantes.token.token,
            username:data.usuario,
            password:data.contrasena,
            scope:""
        };
        const aux = await axios.post(`/oauth/token`, objeto);
        this.guardar(aux.data.token_type+" "+aux.data.access_token);
        return this.recuperarUsuario();
        //console.log(aux.data)
    },
    async recuperarUsuario(){
        const usuario = axios.get(`${PREFIJO}/user`);
        AsyncStorage.setItem('usuario',usuario.data);
        return usuario;
    },
    async guardar(data){
        try {
            axios.defaults.headers.common['Authorization'] = data;
            await AsyncStorage.setItem('token', data);
        } catch (error) {
            console.log(error);
        }
    }
};
