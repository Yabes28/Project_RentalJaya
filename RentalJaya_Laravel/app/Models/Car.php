<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{   
    protected $table = 'mobils';
    protected $primaryKey = 'id_mobil';
    protected $fillable = [
        'merek',
        'model',
        'jenis_mobil',
        'tahun_pembuatan',
        'nomor_polisi',
        'harga_sewa',
        'status',
        'bahan_bakar',
        'kapasitas_penumpang',
        'foto',
    ];

    public function penyewaans(): HasMany
    {
        return $this->hasMany(Rental::class, 'mobil_id', 'id_mobil');
    }
} 