-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 27, 2023 at 04:50 AM
-- Server version: 8.0.31
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cmt` varchar(255) NOT NULL,
  `commenterUserId` int NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `commenterUserId` (`commenterUserId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `cmt`, `commenterUserId`, `postId`, `createdAt`) VALUES
(2, 'Best movie', 11, 17, '2023-08-12 15:38:47'),
(3, 'I like this movie', 13, 17, '2023-08-09 15:38:40'),
(4, 'I like this house', 13, 16, '2023-08-18 15:38:22'),
(5, 'aa', 13, 18, '2023-08-20 16:31:17'),
(6, 'asdfe', 13, 18, '2023-08-20 16:31:29'),
(7, 'I love this movie', 12, 18, '2023-08-21 08:45:21'),
(8, 'I like this post', 14, 4, '2023-08-21 11:45:39'),
(9, 'I like this comment', 12, 26, '2023-08-25 09:31:18');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `userId`, `postId`) VALUES
(2, 12, 18),
(4, 12, 17),
(5, 13, 17),
(6, 13, 16),
(7, 12, 16),
(8, 12, 15),
(9, 12, 24),
(10, 12, 23);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `description`, `img`, `userId`, `createdAt`) VALUES
(2, 'this is post by Ajeet', '', 12, '2023-08-19 03:25:23'),
(3, 'new description', '', 11, '2023-08-19 03:25:40'),
(4, 'This is post by praima', 'THis is image', 13, '2023-08-19 11:11:54'),
(5, 'hi testing', 'sdfd', 12, '2023-08-19 17:38:33'),
(6, 'hi testing1', NULL, 12, '2023-08-19 17:42:28'),
(7, 'hi testing2', NULL, 12, '2023-08-19 18:01:30'),
(8, 'afsde', NULL, 12, '2023-08-19 18:06:56'),
(9, 'New post from Aj', NULL, 12, '2023-08-19 18:10:48'),
(10, 'post with img', '1692450396651Screenshot (16).png', 13, '2023-08-19 18:36:36'),
(12, 'Latest watched movies', '1692500647355allAvengers#^.jpg', 12, '2023-08-20 08:34:07'),
(13, 'Captain america', '1692500667065cap-america.jpg', 12, '2023-08-20 08:34:27'),
(14, '', '', 12, '2023-08-20 08:39:55'),
(15, 'Let\'s see', '1692501471511comp1.jpg', 12, '2023-08-20 08:47:51'),
(16, 'I love this site', '1692501562972home.jpg', 12, '2023-08-20 08:49:22'),
(17, 'Hi ', '1692501637537cap-america.jpg', 12, '2023-08-20 08:50:37'),
(18, 'Post to test comment', '1692526002146thor.jpg', 12, '2023-08-20 15:36:42'),
(19, 'Post by me', '', 14, '2023-08-21 11:44:56'),
(23, 'Yes', '', 13, '2023-08-24 09:10:04'),
(24, 'three', '', 13, '2023-08-24 09:10:14'),
(26, '25th september', '1692936062540comp doc.PNG', 12, '2023-08-25 09:31:02');

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
CREATE TABLE IF NOT EXISTS `relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int NOT NULL,
  `followedUserId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `followedUserId` (`followedUserId`),
  KEY `followerUserId` (`followerUserId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `relationships`
--

INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES
(1, 12, 13),
(5, 12, 11),
(11, 14, 13),
(12, 13, 12);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
CREATE TABLE IF NOT EXISTS `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `coverPic` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profilePic` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(50) NOT NULL,
  `website` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`) VALUES
(11, 'Aman', 'aman@gmail.com', '$2b$10$2UOSGeX.omwFkJniZsKte.iH7xwu5LSs/aaKzkvlYrsanj.AYBZ.6', 'Aman chaudhary', '', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80', '', ''),
(12, 'Ajeet990', 'aj@gmail.com', '$2b$10$vakdhFDWHgI76uOnT.Ro5.Rz.fIUV7/prq6tIO0Y8gfkeloXFuhP6', 'Ajeet', '1692843579794comp1.jpg', '1692843579810icon-5359553_1280.webp', '', ''),
(13, 'Pratima990', 'bhima@gmail.com', '$2b$10$dKALHT4dZRiVxL9gCyQpOemgSK4FE2YtpfdHJxqH9iRcSwhsnKPti', 'pra', '1692940638449Capture.PNG', '1692940638437two.jpg', 'patharahiya', 'newweb.com'),
(14, 'Ghane990', 'ghane@gmail.com', '$2b$10$Uu/sLFosGcQvgG4uEnUe8u9qRcevrl8CJOB9J60IB5wkluUufnzAS', 'dummi', '', '', 'wer', 'wege');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`commenterUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationships`
--
ALTER TABLE `relationships`
  ADD CONSTRAINT `relationships_ibfk_1` FOREIGN KEY (`followedUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationships_ibfk_2` FOREIGN KEY (`followerUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
