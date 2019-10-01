import axios from "axios";
import {WSnackBar} from 'react-native-smart-tip';
// import {AsyncStorage} from 'react-native';
import constantes from "../constants/constantes";

//axios.defaults.headers.common['Access-Control-Allow-Origin'] ="*";
//axios.defaults.headers.common['Accept'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['X-KEY'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['Authorization'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['Content-Type'] = "application/json";
//axios.defaults.params={data:{dt3:process.env.VUE_APP_API_KEY}};

axios.defaults.baseURL = constantes.backend;

axios.interceptors.request.use((config)=> {
    // const value = AsyncStorage.getItem('token');
    // if (value !== null) {
    //     axios.defaults.headers.common['Authorization'] = value;
    // }
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

