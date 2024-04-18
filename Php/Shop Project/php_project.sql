-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2024 at 11:02 AM
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
-- Database: `php_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(250) NOT NULL,
  `admin_email` text NOT NULL,
  `admin_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'admin', 'admin@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_cost` decimal(6,2) NOT NULL,
  `order_status` varchar(100) NOT NULL DEFAULT '"not paid"',
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_phone` int(11) NOT NULL,
  `user_city` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_price` decimal(6,2) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `payment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_category` varchar(100) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_image2` varchar(255) NOT NULL,
  `product_image3` varchar(255) NOT NULL,
  `product_image4` varchar(255) NOT NULL,
  `product_price` decimal(6,2) NOT NULL,
  `product_special_offer` int(2) NOT NULL,
  `product_color` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_category`, `product_description`, `product_image`, `product_image2`, `product_image3`, `product_image4`, `product_price`, `product_special_offer`, `product_color`) VALUES
(11, 'Nike Waffle One Leather', 'casual', 'Nike Waffle One Leather', 'Nike Waffle One Leather1.jpg', 'Nike Waffle One Leather2.jpg', 'Nike Waffle One Leather3.jpg', 'Nike Waffle One Leather4.jpg', 110.00, 0, 'WHITE/LIGHT SAND/BLACK'),
(12, 'Nike Blazer Mid \'77 Multi-Swoosh', 'casual', 'Nike Blazer Mid \'77 Multi-Swoosh', 'Nike Blazer Mid \'77 Multi-Swoosh1.jpg', 'Nike Blazer Mid \'77 Multi-Swoosh2.jpg', 'Nike Blazer Mid \'77 Multi-Swoosh3.jpg', 'Nike Blazer Mid \'77 Multi-Swoosh4.jpg', 93.50, 0, 'WHITE/CREAM'),
(13, 'Nike Blazer Low \'77 Jumbo SE', 'casual', 'Nike Blazer Low \'77 Jumbo SE', 'Nike Blazer Low \'77 Jumbo SE1.jpg', 'Nike Blazer Low \'77 Jumbo SE2.jpg', 'Nike Blazer Low \'77 Jumbo SE3.jpg', 'Nike Blazer Low \'77 Jumbo SE4.jpg', 85.50, 0, 'LIGHT GRAY/GRAY'),
(14, 'Nike Blazer Mid Pro Club', 'casual', 'Nike Blazer Mid Pro Club', 'Nike Blazer Mid Pro Club1.jpg', 'Nike Blazer Mid Pro Club2.jpg', 'Nike Blazer Mid Pro Club3.jpg', 'Nike Blazer Mid Pro Club4.jpg', 95.50, 0, 'WHITE/CREAM/BLACK'),
(15, 'Nike Air Force 1 Low', 'casual', 'Nike Air Force 1 Low', 'Nike Air Force 1 Low1.jpg', 'Nike Air Force 1 Low2.jpg', 'Nike Air Force 1 Low3.jpg', 'Nike Air Force 1 Low4.jpg', 110.00, 0, 'WHITE/GREEN'),
(16, 'Nike Air Max 90', 'casual', 'Nike Air Max 90', 'Nike Air Max 901.jpg', 'Nike Air Max 902.jpg', 'Nike Air Max 903.jpg', 'Nike Air Max 904.jpg', 105.00, 0, 'CREAM/GREEN/BLACK'),
(17, 'Nike Blazer Mid \'77 Jumbo', 'bags', 'Nike Blazer Mid \'77 Jumbo', 'Nike Blazer Mid \'77 Jumbo1.jpg', 'Nike Blazer Mid \'77 Jumbo2.jpg', 'Nike Blazer Mid \'77 Jumbo3.jpg', 'Nike Blazer Mid \'77 Jumbo4.jpg', 82.50, 0, 'WHITE/RED/CREAM'),
(18, 'Nike SB Zoom Blazer Mid Premium Faded Light Dew', 'bags', 'Nike SB Zoom Blazer Mid Premium Faded Light Dew', 'Nike SB Zoom Blazer Mid Premium Faded Light Dew1.jpg', 'Nike SB Zoom Blazer Mid Premium Faded Light Dew2.jpg', 'Nike SB Zoom Blazer Mid Premium Faded Light Dew3.jpg', 'Nike SB Zoom Blazer Mid Premium Faded Light Dew4.jpg', 110.00, 0, 'WHITE/YELLOW/LIGHT GREEN'),
(19, 'Nike Killshot OG', 'casual', 'Nike Killshot OG', 'Nike Killshot OG1.jpg', 'Nike Killshot OG2.jpg', 'Nike Killshot OG3.jpg', 'Nike Killshot OG4.jpg', 54.00, 0, 'CREAM/LIGHT GRAY/BLACK/WHITE'),
(20, 'Nike SB Stefan Janoski Max', 'casual', 'Nike SB Stefan Janoski Max', 'Nike SB Stefan Janoski Max1.jpg', 'Nike SB Stefan Janoski Max2.jpg', 'Nike SB Stefan Janoski Max3.jpg', 'Nike SB Stefan Janoski Max4.jpg', 45.00, 0, 'DARK BLUE/BLACK/IVORY');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`) VALUES
(1, 'edv', 'edv', '68e9c60f238c0da53a4913d937532524');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UX_Constraint` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
