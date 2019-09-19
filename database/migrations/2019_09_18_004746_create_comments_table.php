<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('id_co');
            $table->unsignedBigInteger('id_im');
            $table->unsignedBigInteger('id_us');
            $table->text('texto_co');

            $table->foreign('id_us')->references('id')->on('users');
            $table->foreign('id_im')->references('id_im')->on('images');
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
        Schema::dropIfExists('comments',function (Blueprint $table) {
            $table->dropForeign(['id_us','id_im']);
        });
    }
}
