<?php

namespace App\Http\Controllers;

use App\Models\CarReturn;
use Illuminate\Http\Request;
use App\Models\Rental;

class PengembalianController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'penyewaan_id' => 'required|exists:penyewaans,id_penyewaan',
            'tanggal_kembali' => 'required|date',
            'kondisi_mobil' => 'required|string',
        ]);

        // Buat pengembalian baru
        $pengembalian = CarReturn::create($validated + ['status' => 'Pending']);

        // Update status penyewaan menjadi 'selesai'
        $penyewaan = Rental::find($validated['penyewaan_id']);
        if ($penyewaan) {
            $penyewaan->update(['status' => 'selesai']);
        }

        return response()->json([
            'status' => 'success',
            'data' => $pengembalian,
            'message' => 'Pengembalian berhasil dibuat dan status penyewaan diperbarui'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $pengembalian = CarReturn::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,selesai',
            'denda_kerusakan' => 'required|numeric',
            'denda_keterlambatan' => 'required|numeric',
            'total_denda' => 'required|numeric',
        ]);

        $pengembalian->update($validated);

        if ($validated['status'] === 'selesai') {
            $penyewaan = Rental::find($pengembalian->penyewaan_id);
            if ($penyewaan) {
                $penyewaan->mobil()->update(['status' => 'Tersedia']);
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $pengembalian,
            'message' => 'Data pengembalian berhasil diperbarui'
        ]);
    }

    public function index()
    {
        try {
            $pengembalian = CarReturn::with([
                'penyewaan:id_penyewaan,mobil_id,user_id,tanggal_mulai,tanggal_selesai',
                'penyewaan.mobil:id_mobil,merek,model,nomor_polisi',
                'penyewaan.user:id_user,name,no_telp'
            ])
            ->select(
                'id_pengembalian',
                'penyewaan_id',
                'tanggal_kembali',
                'kondisi_mobil',
                'denda_kerusakan',
                'denda_keterlambatan',
                'total_denda',
                'status'
            )
            ->orderBy('created_at', 'desc')
            ->get();

            return response()->json([
                'status' => 'success',
                'data' => $pengembalian,
                'message' => 'Berhasil mengambil data pengembalian'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pengembalian',
                'errors' => $e->getMessage()
            ], 500);
        }
    }
} 