<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengembalians', function (Blueprint $table) {
            $table->id('id_pengembalian');
            $table->foreignId('penyewaan_id')->constrained('penyewaans', 'id_penyewaan')->onDelete('cascade');
            $table->timestamp('tanggal_kembali');
            $table->text('kondisi_mobil')->nullable();
            $table->decimal('denda_kerusakan', 10, 2)->default(0);
            $table->decimal('denda_keterlambatan', 10, 2)->default(0);
            $table->decimal('total_denda', 10, 2)->default(0);
            $table->enum('status', ['pending', 'selesai']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengembalians');
    }
}; 