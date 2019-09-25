import axios from "axios";


//axios.defaults.headers.common['Access-Control-Allow-Origin'] ="*";
//axios.defaults.headers.common['Accept'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['X-KEY'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['Authorization'] = process.env.VUE_APP_API_KEY;
//axios.defaults.headers.common['Content-Type'] = "application/json";
//axios.defaults.params={data:{dt3:process.env.VUE_APP_API_KEY}};

axios.defaults.baseURL = process.env.REACT_APP_URL_API;

axios.interceptors.request.use((config)=> {
    if(config.data)
        config.data.dt19=process.env.REACT_APP_API_KEY;
    else
        config.data={dt19:process.env.REACT_APP_API_KEY};
    return config;
});

axios.interceptors.response.use(
    response => response,
    respuestaErro
);

function respuestaErro(error){
    if(error.response){
        if (error.response.data.Message)
            console.log(error.response.data.Message)
    }else{
        console.log(error.message);
    }
    return Promise.reject(error);
}
