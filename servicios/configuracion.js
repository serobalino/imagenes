import axios from "axios";
import {WSnackBar} from 'react-native-smart-tip';
import {AsyncStorage} from 'react-native';
import constantes from "../constants/constantes";
import * as servicios from "./index";

//axios.defaults.headers.common['Access-Control-Allow-Origin'] ="*";
//axios.defaults.headers.common['Accept'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['X-KEY'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['Authorization'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['Content-Type'] = "application/json";
//axios.defaults.params={data:{dt3:process.env.VUE_APP_API_KEY}};

axios.defaults.baseURL = constantes.backend;
//axios.defaults.headers.common['Authorization'] = recuperarToken();

axios.interceptors.request.use((config)=> {
    //servicios.login.recuperarUsuario();
    //console.log();
    //const value = recuperarToken();
    // if (value) {
    //     config.headers.common.Authorization = "hola";
    // }
    //console.log(config);
    return config;
});

axios.interceptors.response.use(
    response => response,
    respuestaErro
);

function respuestaErro(error){
    //console.disableYellowBox = true;
    if(error.response){
        if (error.response.data.message)
            WSnackBar.show({data: error.response.data.message});
    }else{
        WSnackBar.show({data: error.message});
    }
    return Promise.reject(error);
}
async function recuperarToken(configuracion) {
    let aux=null;
    aux=await AsyncStorage.getItem('token');
    if (aux) {
            config.headers.common.Authorization = aux;
    }
    console.log(aux);
    return configuracion;
}

