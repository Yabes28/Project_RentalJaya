<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use Illuminate\Http\Request;
use App\Models\Car;

class PenyewaanController extends Controller
{
    public function index()
    {
        $penyewaan = Rental::with([
            'mobil:id_mobil,merek,model,nomor_polisi',
            'pembayarans:id_pembayaran,penyewaan_id,jumlah,metode_pembayaran,tanggal_pembayaran',
            'pengembalians:id_pengembalian,penyewaan_id,tanggal_kembali,status'
        ])
        ->where('user_id', auth()->id())
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $penyewaan,
            'message' => 'Berhasil mengambil data penyewaan'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mobil_id' => 'required|exists:mobils,id_mobil',
            'user_id' => 'required|exists:users,id_user',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'total_biaya' => 'required|numeric',
        ]);

        // Buat penyewaan baru
        $penyewaan = Rental::create($validated + ['status' => 'aktif']);

        // Update status mobil menjadi 'Disewa'
        $mobil = Car::find($validated['mobil_id']);
        if ($mobil) {
            $mobil->update(['status' => 'Disewa']);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'id_penyewaan' => $penyewaan->id_penyewaan, // Pastikan ini mengembalikan ID yang benar
                'message' => 'Penyewaan berhasil dibuat dan status mobil diperbarui'
            ]
        ], 201);
    }

    public function show($id)
    {
        $penyewaan = Rental::with(['mobil', 'user'])->find($id);
        
        if (!$penyewaan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Penyewaan tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $penyewaan,
            'message' => 'Berhasil mengambil detail penyewaan'
        ]);
    }

    public function update(Request $request, $id)
    {
        $penyewaan = Rental::find($id);
        
        if (!$penyewaan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Penyewaan tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'status' => 'in:aktif,selesai,dibatalkan',
            'tanggal_selesai' => 'date|after:tanggal_mulai',
            'total_biaya' => 'numeric',
        ]);

        $penyewaan->update($validated);
        
        return response()->json([
            'status' => 'success',
            'data' => $penyewaan,
            'message' => 'Berhasil mengupdate penyewaan'
        ]);
    }

    public function getAllPenyewaan()
    {
        $penyewaan = Rental::with([
            'mobil:id_mobil,merek,model,nomor_polisi',
            'pembayarans:id_pembayaran,penyewaan_id,jumlah,metode_pembayaran,tanggal_pembayaran',
            'pengembalians:id_pengembalian,penyewaan_id,tanggal_kembali,status',
            'user:id_user,name'
        ])
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $penyewaan,
            'message' => 'Berhasil mengambil semua data penyewaan'
        ]);
    }

    public function getCurretPenyewaan()
    {
        $penyewaan = Rental::with([
            'mobil:id_mobil,merek,model,nomor_polisi',
            'pembayarans:id_pembayaran,penyewaan_id,jumlah,metode_pembayaran,tanggal_pembayaran',
            'pengembalians:id_pengembalian,penyewaan_id,tanggal_kembali,status',
            'user:id_user,name'
        ])
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $penyewaan,
            'message' => 'Berhasil mengambil semua data penyewaan'
        ]);
    }

    public function countPenyewaans()
    {
        $totalPenyewaanAktif = Rental::where('status', 'aktif')->count();

        return response()->json([
            'status' => 'success',
            'total_penyewaan' => $totalPenyewaanAktif,
            'message' => 'Berhasil menghitung total penyewaan aktif'
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:aktif,selesai,dibatalkan'
        ]);

        $penyewaan = Rental::find($id);

        if (!$penyewaan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Penyewaan tidak ditemukan'
            ], 404);
        }

        $penyewaan->update(['status' => $validated['status']]);

        return response()->json([
            'status' => 'success',
            'data' => $penyewaan,
            'message' => 'Status penyewaan berhasil diperbarui'
        ]);
    }
} 