-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 35.210.51.89
-- Generation Time: Oct 12, 2019 at 05:39 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m5`
--

-- --------------------------------------------------------

--
-- Table structure for table `faq_posts`
--

CREATE TABLE `faq_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Untitled Entry',
  `desc` varchar(255) NOT NULL DEFAULT '...',
  `content` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `pinned` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_events`
--

CREATE TABLE `guild_events` (
  `eventID` int(11) NOT NULL,
  `eventType` varchar(225) NOT NULL DEFAULT 'GENERIC_EVENT',
  `guild` varchar(30) NOT NULL,
  `target` varchar(30) NOT NULL DEFAULT 'NONE',
  `context` text NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_logs`
--

CREATE TABLE `guild_logs` (
  `id` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guild` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `context` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guild_member_data`
--

CREATE TABLE `guild_member_data` (
  `member` varchar(30) NOT NULL,
  `guild` varchar(30) NOT NULL,
  `identifier` varchar(60) NOT NULL,
  `xpCurrent` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '1',
  `xpTotal` int(11) NOT NULL DEFAULT '0',
  `xpPool` int(11) NOT NULL DEFAULT '750',
  `awayMessage` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_member_warns`
--

CREATE TABLE `guild_member_warns` (
  `guild` varchar(30) NOT NULL,
  `member` varchar(30) NOT NULL,
  `amount` int(11) NOT NULL,
  `triggeredBy` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_planned_events`
--

CREATE TABLE `guild_planned_events` (
  `t` int(11) NOT NULL,
  `scheduleID` varchar(30) NOT NULL,
  `guild` varchar(30) NOT NULL,
  `target` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `context` varchar(255) NOT NULL,
  `at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_scripts`
--

CREATE TABLE `guild_scripts` (
  `ID` varchar(30) NOT NULL,
  `Guild` varchar(30) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Activator` varchar(255) NOT NULL,
  `Conditions` text NOT NULL,
  `Actions` text NOT NULL,
  `ActivatedCount` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_settings`
--

CREATE TABLE `guild_settings` (
  `guild` varchar(255) NOT NULL,
  `addDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `prefix` varchar(10) NOT NULL DEFAULT 'm!',
  `lang` varchar(10) NOT NULL DEFAULT 'en_US',
  `disabledFeatures` text NOT NULL,
  `useFuzzyTime` tinyint(1) NOT NULL DEFAULT '1',
  `disabledCommands` text NOT NULL,
  `mods` text NOT NULL,
  `admins` text NOT NULL,
  `roomsEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `roomsWhitelist` text NOT NULL,
  `roomsBlacklist` text NOT NULL,
  `roomsDefaults` text NOT NULL,
  `roomsPermissions` text NOT NULL,
  `roomsCategory` varchar(30) NOT NULL DEFAULT 'NONE',
  `roomsCategoryText` varchar(30) NOT NULL DEFAULT 'NONE',
  `roomsSummonChannel` varchar(30) NOT NULL DEFAULT 'NONE',
  `roomsType` varchar(10) NOT NULL DEFAULT 'VOICE',
  `roomsInactiveTimer` int(11) NOT NULL DEFAULT '60',
  `logging` text NOT NULL,
  `levels` text NOT NULL,
  `autoMod` text NOT NULL,
  `modAutorole` varchar(30) NOT NULL DEFAULT 'NONE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild_settings_old`
--

CREATE TABLE `guild_settings_old` (
  `guild` varchar(255) NOT NULL,
  `addDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `prefix` varchar(10) NOT NULL DEFAULT 'm!',
  `lang` varchar(10) NOT NULL DEFAULT 'en_US',
  `disabledFeatures` text NOT NULL,
  `useFuzzyTime` tinyint(1) NOT NULL DEFAULT '1',
  `disabledCommands` text NOT NULL,
  `mods` text NOT NULL,
  `admins` text NOT NULL,
  `roomsEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `roomsWhitelist` text NOT NULL,
  `roomsBlacklist` text NOT NULL,
  `roomsDefaults` text NOT NULL,
  `roomsPermissions` text NOT NULL,
  `roomsCategory` varchar(30) NOT NULL DEFAULT 'NONE',
  `roomsCategoryText` varchar(30) NOT NULL DEFAULT 'NONE',
  `roomsSummonChannel` varchar(30) NOT NULL DEFAULT 'NONE',
  `roomsType` varchar(10) NOT NULL DEFAULT 'VOICE',
  `roomsInactiveTimer` int(11) NOT NULL DEFAULT '60',
  `logging` text NOT NULL,
  `levels` text NOT NULL,
  `autoMod` text NOT NULL,
  `modAutorole` varchar(30) NOT NULL DEFAULT 'NONE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `private_rooms`
--

CREATE TABLE `private_rooms` (
  `roomID` varchar(30) NOT NULL,
  `GuildID` varchar(30) NOT NULL,
  `VoiceChannel` varchar(30) NOT NULL,
  `TextChannel` varchar(30) NOT NULL,
  `Owner` varchar(30) NOT NULL,
  `lastActive` varchar(100) NOT NULL,
  `Revokable` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `sae` int(1) NOT NULL DEFAULT '1',
  `commands` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `identifier` varchar(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `user` varchar(30) NOT NULL,
  `known_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `currency` int(11) NOT NULL DEFAULT '0',
  `is_admin` int(11) NOT NULL DEFAULT '0',
  `is_translator` tinyint(1) NOT NULL DEFAULT '0',
  `is_patreon` tinyint(1) NOT NULL DEFAULT '0',
  `is_premium` tinyint(1) NOT NULL DEFAULT '0',
  `profile_background` varchar(50) NOT NULL DEFAULT 'default',
  `profile_badges` varchar(255) NOT NULL DEFAULT '[]',
  `bio` text NOT NULL,
  `notifySettings` varchar(255) NOT NULL,
  `ban_content` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_stickers`
--

CREATE TABLE `user_stickers` (
  `sticker` varchar(30) NOT NULL,
  `author` varchar(30) NOT NULL,
  `code` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `weblog`
--

CREATE TABLE `weblog` (
  `log` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guild` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `audit` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `executor` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `target` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `extra` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `timestamp` int(11) NOT NULL,
  `sql_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `logged` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `weblog_overview`
--

CREATE TABLE `weblog_overview` (
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `guild` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `extra` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `count` int(11) NOT NULL,
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `web_data`
--

CREATE TABLE `web_data` (
  `option` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faq_posts`
--
ALTER TABLE `faq_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `guild_events`
--
ALTER TABLE `guild_events`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `guild_member_data`
--
ALTER TABLE `guild_member_data`
  ADD PRIMARY KEY (`identifier`);

--
-- Indexes for table `guild_planned_events`
--
ALTER TABLE `guild_planned_events`
  ADD PRIMARY KEY (`t`);

--
-- Indexes for table `guild_scripts`
--
ALTER TABLE `guild_scripts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `guild_settings`
--
ALTER TABLE `guild_settings`
  ADD PRIMARY KEY (`guild`);

--
-- Indexes for table `guild_settings_old`
--
ALTER TABLE `guild_settings_old`
  ADD PRIMARY KEY (`guild`);

--
-- Indexes for table `private_rooms`
--
ALTER TABLE `private_rooms`
  ADD PRIMARY KEY (`roomID`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`sae`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`identifier`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`user`);

--
-- Indexes for table `user_stickers`
--
ALTER TABLE `user_stickers`
  ADD PRIMARY KEY (`sticker`),
  ADD UNIQUE KEY `sticker` (`sticker`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `weblog`
--
ALTER TABLE `weblog`
  ADD PRIMARY KEY (`log`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faq_posts`
--
ALTER TABLE `faq_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guild_events`
--
ALTER TABLE `guild_events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guild_planned_events`
--
ALTER TABLE `guild_planned_events`
  MODIFY `t` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
