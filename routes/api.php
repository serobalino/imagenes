<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("archivo/{id}","ImagesController@generarArchivo")->name("generar");
Route::get("contenido/{id}","ImagesController@show")->name("contenido");

Route::group(['middleware' => ['auth:api']], function () {
    Route::resource('/files', 'ImagesController');
    Route::resource('/comments', 'CommentsController');

    Route::get('/home/{id}', 'HomeController@show');
});

