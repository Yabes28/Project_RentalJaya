<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rental extends Model
{
    protected $table = 'penyewaans';
    protected $primaryKey = 'id_penyewaan';
    protected $fillable = [
        'mobil_id',
        'user_id',
        'tanggal_mulai',
        'tanggal_selesai',
        'status', // aktif, selesai, dibatalkan
        'total_biaya',
    ];

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'mobil_id', 'id_mobil');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function pembayarans(): HasMany
    {
        return $this->hasMany(Payment::class, 'penyewaan_id', 'id_penyewaan');
    }

    public function pengembalians(): HasMany
    {
        return $this->hasMany(CarReturn::class, 'penyewaan_id', 'id_penyewaan');
    }
} 