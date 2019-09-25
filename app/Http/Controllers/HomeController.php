<?php

namespace App\Http\Controllers;

use App\Image as Archivo;
use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

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
        $hashids    =   new Hashids();
        $id         =   $hashids->decode($id);
        $archivo    =   Archivo::find(array_shift($id));
        if($archivo){
            return view('imagen',['obj'=>$archivo]);
        }
        return abort(404);
    }
}
