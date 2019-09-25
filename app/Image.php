<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids\Hashids;
use Jenssegers\Date\Date;

class Image extends Model
{
    protected $primaryKey   =   "id_im";

    protected $hidden       =   ["archivo_im","id_im","id_us"];

    protected $appends      =   ['code_im','hace_im','ruta_im'];

    protected $with         =   ['autor'];


    public function getCodeImAttribute(){
        $hashids = new Hashids();
        return $hashids->encode($this->attributes['id_im']);
    }

    public function comments(){
        return $this->hasMany(Comment::class,'id_im','id_im')->latest();
    }

    public function autor(){
        return $this->hasOne(User::class,'id','id_us');
    }

    public function getHaceImAttribute(){
        return Date::createFromFormat('Y-m-d H:i:s',$this->attributes['created_at'])->diffForHumans();
    }

    public function getRutaImAttribute(){
        return route("archivos.show",$this->getCodeImAttribute());
    }


}
