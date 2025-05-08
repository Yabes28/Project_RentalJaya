-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 04:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_a_5`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_03_20_000001_create_cars_table', 1),
(5, '2024_03_20_000002_create_rentals_table', 1),
(6, '2024_03_20_000003_create_payments_table', 1),
(7, '2024_03_20_000004_create_car_returns_table', 1),
(8, '2024_12_15_015814_create_personal_access_tokens_table', 1),
(9, '2024_03_21_000000_add_foto_to_mobils_table', 2),
(10, '2024_03_21_000001_add_jenis_mobil_to_mobils_table', 3),
(11, '2024_12_16_121605_add_role_to_users_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `mobils`
--

CREATE TABLE `mobils` (
  `id_mobil` bigint(20) UNSIGNED NOT NULL,
  `merek` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `jenis_mobil` enum('MPV','SUV','SPORT','HATCHBACK') NOT NULL,
  `tahun_pembuatan` year(4) NOT NULL,
  `nomor_polisi` varchar(255) NOT NULL,
  `harga_sewa` decimal(10,2) NOT NULL,
  `status` enum('Tersedia','Disewa') NOT NULL,
  `bahan_bakar` varchar(255) NOT NULL,
  `kapasitas_penumpang` int(11) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mobils`
--

INSERT INTO `mobils` (`id_mobil`, `merek`, `model`, `jenis_mobil`, `tahun_pembuatan`, `nomor_polisi`, `harga_sewa`, `status`, `bahan_bakar`, `kapasitas_penumpang`, `foto`, `created_at`, `updated_at`) VALUES
(10, 'Suzuki', 'Karimun', 'MPV', '2021', 'AB 2000 AG', 2500000.00, 'Tersedia', 'Pertamax', 5, 'mobil/1734404270.jpg', '2024-12-16 19:57:51', '2024-12-17 17:26:50'),
(11, 'Toyota', 'Avanza', 'MPV', '2020', 'AB 2000 NN', 400000.00, 'Disewa', 'Pertamax', 7, 'mobil/1734416348.jpg', '2024-12-16 23:19:08', '2024-12-17 17:46:02'),
(14, 'Honda', 'Civiv Sport', 'SPORT', '2024', 'AB 1234 JK', 1000000.00, 'Tersedia', 'Pertamax Turbo', 4, 'mobil/1734487704.jpg', '2024-12-17 19:08:24', '2024-12-17 19:08:24'),
(16, 'Honda', 'Civic', 'SPORT', '2020', 'AB 4832 GH', 900000.00, 'Disewa', 'Pertamax', 4, 'mobil/1734489749.jpg', '2024-12-17 19:42:29', '2024-12-17 19:46:08');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayarans`
--

CREATE TABLE `pembayarans` (
  `id_pembayaran` bigint(20) UNSIGNED NOT NULL,
  `penyewaan_id` bigint(20) UNSIGNED NOT NULL,
  `jumlah` decimal(10,2) NOT NULL,
  `metode_pembayaran` varchar(255) NOT NULL,
  `tanggal_pembayaran` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pembayarans`
--

INSERT INTO `pembayarans` (`id_pembayaran`, `penyewaan_id`, `jumlah`, `metode_pembayaran`, `tanggal_pembayaran`, `created_at`, `updated_at`) VALUES
(18, 29, 900000.00, 'TRANSFER', '2024-12-17 19:46:14', '2024-12-17 19:46:14', '2024-12-17 19:46:14');

-- --------------------------------------------------------

--
-- Table structure for table `pengembalians`
--

