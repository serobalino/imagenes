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
        if(aux){
            this.guardar(aux.data.token_type+" "+aux.data.access_token);
            return this.recuperarUsuario();
        }else{
            return false;
        }
    },
    async recuperarUsuario(){
        let valor = false;
        const value = await AsyncStorage.getItem('token');
        if (value) {
            axios.defaults.headers.common['Authorization'] = value;
            let usuario=null;
            const aux = await axios.get(`${PREFIJO}/user`);
            if(aux){
                await AsyncStorage.setItem('usuario',JSON.stringify(aux.data));
                usuario=aux.data;
                valor=true;
            }else{
                this.limpiar();
                valor=false;
            }
        }else{
            valor=false;
        }
        return valor;
    },
    async guardar(data){
        try {
            axios.defaults.headers.common['Authorization'] = data;
            await AsyncStorage.setItem('token', data);
        } catch (error) {
            console.log("error en guardar",error);
        }
    },
    async limpiar(){
        await AsyncStorage.clear();
    }
};
