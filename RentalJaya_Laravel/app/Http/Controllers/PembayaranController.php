<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'penyewaan_id' => 'required|exists:penyewaans,id_penyewaan',
            'jumlah' => 'required|numeric',
            'metode_pembayaran' => 'required|string',
        ]);

        $pembayaran = Payment::create($validated + [
            'status_pembayaran' => 'pending',
            'tanggal_pembayaran' => now(),
        ]);

        return response()->json($pembayaran, 201);
    }

    public function update(Request $request, Payment $pembayaran)
    {
        $validated = $request->validate([
            'status_pembayaran' => 'required|in:pending,sukses,gagal',
        ]);

        $pembayaran->update($validated);
        return response()->json($pembayaran);
    }
} 