<template>
    <div>
        <div v-if="subiendo">
            <div class="alert alert-warning" role="alert" >
                <div class="spinner-border text-primary" role="status"></div> Procesando
            </div>
        </div>
        <div v-else>
            <div class="alert alert-info" role="alert" v-if="mensaje.estado===1">
                <i class="fa fa-info-circle"></i> <span v-html="mensaje.texto"></span>
            </div>
            <div class="alert alert-danger" role="alert" v-if="mensaje.estado===2" >
                <i class="fa fa-stop"></i> <span v-html="mensaje.texto"></span>
            </div>
            <div class="alert alert-success" role="alert" v-if="mensaje.estado===3">
                <i class="fa fa-thumbs-up"></i> <span v-html="mensaje.texto.message"></span>
            </div>
        </div>
        <b-form-file  browse-text="Examinar" v-model="archivo" :disabled="subiendo" placeholder="Elija un archivo"></b-form-file>
        <div class="text-center mt-3">
            <button class="btn btn-info" v-on:click="subir" :disabled="subiendo">Subir</button>
        </div>
    </div>
</template>

<script>
    import * as servicios from "../servicios";
    export default {
        name: "formulario",
        data:()=>({
            max: 10,
            subiendo:false,
            mensaje:{
                estado:1,
                texto:"Suba un archivo máximo de 10 megas",
            },
            archivo: null,
        }),
        methods:{
            subir:function(){
                if(this.archivo){
                    this.subiendo=true;
                    if(((this.archivo.size/1024)/1024)<=this.max){
                        servicios.archivos.store(this.archivo).then((response)=>{
                            this.subiendo=false;
                            this.mensaje.estado=3;
                            this.mensaje.texto=response.data;
                            this.archivo=null;
                        }).catch(error=>{
                            this.subiendo=false;
                            this.mensaje.estado=2;
                            this.mensaje.texto=error;
                        });
                    }else{
                        this.subiendo=false;
                        this.mensaje.estado=2;
                        this.mensaje.texto="Excede "+this.max+" megas";
                    }
                }
            }

        }
    }
</script>

<style scoped>

</style>