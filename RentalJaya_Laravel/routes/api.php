<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MobilController;
use App\Http\Controllers\PenyewaanController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PengembalianController;
use Illuminate\Support\Facades\Route;

// Route untuk auth (tidak perlu authentication)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/create-admin', [AuthController::class, 'createAdmin']);

// Route publik untuk mobil
Route::get('/mobil/favorite', [MobilController::class, 'getFavoriteMobils']);
Route::get('/mobil', [MobilController::class, 'index']);

// Route yang membutuhkan authentication
Route::middleware('auth:api')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'update']);
    Route::get('/profile', [AuthController::class, 'getProfile']);
    Route::get('/count-users', [AuthController::class, 'countUsers']);
    Route::get('/users', [AuthController::class, 'index']);
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);

    // Mobil routes (yang butuh auth)
    Route::get('/mobil/{mobil}', [MobilController::class, 'show']);
    Route::post('/mobil', [MobilController::class, 'store']);
    Route::put('/mobil/{mobil}', [MobilController::class, 'update']);
    Route::delete('/mobil/{mobil}', [MobilController::class, 'destroy']);
    Route::get('/count-mobils', [MobilController::class, 'countMobils']);

    // Penyewaan routes
    Route::get('/penyewaan', [PenyewaanController::class, 'index']);
    Route::post('/penyewaan', [PenyewaanController::class, 'store']);
    Route::get('/penyewaan/{id}', [PenyewaanController::class, 'show']);
    Route::put('/penyewaan/{id}', [PenyewaanController::class, 'update']);
    Route::get('/all-penyewaan', [PenyewaanController::class, 'getAllPenyewaan']);
    Route::get('/current-penyewaan', [PenyewaanController::class, 'getCurretPenyewaan']);
    Route::get('/count-penyewaans', [PenyewaanController::class, 'countPenyewaans']);
    // Pembayaran routes
    Route::post('/pembayaran', [PembayaranController::class, 'store']);
    Route::put('/pembayaran/{pembayaran}', [PembayaranController::class, 'update']);

    // Pengembalian routes
    Route::get('/pengembalian', [PengembalianController::class, 'index']);
    Route::post('/pengembalian', [PengembalianController::class, 'store']);
    Route::put('/pengembalian/{id}', [PengembalianController::class, 'update']);
});