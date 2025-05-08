<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id('id_pembayaran');
            $table->foreignId('penyewaan_id')->constrained('penyewaans', 'id_penyewaan')->onDelete('cascade');
            $table->decimal('jumlah', 10, 2);
            $table->string('metode_pembayaran');
            $table->timestamp('tanggal_pembayaran')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
}; 