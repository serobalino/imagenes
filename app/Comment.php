<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Date\Date;

class Comment extends Model
{
    protected $primaryKey   =   "id_co";

    protected $with         =   ['autor'];

    protected $appends      =   ['hace_co'];

    protected $hidden       =   ['id_im','id_us'];

    public function autor(){
        return $this->hasOne(User::class,'id','id_us');
    }

    public function getHaceCoAttribute(){
        return Date::createFromFormat('Y-m-d H:i:s',$this->attributes['created_at'])->diffForHumans();
    }
}
