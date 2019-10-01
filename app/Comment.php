<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Date\Date;

class Comment extends Model
{
//    protected $primaryKey   =   "id_co";

    protected $with         =   ['autor'];

    protected $appends      =   ['hace_co'];

    protected $hidden       =   ['id_im','id_us'];

    protected $connection   =   "mongodb";

    protected $dateFormat   =   "Y-m-d\TH:i:s.uP";

    public function autor(){
        return $this->hasOne(User::class,'id','id_us');
    }

    public function getHaceCoAttribute(){
        return $this->attributes['created_at'];
    }
}
