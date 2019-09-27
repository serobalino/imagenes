<?php

namespace App\Http\Controllers;

use App\Image as Archivo;
use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ImagesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Archivo::where("id_us","!=",auth()->user()->getAuthIdentifier())->latest()->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response(Archivo::where("id_us","=",auth()->user()->getAuthIdentifier())->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $validacion =   Validator::make($request->all(), [
            'archivo'       => 'required|file',
        ]);
        if($validacion->fails()){
            $texto  =   '';
            foreach ($validacion->errors()->all() as $errores)
                $texto.=$errores.PHP_EOL;
            return response(['val'=>false,'message'=>$texto,'data'=>$validacion->errors()->all()],500);
        }else{
            $file                   =   $request->file('archivo');
            $archivo                =   new Archivo();
            $archivo->id_us         =   auth()->user()->getAuthIdentifier();
            $archivo->peso_im       =   $file->getSize()/1024;
            $archivo->archivo_im    =   Storage::putFile('subidas', $file);
            $archivo->tipo_im       =   $file->getMimeType();
            $archivo->ext_im        =   $file->getClientOriginalExtension();
            $archivo->nombre_im     =   pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $archivo->save();
            unset($file);
            unset($archivo);
            return response(['val'=>true,'message'=>"Se guardó correctamente",'data'=>$validacion->errors()->all()]);
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
            return response(Storage::get($archivo->archivo_im), 200)
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
        //Storage::delete('file.jpg');
    }
}
