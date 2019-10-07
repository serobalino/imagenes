<template>
    <div >
        <cuadro v-for="item in listado" :key="item.code_im" :objeto="item"/>
        <div v-if="id">
            <div class="form-group">
                <textarea class="form-control"  rows="3" v-model="formulario.texto" ></textarea>
            </div>
            <button type="button" class="btn btn-primary" v-on:click="subirComentario">Enviar</button>
            <div class="actionBox">
                <ul class="commentList">
                    <li v-for="(item,index) in comentarios" :class="index%2 ? 'bg-light' : ''" >
                        <div class="commenterImage">
                            <div></div>
                        </div>
                        <div class="commentText">
                            <p>{{item.texto_co}}</p>
                            <span class="date sub-text"><b>{{item.autor.name}}</b> {{item.created_at}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import * as servicios from "../servicios";
    export default {
        name: "fotos",
        data:()=>({
            listado:[],
            comentarios:[],
            formulario:{
                texto:null,
                obj:{
                    code_im:null
                }
            }
        }),
        props:{
            id:{
                required: false,
                default: null
            }
        },
        methods:{
            cargarFotos:function(){
                if(this.id){
                    this.formulario.obj = JSON.parse(this.id);
                    this.listado=[this.formulario.obj];
                    servicios.comentarios.show(this.formulario.obj).then(response=>{
                        this.comentarios=response.data;
                    })
                }else{
                    servicios.archivos.index().then(response=>{
                        this.listado=response.data;
                    });
                }
            },
            subirComentario:function(){
                if(this.formulario.texto){
                    servicios.comentarios.store(this.formulario).then(response=>{
                        this.cargarFotos();
                        this.formulario.texto=null;
                    });
                }
            },
            pushNotificaciones:function(){
                Echo.private(`App.User.1`)
                    .notification((notification) => {
                        this.cargarFotos();
                    });
            }
        },
        mounted(){
            this.cargarFotos();
            this.pushNotificaciones();
        }
    }
</script>

<style scoped>
    .titleBox label{
        color:#444;
        margin:0;
        display:inline-block;
    }
    .commentBox .form-group:first-child, .actionBox .form-group:first-child {
        width:80%;
    }
    .commentBox .form-group:nth-child(2), .actionBox .form-group:nth-child(2) {
        width:18%;
    }
    .actionBox .form-group * {
        width:100%;
    }

    .commentList {
        padding:0;
        list-style:none;
        overflow:auto;
    }
    .commentList li {
        margin:0;
        margin-top:10px;
    }
    .commentList li > div {
        display:table-cell;
    }
    .commenterImage {
        width:30px;
        margin-right:5px;
        height:100%;
        float:left;
    }
    .commenterImage div {
        width:100%;
        border-radius:50%;
        background-color: #1b1e21;
    }
    .commentText p {
        margin:0;
    }
    .sub-text {
        color:#aaa;
        font-family:verdana;
        font-size:11px;
    }
    .actionBox {
        border-bottom: 1px dotted #bbb;
    }
    p{
        white-space: pre;
    }

</style>
