<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $table = 'pembayarans';
    protected $primaryKey = 'id_pembayaran';
    protected $fillable = [
        'penyewaan_id',
        'jumlah',
        'metode_pembayaran',
        'tanggal_pembayaran',
    ];

    public function penyewaan(): BelongsTo
    {
        return $this->belongsTo(Rental::class, 'penyewaan_id', 'id_penyewaan');
    }
} 