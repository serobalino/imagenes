<?php

namespace App;

use Hashids\Hashids;
use Jenssegers\Date\Date;
use Jenssegers\Mongodb\Eloquent\Model;
use MongoDate;

class Image extends Model
{
    //protected $primaryKey   =   "id_im";

    protected $hidden       =   ["archivo_im","id_im","id_us"];

    protected $appends      =   ['hace_im','ruta_im','code_im'];

    protected $with         =   ['autor'];

    protected $connection   =   "mongodb";

    //protected $dateFormat   =   "Y-m-d\TH:i:s.uP";


    public function getCodeImAttribute(){
//        $hashids = new Hashids();
//        return $hashids->encode($this->attributes['id_im']);
        return $this->attributes['_id'];
    }

    public function comments(){
        return $this->hasMany(Comment::class,'id_im','_id')->latest();
    }

    public function autor(){
        return $this->hasOne(User::class,'id','id_us');
    }

    public function getHaceImAttribute(){
        //$MongoDt = $this->attributes['created_at']->toDateTime()->format('Y-m-d H:i:s');
        //return $this->attributes['created_at']->diffForHumans();
        return new \MongoDB\BSON\UTCDateTime($this->attributes['created_at']);
    }

    public function getRutaImAttribute(){
        return route("archivos.show",$this->getCodeImAttribute());
    }


}
