<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mobils', function (Blueprint $table) {
            $table->id('id_mobil');
            $table->string('merek');
            $table->string('model');
            $table->year('tahun_pembuatan');
            $table->string('nomor_polisi')->unique();
            $table->decimal('harga_sewa', 10, 2);
            $table->enum('status', ['Tersedia', 'Disewa']);
            $table->string('bahan_bakar');
            $table->integer('kapasitas_penumpang');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mobils');
    }
}; 