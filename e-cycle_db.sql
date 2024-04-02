-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2024 at 09:17 PM
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
-- Database: `e-cycle_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `total_amount`) VALUES
(1, 10, '2024-03-11 18:30:05', 100.00),
(2, 11, '2024-03-14 11:31:45', 100.00),
(4, 12, '2024-03-14 13:27:55', 100.00),
(5, 2, '2024-03-22 13:23:18', 100.00),
(6, 10, '2024-03-27 09:00:50', 100.00),
(7, 12, '2024-03-29 10:43:48', 700.00),
(8, 17, '2024-04-01 17:36:13', 700.00),
(9, 7, '2024-04-01 17:57:47', 100.00),
(10, 19, '2024-04-02 10:36:45', 8000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_per_unit` decimal(10,2) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price_per_unit`, `status`) VALUES
(1, 1, 2, 1, 100.00, 'completed'),
(2, 2, 2, 1, 100.00, 'completed'),
(3, 4, 2, 1, 100.00, 'completed'),
(4, 5, 2, 1, 100.00, 'completed'),
(5, 6, 2, 1, 100.00, 'completed'),
(6, 7, 9, 1, 700.00, 'completed'),
(7, 8, 9, 1, 700.00, 'pending'),
(8, 9, 2, 1, 100.00, 'pending'),
(9, 10, 10, 1, 8000.00, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','deleted') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `quantity`, `description`, `price`, `category`, `image_url`, `date_added`, `status`) VALUES
(2, 'Bike1', 4, 'this is the bike ehe', 100.00, 'casual', 'bike1.jpg', '2024-02-16', 'active'),
(9, 'bmx', 5, 'this is a sports bike for hills', 700.00, 'sports', 'bmx.jpg', '2024-03-29', 'active'),
(10, 'Holdsworth Helm SRAM Force 22 Titanium Road Bike', 2, 'Eponymous to the Helm, the foreboding wind that roars down the mountain side of Great Dun Fell, Britains highest paved road. The Holdsworth Helm is a contemporary titanium road bike. Built with Aerospace Grade 9 3AL-2.5V Titanium tubing, with precise handling and clearance for 32mm rubber. Light, strong, responsive, and comfortable. This is the purists road machine.\r\n', 8000.00, 'sports', 'holdsworth-helm-sram-force-22-titanium-road-bike.jpg', '2024-04-02', 'active'),
(11, 'QITONG Junior Children Kids Bike Bicycle', 3, 'this is a kids bike', 9000.00, 'kids', 'qitong-junior-children-kids-bike-bicycle.jpg', '2024-04-02', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `report_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `report_content` text DEFAULT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` int(12) NOT NULL,
  `status` enum('active','deleted') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `registration_date`, `phone`, `status`) VALUES
(1, 'pres', 'pres@gmail.com', '1234', 'user', '2024-02-13 08:16:26', 721801491, 'active'),
(2, 'lewis', 'lewis@gmail.com', '1234', 'user', '2024-02-13 08:22:15', 704333420, 'active'),
(6, 'vladmir', 'vladmir@gmail.com', '1234', 'user', '2024-02-13 08:23:18', 713047881, 'active'),
(7, 'adewat', 'adewat@gmail.com', '1234', 'user', '2024-02-16 08:48:38', 799078848, 'active'),
(8, 'john', 'wakenya@gmail.com', '12344', 'user', '2024-02-19 05:59:31', 733182526, 'deleted'),
(10, 'user1', 'user1@gmail.com', 'admin123', 'user', '2024-03-11 16:53:28', 799078850, 'active'),
(11, 'kafugi', 'kafugi@gmail.com', '12345678', 'user', '2024-03-14 11:29:50', 711991854, 'active'),
(12, 'testuser1', 'testuser1@gmail.com', '12345678', 'user', '2024-03-14 13:26:03', 711111111, 'active'),
(13, 'admin1', 'admin1@gmail.com', '1234', 'admin', '2024-03-22 12:17:50', 711991854, 'active'),
(15, 'jmx', 'jmx@gmail.com', '1234', 'user', '2024-04-01 17:07:12', 799088882, 'active'),
(16, 'james', 'james@gmail.com', '1234', 'user', '2024-04-01 17:09:42', 799999987, 'active'),
(17, 'jonathan', 'jonathan@gmail.com', '1234', 'user', '2024-04-01 17:35:27', 711998746, 'active'),
(19, 'peter', 'peter@gmail.com', '1234', 'user', '2024-04-02 04:32:14', 788148814, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
