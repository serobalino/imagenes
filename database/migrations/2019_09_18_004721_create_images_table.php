<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->bigIncrements('id_im');
            $table->unsignedBigInteger('id_us');
            $table->float('peso_im',8, 2);
            $table->text('archivo_im');
            $table->string('tipo_im', 100);
            $table->string('nombre_im', 400);
            $table->string('ext_im', 20);

            $table->foreign('id_us')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images',function (Blueprint $table) {
            $table->dropForeign(['id_us']);
        });
    }
}
