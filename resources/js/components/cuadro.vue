<template>
    <div class="embed-responsive embed-responsive-1by1" v-on:click="ira">
        <h4 class="texto nombre">{{objeto.nombre_im}}</h4>
        <p class="texto archivo">{{objeto.autor.name}}</p>
        <object
                class="embed-responsive-item"
                :data="iframe.src"
                :type="iframe.tipo"
                frameborder="0"
                allowfullscreen
        ></object>
        <span class="texto text-muted">{{objeto.created_at}}</span>
    </div>

</template>

<script>
    export default {
        name: "cuadro",
        data:()=>({
            loaded: false,
            iframe: {
                src: null,
                style: null,
                wrapperStyle: null,
                tipo:null,
            }
        }),
        props:["objeto"],
        methods:{
          ira:function(){
              location.href="./home/"+this.objeto.code_im;
          }
        },
        mounted(){
            this.iframe.src=this.objeto.ruta_im;
            this.iframe.tipo=this.objeto.tipo_im;
            this.loaded = true;
        }
    }
</script>

<style scoped lang="scss">
    .embed-responsive{
        position: relative;
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }
    .texto{
        position: absolute;
        z-index:5;
        &.nombre{
            top: 10px;
            left: 10px;
            color: white;
            background-color: black;
        }
        &.archivo{
            top: 35px;
            left: 10px;
            color: black;
        }
        &.text-muted{
            bottom: 10px;
            right: 10px;
            color: black;
            background-color: white;
            padding-left: 3px;
            padding-right: 3px;
        }
    }
</style>
