<?php

namespace App\Http\Controllers;

use App\Image as Archivo;
use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function show($id)
    {
//        $hashids    =   new Hashids();
//        $id         =   $hashids->decode($id);
        $archivo    =   Archivo::find($id);
        if($archivo){
            return view('imagen',['obj'=>$archivo]);
        }
        return abort(404);
    }
}
