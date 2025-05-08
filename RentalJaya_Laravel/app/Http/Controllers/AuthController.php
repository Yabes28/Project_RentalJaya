<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'alamat' => 'required|string|max:500',
            'no_telp' => 'required|string|max:15',
            'no_sim' => 'required|string|max:20',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'alamat' => $request->alamat,
            'no_telp' => $request->no_telp,
            'no_sim' => $request->no_sim,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user
        ], 201);
    }

    /**
     * Login an existing user.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email tidak ditemukan'], 401);
        }
        
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Password salah'], 401);
        }

        // Membuat token
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json([
            'id_user' => $user->id_user,
            'role' => $user->role,
            'token' => $token,
            'message' => 'Login successful',
        ], 200);
    }

    /**
     * Logout the user (revoke token).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }

    public function update(Request $request)
    {
        try {
            // Log request untuk debugging
            Log::info('Request received for updating profile', ['request' => $request->all()]);

            // Ambil user yang sedang login
            $user = $request->user();
            Log::info('Authenticated User', ['user' => $user]);

            // Validasi input dengan unique menggunakan id_user
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id_user . ',id_user',
                'password' => 'sometimes|nullable|string|min:8',
                'alamat' => 'sometimes|string|max:500',
                'no_telp' => 'sometimes|string|max:15',
                'no_sim' => 'sometimes|string|max:20|unique:users,no_sim,' . $user->id_user . ',id_user',
            ]);

            // Log validasi berhasil
            Log::info('Validation passed', ['validated' => $validated]);

            // Hash password jika ada
            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
                Log::info('Password hashed');
            }

            // Update data user
            DB::enableQueryLog(); // Aktifkan query log untuk debugging
            $user->update($validated);

            Log::info('User updated successfully', ['updated_data' => $user]);
            Log::info('Executed Queries', ['queries' => DB::getQueryLog()]);

            return response()->json([
                'status' => 'success',
                'message' => 'Profil berhasil diperbarui',
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating profile', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function createAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json([
            'message' => 'Admin created successfully',
            'admin' => $admin
        ], 201);
    }

    public function getProfile(Request $request)
    {
        try {
            $user = $request->user();
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'user' => $user
                ],
                'message' => 'Profile data retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get profile data'
            ], 500);
        }
    }

    public function countUsers()
    {
        $totalUsers = User::where('role', 'user')->count();

        return response()->json([
            'status' => 'success',
            'total_users' => $totalUsers,
            'message' => 'Berhasil menghitung total pengguna'
        ]);
    }

    public function index(Request $request)
    {
        try {
            $users = User::where('role', 'user')->get(); // Mengambil semua pengguna dengan role 'user'

            return response()->json([
                'status' => 'success',
                'data' => [
                    'users' => $users
                ],
                'message' => 'Data pengguna berhasil diambil'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pengguna',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id); // Mencari pengguna berdasarkan ID
            $user->delete(); // Menghapus pengguna

            return response()->json([
                'status' => 'success',
                'message' => 'Pengguna berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus pengguna',
                'errors' => $e->getMessage()
            ], 500);
        }
    }
} 