<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $primaryKey   =   "id_co";

    public function autor(){
        return $this->hasOne(User::class,'id','id_us');
    }
}
