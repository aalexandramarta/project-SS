-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2025 at 11:22 PM
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
-- Database: `ss_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `caretaker_id` int(11) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `is_paired` tinyint(1) DEFAULT NULL,
  `is_connected` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emergency`
--

CREATE TABLE `emergency` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `handled` tinyint(1) DEFAULT NULL,
  `occured_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `health`
--

CREATE TABLE `health` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `steps` int(11) DEFAULT NULL,
  `distance(km)` int(11) DEFAULT NULL,
  `calories` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health`
--

INSERT INTO `health` (`id`, `user_id`, `date`, `steps`, `distance(km)`, `calories`) VALUES
(1, 4, '2025-06-08', 10, 0, 0),
(2, 4, '2025-06-08', 30, 0, 0),
(3, 4, '2025-06-13', 38, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `medication`
--

CREATE TABLE `medication` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dosage_mg` varchar(100) DEFAULT NULL,
  `instuction` varchar(255) DEFAULT NULL,
  `times_per_day` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medication`
--

INSERT INTO `medication` (`id`, `user_id`, `name`, `dosage_mg`, `instuction`, `times_per_day`) VALUES
(3, 4, 'Paracetamol', '500g', 'After dinner', NULL),
(4, 4, 'Paracetamol', '500g', 'After dinner', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `id` int(11) NOT NULL,
  `medication_id` int(11) DEFAULT NULL,
  `remind_at` time DEFAULT NULL,
  `frequency` varchar(100) DEFAULT NULL,
  `next_reminder` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`id`, `medication_id`, `remind_at`, `frequency`, `next_reminder`) VALUES
(3, 3, '21:23:00', 'daily', '2025-06-18 17:23:00'),
(4, 4, '21:27:00', 'daily', '2025-06-18 17:27:00');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `weight_kg` int(11) DEFAULT NULL,
  `height_cm` int(11) DEFAULT NULL,
  `has_diabetes` tinyint(1) DEFAULT NULL,
  `has_dementia` tinyint(1) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `provider` varchar(50) DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `birth_date`, `weight_kg`, `height_cm`, `has_diabetes`, `has_dementia`, `created_at`, `provider`) VALUES
(1, 'john.doe@example.com', '$2b$10$efq7vlgaP/.kSOzQc9/7UO4k8yDF.z5.Z1U1qxZrlJ5YG4L.D3w2K', '1990-05-22', 70, 175, 0, 0, '2025-05-22', 'local'),
(2, '1test@gmail.com', '$2b$10$fcrrYOLnWDmrBrFP9G2mN.4Lrox.zp0Vtboos6PiKYOG47S/GQImi', NULL, NULL, NULL, NULL, NULL, '2025-05-23', 'local'),
(3, 'testeoficial818@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-27', 'google'),
(4, '2test@gmail.com', '$2b$10$jDA9DGFeudjBN7YjjWFmeOwfFdXMGu1HEZb45SZHCCtb8ELsUVW4S', NULL, NULL, NULL, NULL, NULL, '2025-06-03', 'local'),
(5, '3test@gmail.com', '$2b$10$32zYp2QjTP2TXkkmu/C8HeSdcWzk7PE61KK1E.kYWHyC7uMF5X2S.', NULL, NULL, NULL, NULL, NULL, '2025-06-04', 'local'),
(6, '5test@gmail.com', '$2b$10$O/b3SJrgSCrOHaSLbgBHDOlhKyJCgrclyCZ43.RT95aj8nFAUIxum', NULL, NULL, NULL, NULL, NULL, '2025-06-18', 'local'),
(7, '6test@gmail.com', '$2b$10$MPUYezHNHGW3UHXB.J16mOi7vULoz7X0hPhsSMM9IIYdtcxV.226O', NULL, NULL, NULL, NULL, NULL, '2025-06-18', 'local');

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `emergencyName` text DEFAULT NULL,
  `emergencyPhone` text DEFAULT NULL,
  `medication` text DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `diseases` text DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`id`, `userId`, `age`, `address`, `gender`, `phone`, `emergencyName`, `emergencyPhone`, `medication`, `allergies`, `diseases`, `name`) VALUES
(1, 2, 88, 'Antwerp', 'Male', '2913321', 'Bill', '2188732', 'None', 'None', 'None', 'John'),
(2, 4, 99, 'Beverly Hills', 'Male', '12393932', 'Joe', '1292331', 'Paracetamol', 'None', 'None', 'Teste');

-- --------------------------------------------------------

--
-- Table structure for table `user_subscription`
--

CREATE TABLE `user_subscription` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `subscription_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `caretaker_id` (`caretaker_id`);

--
-- Indexes for table `emergency`
--
ALTER TABLE `emergency`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`);

--
-- Indexes for table `health`
--
ALTER TABLE `health`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `medication`
--
ALTER TABLE `medication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reminder`
--
ALTER TABLE `reminder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medication_id` (`medication_id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_unique` (`email`);

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `user_subscription`
--
ALTER TABLE `user_subscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `subscription_id` (`subscription_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device`
--
ALTER TABLE `device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emergency`
--
ALTER TABLE `emergency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `health`
--
ALTER TABLE `health`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medication`
--
ALTER TABLE `medication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_subscription`
--
ALTER TABLE `user_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `device_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `device_ibfk_2` FOREIGN KEY (`caretaker_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `emergency`
--
ALTER TABLE `emergency`
  ADD CONSTRAINT `emergency_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`);

--
-- Constraints for table `health`
--
ALTER TABLE `health`
  ADD CONSTRAINT `health_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `medication`
--
ALTER TABLE `medication`
  ADD CONSTRAINT `medication_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `reminder`
--
ALTER TABLE `reminder`
  ADD CONSTRAINT `reminder_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`id`);

--
-- Constraints for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_subscription`
--
ALTER TABLE `user_subscription`
  ADD CONSTRAINT `user_subscription_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_subscription_ibfk_2` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
