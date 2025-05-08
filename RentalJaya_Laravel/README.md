## Kelas A Kelompok 5

## Anggota Kelompok:
- YABES ABDI ZEBAOTH ( 220711748 ) - Frontend & Backend
- Davin Gilbert Natanael ( 220711841 ) - Frontend & Backend
- GILANG WAHYU NUGRAHA ( 220711879 ) - Frontend & Backend
- Stefanus Liborius Dapa Loka ( 220711978 ) - Backend

## Username dan Password Login
- Login User:
  - Username: user@gmail.com
  - Password: user1234
- Login Admin:
  - Username: admin@gmail.com
  - Password: 11111111

## Bonus yang diambil: 
- Routes API:
  - Route::post('/login', [AuthController::class, 'login']);
  - Route::post('/register', [AuthController::class, 'register']);
  - Route::post('/create-admin', [AuthController::class, 'createAdmin']);
  - Route::get('/mobil/favorite', [MobilController::class, 'getFavoriteMobils']);
  - Route::get('/mobil', [MobilController::class, 'index']);
  - Route::post('/logout', [AuthController::class, 'logout']);
  - Route::put('/profile', [AuthController::class, 'update']);
  - Route::get('/profile', [AuthController::class, 'getProfile']);
  - Route::get('/count-users', [AuthController::class, 'countUsers']);
  - Route::get('/users', [AuthController::class, 'index']);
  - Route::delete('/users/{id}', [AuthController::class, 'destroy']);
  - Route::get('/mobil/{mobil}', [MobilController::class, 'show']);
  - Route::post('/mobil', [MobilController::class, 'store']);
  - Route::put('/mobil/{mobil}', [MobilController::class, 'update']);
  - Route::delete('/mobil/{mobil}', [MobilController::class, 'destroy']);
  - Route::get('/count-mobils', [MobilController::class, 'countMobils']);
  - Route::get('/penyewaan', [PenyewaanController::class, 'index']);
  - Route::post('/penyewaan', [PenyewaanController::class, 'store']);
  - Route::get('/penyewaan/{id}', [PenyewaanController::class, 'show']);
  - Route::put('/penyewaan/{id}', [PenyewaanController::class, 'update']);
  - Route::get('/all-penyewaan', [PenyewaanController::class, 'getAllPenyewaan']);
  - Route::get('/current-penyewaan', [PenyewaanController::class, 'getCurretPenyewaan']);
  - Route::get('/count-penyewaans', [PenyewaanController::class, 'countPenyewaans']);
  - Route::post('/pembayaran', [PembayaranController::class, 'store']);
  - Route::put('/pembayaran/{pembayaran}', [PembayaranController::class, 'update']);
  - Route::get('/pengembalian', [PengembalianController::class, 'index']);
  - Route::post('/pengembalian', [PengembalianController::class, 'store']);
  - Route::put('/pengembalian/{id}', [PengembalianController::class, 'update']);
- React:
  - Link Repository : https://github.com/gilangwahyun/PW_A_5_React.git 