CREATE TABLE `pengembalians` (
  `id_pengembalian` bigint(20) UNSIGNED NOT NULL,
  `penyewaan_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal_kembali` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `kondisi_mobil` text DEFAULT NULL,
  `denda_kerusakan` decimal(10,2) NOT NULL DEFAULT 0.00,
  `denda_keterlambatan` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_denda` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','selesai') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penyewaans`
--

CREATE TABLE `penyewaans` (
  `id_penyewaan` bigint(20) UNSIGNED NOT NULL,
  `mobil_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `status` enum('aktif','selesai') NOT NULL,
  `total_biaya` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penyewaans`
--

INSERT INTO `penyewaans` (`id_penyewaan`, `mobil_id`, `user_id`, `tanggal_mulai`, `tanggal_selesai`, `status`, `total_biaya`, `created_at`, `updated_at`) VALUES
(29, 16, 29, '2024-12-18', '2024-12-19', 'aktif', 900000.00, '2024-12-17 19:46:08', '2024-12-17 19:46:08');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'cb12f0b7935ea2f999d9385176c2ea35a4f2a050368bf96128047c5b45739d44', '[\"*\"]', '2024-12-14 20:08:29', NULL, '2024-12-14 19:18:17', '2024-12-14 20:08:29'),
(2, 'App\\Models\\User', 2, 'auth_token', '35801a606866236d6b5e3e934db06a3a82d9ff39f8f671996fde865dc5b7e35e', '[\"*\"]', NULL, NULL, '2024-12-14 21:55:11', '2024-12-14 21:55:11'),
(3, 'App\\Models\\User', 4, 'auth_token', '6cca1de4cc8262dad61c15a65a98dc0d114c43e1d121da4a76bc9bf432346392', '[\"*\"]', NULL, NULL, '2024-12-14 22:07:54', '2024-12-14 22:07:54'),
(4, 'App\\Models\\User', 6, 'auth_token', 'f8c4885716a9519ce42c81ddf1d17c23a8f25c836337e51feb8114893ff737de', '[\"*\"]', NULL, NULL, '2024-12-14 22:15:35', '2024-12-14 22:15:35'),
(5, 'App\\Models\\User', 20, 'Personal Access Token', '93611366c4b51ef53c55cb002b2809a2fbe2a5225837c5bba9c96a0a4bbe6779', '[\"*\"]', NULL, NULL, '2024-12-14 23:40:06', '2024-12-14 23:40:06'),
(6, 'App\\Models\\User', 20, 'Personal Access Token', 'bd8c5024a46ae8af1e592c29e2a1aaf1ffe77bb4159ab82b87595182424c7dcf', '[\"*\"]', NULL, NULL, '2024-12-14 23:42:00', '2024-12-14 23:42:00'),
(7, 'App\\Models\\User', 20, 'Personal Access Token', '181cb060cbd9a44093ea9a48d871c7d2a71d17eac9d8d55e34a528d6d9a4f5b3', '[\"*\"]', NULL, NULL, '2024-12-14 23:43:29', '2024-12-14 23:43:29'),
(8, 'App\\Models\\User', 20, 'Personal Access Token', 'd8cdce20cb8a4a2560df41346b77592f098de772cbb1d1ee8b2efaf71bbd39dc', '[\"*\"]', NULL, NULL, '2024-12-14 23:43:31', '2024-12-14 23:43:31'),
(9, 'App\\Models\\User', 20, 'Personal Access Token', 'dfd9bf9bbfaf143918b45815c3c77be4ed5748c085d6f50b7ec5941d48c2ce0c', '[\"*\"]', NULL, NULL, '2024-12-14 23:43:54', '2024-12-14 23:43:54'),
(10, 'App\\Models\\User', 20, 'Personal Access Token', '79475956c444c2e50cc3e012c4d1c0b7927ff0f0c15bb8fca3fdb63fee70cab2', '[\"*\"]', NULL, NULL, '2024-12-14 23:46:06', '2024-12-14 23:46:06'),
(11, 'App\\Models\\User', 20, 'Personal Access Token', 'b5fa1f07fd4f7b64a59d340acffbfd0053a1badacf4dbc8646cc144ec2a998c2', '[\"*\"]', NULL, NULL, '2024-12-14 23:46:09', '2024-12-14 23:46:09'),
(12, 'App\\Models\\User', 20, 'Personal Access Token', 'ff500cfef01f63241717893e70fbc6e5c9752cab07371be36f0eca25fe72df74', '[\"*\"]', NULL, NULL, '2024-12-14 23:47:09', '2024-12-14 23:47:09'),
(13, 'App\\Models\\User', 20, 'Personal Access Token', '9320d805dcdccc2d468af8363fe8d03279bbd94aa9133896f093fa1980bf07bb', '[\"*\"]', NULL, NULL, '2024-12-14 23:47:29', '2024-12-14 23:47:29'),
(14, 'App\\Models\\User', 21, 'Personal Access Token', 'ffd10d74fa8c78118b9b9bb79d06954386f391fa687b0287ea35e55d4ab66f14', '[\"*\"]', NULL, NULL, '2024-12-15 00:45:11', '2024-12-15 00:45:11'),
(15, 'App\\Models\\User', 21, 'Personal Access Token', '78b6fd26e9e7d482ca9f4541c86612807e68f41e99c9180ab8db9cfe2f21d1cd', '[\"*\"]', NULL, NULL, '2024-12-15 00:47:29', '2024-12-15 00:47:29'),
(16, 'App\\Models\\User', 21, 'Personal Access Token', '568bf841f689fbed66853a33472b2e1560caad58e2690b77b6f9afc4909ce14f', '[\"*\"]', NULL, NULL, '2024-12-15 00:47:38', '2024-12-15 00:47:38'),
(17, 'App\\Models\\User', 20, 'Personal Access Token', 'e2c780a3b88860a9cb5ebd772f6fce24b1888fbd413899093196c73cb6586868', '[\"*\"]', NULL, NULL, '2024-12-15 00:47:43', '2024-12-15 00:47:43'),
(18, 'App\\Models\\User', 20, 'Personal Access Token', '349e9803367ac0828f5deb2ace059d89a1eb26a6dec2c8b9158dae22bd31f5e3', '[\"*\"]', NULL, NULL, '2024-12-15 00:48:13', '2024-12-15 00:48:13'),
(19, 'App\\Models\\User', 20, 'Personal Access Token', 'dcb9fc667c9737a0e8732e79c798f128de2b0453f04bd64e3f06e053335f6c89', '[\"*\"]', NULL, NULL, '2024-12-15 00:48:46', '2024-12-15 00:48:46'),
(22, 'App\\Models\\User', 22, 'Personal Access Token', '9d2d51ca51f2532a835e3024b08d342a6f5b863c4da964e664beb703c63c2f35', '[\"*\"]', '2024-12-15 04:19:31', NULL, '2024-12-15 00:55:57', '2024-12-15 04:19:31'),
(24, 'App\\Models\\User', 25, 'Personal Access Token', '27ca4f5e6b6ce9c24fd2056169c4a2ffc0f123a83d7a450887d69443a8972ae1', '[\"*\"]', NULL, NULL, '2024-12-16 05:40:41', '2024-12-16 05:40:41'),
(25, 'App\\Models\\User', 25, 'Personal Access Token', '6c5cbc4c632a5b79aa7718bf45192e422f6456b260ff5508b556ea1e932fe57c', '[\"*\"]', '2024-12-16 05:51:29', NULL, '2024-12-16 05:41:05', '2024-12-16 05:51:29'),
(26, 'App\\Models\\User', 25, 'Personal Access Token', '44bd64b18c0f3f1b1bc76f8872c6b1608988456cf8c08b8b56371e68d86507ac', '[\"*\"]', '2024-12-16 05:55:12', NULL, '2024-12-16 05:51:37', '2024-12-16 05:55:12'),
(28, 'App\\Models\\User', 25, 'Personal Access Token', '144450046505d4bc1b1d154f5ab4ec48305a742d33600dc8ff98d77007f61068', '[\"*\"]', '2024-12-16 06:12:04', NULL, '2024-12-16 06:05:40', '2024-12-16 06:12:04'),
(29, 'App\\Models\\User', 20, 'Personal Access Token', '70958708642bb06015388ab2798116bfbf31a0933fc0f48e0444646708f40f41', '[\"*\"]', '2024-12-16 06:10:51', NULL, '2024-12-16 06:10:17', '2024-12-16 06:10:51'),
(31, 'App\\Models\\User', 25, 'Personal Access Token', '10fa33605921ecd39b609dc927e367c81a27466e9cf929b03483335894ebaf30', '[\"*\"]', '2024-12-16 06:58:24', NULL, '2024-12-16 06:38:38', '2024-12-16 06:58:24'),
(32, 'App\\Models\\User', 25, 'Personal Access Token', 'c698817e8fbb45e366f2bae9762568c94983e95afc8311fe5d812db0dcc261b2', '[\"*\"]', '2024-12-16 06:58:50', NULL, '2024-12-16 06:58:46', '2024-12-16 06:58:50'),
(33, 'App\\Models\\User', 24, 'Personal Access Token', '2e2276ce265cbc7c168ebb1b39717624b8e8f79c43fd8fc3336ccc98c42c5b19', '[\"*\"]', '2024-12-16 08:00:11', NULL, '2024-12-16 06:59:03', '2024-12-16 08:00:11'),
(34, 'App\\Models\\User', 24, 'Personal Access Token', '1f8c3d7b07c8718c2e32fa4026cdf7cc4bffd32d10dadb86c26330e50e72e11e', '[\"*\"]', '2024-12-16 07:37:51', NULL, '2024-12-16 07:35:46', '2024-12-16 07:37:51'),
(35, 'App\\Models\\User', 24, 'Personal Access Token', '253d7d5d48955eb6aa9bf34c20a8879b9da2f7e8c06c928e8316b273c3ee00cf', '[\"*\"]', '2024-12-16 08:01:11', NULL, '2024-12-16 08:01:08', '2024-12-16 08:01:11'),
(36, 'App\\Models\\User', 24, 'Personal Access Token', '627bfa5a944896c58757f2d9fdb3785f6a4e9d54aefb55bb37217e74cf341d23', '[\"*\"]', '2024-12-16 08:01:32', NULL, '2024-12-16 08:01:29', '2024-12-16 08:01:32'),
(37, 'App\\Models\\User', 24, 'Personal Access Token', '20a7024f65bb1798da4b4e641c340458a144fea83ee87a92afe082f90ba974a9', '[\"*\"]', '2024-12-16 17:39:25', NULL, '2024-12-16 17:39:21', '2024-12-16 17:39:25'),
(38, 'App\\Models\\User', 24, 'Personal Access Token', 'f3912a2703dfa981bf4d1aa81bbf362f3fcf3cf81d02fd6325b26a289b16c9c3', '[\"*\"]', '2024-12-16 17:48:10', NULL, '2024-12-16 17:47:53', '2024-12-16 17:48:10'),
(43, 'App\\Models\\User', 25, 'Personal Access Token', '6c6bb66af3c72985aab663820a9aed028c601f811ff274c9d2c605d7488fc27d', '[\"*\"]', '2024-12-16 18:49:42', NULL, '2024-12-16 18:25:57', '2024-12-16 18:49:42'),
(45, 'App\\Models\\User', 25, 'Personal Access Token', '753e544e315500bfe37094ec3efd1f31346d1970b5f56a184150543a4e73ac95', '[\"*\"]', '2024-12-16 19:29:54', NULL, '2024-12-16 19:29:51', '2024-12-16 19:29:54'),
(49, 'App\\Models\\User', 25, 'Personal Access Token', '1acc92e4933bf7da0271ee6bec0c63b13f3fa99fd8f2547bccb270b21844becc', '[\"*\"]', '2024-12-16 19:57:50', NULL, '2024-12-16 19:57:24', '2024-12-16 19:57:50'),
(53, 'App\\Models\\User', 24, 'Personal Access Token', '10106022f35000c9b1851e349c0de8f315423b6e890e597c51fa6226c29e099a', '[\"*\"]', '2024-12-16 20:14:29', NULL, '2024-12-16 20:14:09', '2024-12-16 20:14:29'),
(58, 'App\\Models\\User', 25, 'Personal Access Token', '703f9f0c4fd3ca685bc9ab01e59a9f75768c9ac86deff45754b5b762c1b0bd9c', '[\"*\"]', '2024-12-16 23:35:32', NULL, '2024-12-16 23:29:58', '2024-12-16 23:35:32'),
(59, 'App\\Models\\User', 25, 'Personal Access Token', 'f4b9ae7ef2ccde27b77b31e1457f36bd723f57295ae960a14d0bbe5d791f5874', '[\"*\"]', '2024-12-17 00:36:39', NULL, '2024-12-16 23:35:37', '2024-12-17 00:36:39'),
(60, 'App\\Models\\User', 23, 'Personal Access Token', '267c77c74c56592a92884f8748154fcde70326f6ff50de42b97b70a057fc2892', '[\"*\"]', '2024-12-17 00:58:01', NULL, '2024-12-17 00:37:22', '2024-12-17 00:58:01'),
(61, 'App\\Models\\User', 23, 'Personal Access Token', '5bd0aead331e44fe2cb434e5fc5d39e2f8818466331ebcc955e0ffbccc165454', '[\"*\"]', '2024-12-17 04:27:48', NULL, '2024-12-17 00:58:28', '2024-12-17 04:27:48'),
(63, 'App\\Models\\User', 25, 'Personal Access Token', '931c30561224debe7c6aa2b1bdd3366240963f8345cde925f3c3dbe06350d4ac', '[\"*\"]', '2024-12-17 04:34:38', NULL, '2024-12-17 04:29:37', '2024-12-17 04:34:38'),
(65, 'App\\Models\\User', 25, 'Personal Access Token', '44caa9c68b894f60f27b3d6803d605fb32e6e23d9db8df94a170edcd9860c398', '[\"*\"]', '2024-12-17 04:36:08', NULL, '2024-12-17 04:35:28', '2024-12-17 04:36:08'),
(67, 'App\\Models\\User', 25, 'Personal Access Token', '7a020ff5c192b23ab0b677306bd108f5b3c24303b69155c517bbd750d9657e8f', '[\"*\"]', '2024-12-17 04:51:02', NULL, '2024-12-17 04:36:47', '2024-12-17 04:51:02'),
(69, 'App\\Models\\User', 25, 'Personal Access Token', 'b08107129a08448115299dabdfef057081b422cf39f153de4ca7c14f8405f632', '[\"*\"]', '2024-12-17 06:06:51', NULL, '2024-12-17 05:15:53', '2024-12-17 06:06:51'),
(71, 'App\\Models\\User', 25, 'Personal Access Token', 'aeb0c4fecdd863b615fa628856272acf67fab5363f83271d12d9d00b0750f1bf', '[\"*\"]', '2024-12-17 06:12:47', NULL, '2024-12-17 06:08:50', '2024-12-17 06:12:47'),
(73, 'App\\Models\\User', 25, 'Personal Access Token', 'ecd79eeb90ebe5ab626d6544c55d72e6aeb858a4502c7167c62cfc75ae98a0e7', '[\"*\"]', '2024-12-17 06:29:36', NULL, '2024-12-17 06:29:32', '2024-12-17 06:29:36'),
(75, 'App\\Models\\User', 25, 'Personal Access Token', '458bf12e12825c3b539e7bad2a81f80b6d2d4ca2c550e3f664bf93719d8f7852', '[\"*\"]', '2024-12-17 06:38:07', NULL, '2024-12-17 06:30:15', '2024-12-17 06:38:07'),
(77, 'App\\Models\\User', 25, 'Personal Access Token', 'c1ddc2ae261ac4ab558f6109dfcb8dc5e40a54a544d3d456f83e6ce8c6fe8519', '[\"*\"]', '2024-12-17 06:42:09', NULL, '2024-12-17 06:42:06', '2024-12-17 06:42:09'),
(78, 'App\\Models\\User', 25, 'Personal Access Token', 'f4bcdb2e0ef4a04297a3e5f2d59c6b953e4cdf2216a0dba13a870589134382da', '[\"*\"]', '2024-12-17 06:42:50', NULL, '2024-12-17 06:42:48', '2024-12-17 06:42:50'),
(79, 'App\\Models\\User', 25, 'Personal Access Token', '535624b76c511f6499122ceed1e6edce6f8447efe057f3d8b68a9f4f430ead7e', '[\"*\"]', '2024-12-17 06:54:55', NULL, '2024-12-17 06:51:54', '2024-12-17 06:54:55'),
(81, 'App\\Models\\User', 25, 'Personal Access Token', '4edc6b87a81d948f8c70e110a571540a5fbf99765808cbfb0ed87e81f655e978', '[\"*\"]', '2024-12-17 06:58:31', NULL, '2024-12-17 06:55:56', '2024-12-17 06:58:31'),
(82, 'App\\Models\\User', 25, 'Personal Access Token', 'a4112f67e1228070f89eabcdd488c94b2f5d187ada24e65eb2a662e10df1a7a5', '[\"*\"]', '2024-12-17 07:01:52', NULL, '2024-12-17 07:01:17', '2024-12-17 07:01:52'),
(84, 'App\\Models\\User', 25, 'Personal Access Token', '74e45b8fb55b0ee6a255e9e704c3d0974213fc1ea24e85d22eb269093a42f401', '[\"*\"]', '2024-12-17 17:27:10', NULL, '2024-12-17 17:26:29', '2024-12-17 17:27:10'),
(85, 'App\\Models\\User', 25, 'Personal Access Token', '93f245576724a59906e823cc2bd3e80af3cac0fdf6f354e8ff41617000022179', '[\"*\"]', '2024-12-17 17:40:47', NULL, '2024-12-17 17:35:51', '2024-12-17 17:40:47'),
(87, 'App\\Models\\User', 25, 'Personal Access Token', '74bf235d861d6d96996e7f1f45d76c2ecb164d26b412fd2e4cdafa4efced9ad3', '[\"*\"]', '2024-12-17 18:17:23', NULL, '2024-12-17 18:17:18', '2024-12-17 18:17:23'),
(90, 'App\\Models\\User', 25, 'Personal Access Token', 'acd44e0952e136b25d608761a6987dceb4aaf3681497f484cff0f328cdd28711', '[\"*\"]', '2024-12-17 19:10:58', NULL, '2024-12-17 19:07:08', '2024-12-17 19:10:58'),
(91, 'App\\Models\\User', 25, 'Personal Access Token', '139afa8a5f04d5ff72ef30e376be88eba023db91b218f29ea531505bd7ad8054', '[\"*\"]', '2024-12-17 19:14:43', NULL, '2024-12-17 19:12:43', '2024-12-17 19:14:43'),
(92, 'App\\Models\\User', 25, 'Personal Access Token', '9eeb31619087880a436266dd32f64a9ab9adb8ba3a9202217b5b4eb1b11703ea', '[\"*\"]', '2024-12-17 19:15:19', NULL, '2024-12-17 19:15:01', '2024-12-17 19:15:19'),
(94, 'App\\Models\\User', 25, 'Personal Access Token', '2369e37ca4a3dfac424f8c74042b9f5c8fc4a2dcd4356a26ce955a42ae013f45', '[\"*\"]', '2024-12-17 19:27:22', NULL, '2024-12-17 19:22:44', '2024-12-17 19:27:22'),
(95, 'App\\Models\\User', 25, 'Personal Access Token', 'feb075600db228cc0cdd9b2f47f548b6aa060319b690da91ab5d1cf5f682cbe7', '[\"*\"]', '2024-12-17 19:38:19', NULL, '2024-12-17 19:36:35', '2024-12-17 19:38:19'),
(96, 'App\\Models\\User', 25, 'Personal Access Token', '7414fb3d950bb38f86f25f5d51d8c1aae3d82c4ad6b3a1a4189dbb1bbc3f6dd3', '[\"*\"]', '2024-12-17 19:39:07', NULL, '2024-12-17 19:39:00', '2024-12-17 19:39:07'),
(97, 'App\\Models\\User', 25, 'Personal Access Token', '59716f5b4906421b9bfb7e7747f3b2b0cffefd9a398d5b897c5cc765d9bc2ab2', '[\"*\"]', '2024-12-17 19:44:47', NULL, '2024-12-17 19:39:54', '2024-12-17 19:44:47'),
(100, 'App\\Models\\User', 34, 'Personal Access Token', 'ab2e9a89e26c738f052a3d9056a6195d480631deb64d3dfd41852d8564243656', '[\"*\"]', '2024-12-17 19:58:04', NULL, '2024-12-17 19:57:50', '2024-12-17 19:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('mR8d4px9Vwk9zpQwj7Q1PD7Eds1LCgKl74mx49yL', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemF1WkR3RFNTTmFUdlhtQTNEWnRyUFRTekVXYzcwaUo2SkFTNGJ0eiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734229978);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `no_sim` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `alamat`, `no_telp`, `no_sim`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(25, 'Admin1', 'admin1@gmail.com', '', '', '', NULL, '$2y$12$bgoFRWw4tkQ2xZlI86acpOiPzNlVx0i5sNo3MFxaCw0LhFLqk1Fcq', 'admin', NULL, '2024-12-16 05:40:04', '2024-12-16 05:40:04'),
(29, 'KelompokPW5 Update', 'kelompokpw5@gmail.com', 'Jalan Seturan Raya, Perum APH Blok E II/24, RT 16 RW 05, Kec.Depok, Kel. Caturtunggal, Kab.Sleman, 55281 Kos Perjuangan Blok E II / No.24', '082232438578', '12121245', NULL, '$2y$12$BTI7.sXHotweB.xYvKYOnOHRwRpriZg2gYBszugAq1hs3T5Co2DR6', 'user', NULL, '2024-12-17 19:18:25', '2024-12-17 19:19:39'),
(30, 'User', 'user@gmail.com', 'Seturan', '082232438578', '1', NULL, '$2y$12$9O2zQD0aCMGLyEP90.bJIuhll7QTl6PzxRQIBPrw0XGDZWN0iR3X2', 'user', NULL, '2024-12-17 19:51:21', '2024-12-17 19:51:21'),
(34, 'Admin', 'admin@gmail.com', NULL, NULL, NULL, NULL, '$2y$12$BOQlzH8wBVtdodD4jRSEiuOSP58Wkj2zAYw2s32NzMq85TKoO0knS', 'admin', NULL, '2024-12-17 19:57:20', '2024-12-17 19:57:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobils`
--
ALTER TABLE `mobils`
  ADD PRIMARY KEY (`id_mobil`),
  ADD UNIQUE KEY `mobils_nomor_polisi_unique` (`nomor_polisi`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pembayarans`
--
ALTER TABLE `pembayarans`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `pembayarans_penyewaan_id_foreign` (`penyewaan_id`);

--
-- Indexes for table `pengembalians`
--
ALTER TABLE `pengembalians`
  ADD PRIMARY KEY (`id_pengembalian`),
  ADD KEY `pengembalians_penyewaan_id_foreign` (`penyewaan_id`);

--
-- Indexes for table `penyewaans`
--
ALTER TABLE `penyewaans`
  ADD PRIMARY KEY (`id_penyewaan`),
  ADD KEY `penyewaans_mobil_id_foreign` (`mobil_id`),
  ADD KEY `penyewaans_user_id_foreign` (`user_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_no_sim_unique` (`no_sim`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `mobils`
--
ALTER TABLE `mobils`
  MODIFY `id_mobil` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `pembayarans`
--
ALTER TABLE `pembayarans`
  MODIFY `id_pembayaran` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pengembalians`
--
ALTER TABLE `pengembalians`
  MODIFY `id_pengembalian` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `penyewaans`
--
ALTER TABLE `penyewaans`
  MODIFY `id_penyewaan` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pembayarans`
--
ALTER TABLE `pembayarans`
  ADD CONSTRAINT `pembayarans_penyewaan_id_foreign` FOREIGN KEY (`penyewaan_id`) REFERENCES `penyewaans` (`id_penyewaan`) ON DELETE CASCADE;

--
-- Constraints for table `pengembalians`
--
ALTER TABLE `pengembalians`
  ADD CONSTRAINT `pengembalians_penyewaan_id_foreign` FOREIGN KEY (`penyewaan_id`) REFERENCES `penyewaans` (`id_penyewaan`) ON DELETE CASCADE;

--
-- Constraints for table `penyewaans`
--
ALTER TABLE `penyewaans`
  ADD CONSTRAINT `penyewaans_mobil_id_foreign` FOREIGN KEY (`mobil_id`) REFERENCES `mobils` (`id_mobil`) ON DELETE CASCADE,
  ADD CONSTRAINT `penyewaans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
