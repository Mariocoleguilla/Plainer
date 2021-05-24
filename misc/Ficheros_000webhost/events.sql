-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-05-2021 a las 15:37:32
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id5412417_plainer`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `date` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `event` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `hours` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `date`, `event`, `hours`, `color`) VALUES
(3, '838677600000', 'Nacimiento de Mario', '{\"1\":\"false\",\"2\":\"false\",\"3\":\"false\",\"4\":\"false\",\"5\":\"false\",\"6\":\"false\",\"7\":\"false\",\"8\":\"false\",\"9\":\"false\",\"10\":\"true\",\"11\":\"false\",\"12\":\"false\",\"13\":\"false\",\"14\":\"false\",\"15\":\"false\",\"16\":\"false\",\"17\":\"false\",\"18\":\"false\",\"19\":\"false\",\"20\":\"false\",\"21\":\"false\",\"22\":\"false\",\"23\":\"false\",\"24\":\"false\"}', 'purple');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=261;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
