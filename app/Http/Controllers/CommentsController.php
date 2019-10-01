<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Image as Archivo;
use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacion =   Validator::make($request->all(), [
            'comentario'    =>  'required',
            'id'            =>  'required',
        ]);
        if($validacion->fails()){
            $texto  =   '';
            foreach ($validacion->errors()->all() as $errores)
                $texto.=$errores.PHP_EOL;
            return response(['val'=>false,'message'=>$texto,'data'=>$validacion->errors()->all()],500);
        }else{
//            $hashids    =   new Hashids();
//            $id         =   $hashids->decode($request->id);
//            $archivo    =   Archivo::find(array_shift($id));
            $comentario =   new Comment();
            //$comentario->id_im      =   $archivo->id_im;
            $comentario->id_im      =   $request->id;
            $comentario->id_us      =   auth()->user()->getAuthIdentifier();
            $comentario->texto_co   =   $request->comentario;
            $comentario->save();
            return response(['val'=>true,'message'=>"Comentario guardado",'data'=>$validacion->errors()->all()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
//        $hashids    =   new Hashids();
//        $id         =   $hashids->decode($id);
//        $archivo    =   Archivo::find(array_shift($id));
        $archivo    =   Archivo::find($id);
        if($archivo){
            return response($archivo->comments);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
