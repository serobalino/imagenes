<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids\Hashids;

class Image extends Model
{
    protected $primaryKey   =   "id_im";

    protected $hidden       =   ["archivo_im","id_im","id_us"];

    protected $appends = ['code_im'];


    public function getCodeImAttribute(){
        $hashids = new Hashids();
        return $hashids->encode($this->attributes['id_im']);
    }

    public function comments(){
        return $this->hasMany(Comment::class,'id_im','id_im');
    }

    public function autor(){
        return $this->hasOne(User::class,'id','id_us');
    }
}
