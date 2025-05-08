<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarReturn extends Model
{
    protected $table = 'pengembalians';
    protected $primaryKey = 'id_pengembalian';
    protected $fillable = [
        'penyewaan_id',
        'tanggal_kembali',
        'kondisi_mobil',
        'denda_kerusakan',
        'denda_keterlambatan',
        'total_denda',
        'status',
    ];

    public function penyewaan(): BelongsTo
    {
        return $this->belongsTo(Rental::class, 'penyewaan_id', 'id_penyewaan');
    }
} 