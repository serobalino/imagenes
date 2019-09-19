<?php

namespace App\Http\Controllers;

use App\Image;
use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Image::all());
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
    public function store(Request $request){
        $validacion =   Validator::make($request->all(), [
            'archivo'       => 'required|file|max:20480',
        ]);
        if($validacion->fails()){
            $texto  =   '';
            foreach ($validacion->errors()->all() as $errores)
                $texto.=$errores.PHP_EOL;
            return response(['val'=>false,'message'=>$texto,'data'=>$validacion->errors()->all()],500);
        }else{
            $file                   =   $request->file('archivo');
            $archivo                =   new Image();
            $archivo->id_us         =   auth()->user()->getAuthIdentifier();
            $archivo->peso_im       =   $file->getSize()/1024;
            $archivo->archivo_im    =   base64_encode(file_get_contents($file));
            $archivo->tipo_im       =   $file->getMimeType();
            $archivo->ext_im        =   $file->getClientOriginalExtension();
            $archivo->nombre_im     =   pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $archivo->save();
            return response(['val'=>true,'message'=>"Se pudo",'data'=>$validacion->errors()->all()]);
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
        $hashids    =   new Hashids();
        $id         =   $hashids->decode($id);
        $archivo    =   Image::find(array_shift($id));
        if($archivo){
            return response(base64_decode($archivo->archivo_im), 200)
                ->header('Content-Type', $archivo->tipo_im);
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
