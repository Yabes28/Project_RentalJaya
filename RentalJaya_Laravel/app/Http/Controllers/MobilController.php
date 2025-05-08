<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MobilController extends Controller
{
    public function index(Request $request)
    {
        $query = Car::query();

        // Filter berdasarkan status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan jenis mobil
        if ($request->has('jenis_mobil') && $request->jenis_mobil !== 'SEMUA') {
            $query->where('jenis_mobil', $request->jenis_mobil);
        }

        // Search berdasarkan merek, model, atau nomor polisi
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('merek', 'like', "%{$search}%")
                ->orWhere('model', 'like', "%{$search}%")
                ->orWhere('nomor_polisi', 'like', "%{$search}%"); // Tambahkan pencarian berdasarkan nomor polisi
            });
        }

        $mobil = $query->select(
            'id_mobil',
            'merek',
            'model',
            'jenis_mobil',
            'tahun_pembuatan',
            'nomor_polisi',
            'harga_sewa',
            'status',
            'bahan_bakar',
            'kapasitas_penumpang',
            'foto'
        )
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($item) {
            $item->foto_url = $item->foto ? Storage::url('public/' . $item->foto) : null;
            return $item;
        });

        return response()->json([
            'status' => 'success',
            'data' => $mobil,
            'message' => 'Berhasil mengambil data mobil'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'merek' => 'required|string',
            'model' => 'required|string',
            'jenis_mobil' => 'required|in:MPV,SUV,SPORT,HATCHBACK',
            'tahun_pembuatan' => 'required|integer',
            'nomor_polisi' => 'required|string|unique:mobils',
            'harga_sewa' => 'required|numeric',
            'bahan_bakar' => 'required|in:Solar,Pertalite,Pertamax,Pertamax Turbo',
            'kapasitas_penumpang' => 'required|integer',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $namaFoto = time() . '.' . $foto->getClientOriginalExtension();
    
            $path = $foto->storeAs('mobil', $namaFoto, 'public');
    
            $validated['foto'] = 'mobil/' . $namaFoto;
        }
        $validated['status'] = $request->input('status', 'Tersedia');
        $mobil = Car::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $mobil,
            'message' => 'Berhasil menambahkan mobil'
        ], 201);
    }

    public function show(Car $mobil)
    {
        return response()->json([
            'status' => 'success',
            'data' => $mobil,
            'message' => 'Berhasil mengambil detail mobil'
        ]);
    }

    public function update(Request $request, Car $mobil)
    {
        $validated = $request->validate([
            'merek' => 'string',
            'model' => 'string',
            'tahun_pembuatan' => 'integer',
            'jenis_mobil' => 'required|in:MPV,SUV,SPORT,HATCHBACK',
            'nomor_polisi' => 'string|unique:mobils,nomor_polisi,' . $mobil->id_mobil . ',id_mobil',
            'harga_sewa' => 'numeric',
            'bahan_bakar' => 'required|in:Solar,Pertalite,Pertamax,Pertamax Turbo',
            'kapasitas_penumpang' => 'integer',
        ]);

        // Hanya update field yang diizinkan
        $mobil->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $mobil,
            'message' => 'Berhasil mengupdate mobil'
        ]);
    }

    public function destroy(Car $mobil)
    {
        // Hapus foto dari storage jika ada
        if ($mobil->foto) {
            Storage::delete('public/' . $mobil->foto);
    }

        $mobil->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus mobil'
        ], 204);
    }

    public function getFavoriteMobils()
    {
        $mobilFavorit = Car::select(
            'id_mobil',
            'merek',
            'model',
            'jenis_mobil',
            'harga_sewa',
            'foto',
            'kapasitas_penumpang'
        )
        ->where('status', 'Tersedia')
        ->inRandomOrder()
        ->limit(3)
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $mobilFavorit,
            'message' => 'Berhasil mengambil data mobil favorit'
        ]);
    }

    public function countMobils()
    {
        $totalMobils = Car::count();

        return response()->json([
            'status' => 'success',
            'total_mobils' => $totalMobils,
            'message' => 'Berhasil menghitung total mobil'
        ]);
    }
} 