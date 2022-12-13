-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2022 a las 16:45:18
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ventanadelcafe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `categoryName`) VALUES
(2, 'Belleza'),
(1, 'Consumo'),
(3, 'Licores'),
(4, 'Souvenirs');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `totalProducts` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `shippingMethod` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `originalProduct_id` int(11) DEFAULT NULL,
  `productName` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `productPrice` int(11) NOT NULL,
  `productDiscount` int(11) NOT NULL,
  `productDescription` text COLLATE utf8_unicode_ci NOT NULL,
  `originProduct` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `stock` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `productName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `productPrice` int(11) NOT NULL,
  `productDiscount` int(11) NOT NULL,
  `productDescription` text COLLATE utf8_unicode_ci NOT NULL,
  `originProduct` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `toastLevel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `productName`, `productPrice`, `productDiscount`, `productDescription`, `originProduct`, `stock`, `category_id`, `toastLevel_id`) VALUES
(1, 'Café Quindío', 14000, 0, 'Este es uno de los cafés más populares en el país, especialmente su marca. Se da en el departamento del Quindío y ofrece una gran variedad de presentaciones de café en grano y molidos pero el Gourmet es uno de los que más se venden debido a su intenso sabor.', 'Quindío, Colombia', 5, 1, 2),
(2, 'Juan valdez café', 34950, 5, 'Café intenso con notas a nuez de avellana y residual cremoso a chocolate. Es la montaña costera más alta del mundo, un lugar único que contiene selva, bosque y páramo al mismo tiempo, donde se cultiva café bajo la sombra de los árboles nativos.', 'Sierra nevada', 5, 1, 1),
(3, 'Café Ginebras', 28679, 10, 'Café Mujeres Cafeteras Ginebras, es un café excelso tipo exportación. Origen Valle del Cauca. Cultivado por nuestras mujeres caficultoras hoy nos entregan una cosecha colmada de vivencias enmarcadas en diversas circunstancias que, finalmente, las condujo por los hermosos caminos del café.', 'Valle del Cauca', 5, 1, 2),
(4, 'Cafe Bahareque', 34528, 15, 'Disfrute los sabores del Norte del Valle a través del café tostado Estate La finca, un café con notas cítricas y florales que te va a encantar.', 'El Águila Colombia', 5, 1, 2),
(5, 'Café Matiz', 36987, 20, 'Desde las altas montañas antioqueñas a los paladares más exquisitos. Así podríamos titular el viaje directo que hace el Café Matiz para convertirse en uno de los principales referentes de lo que es un sibarita colombiano.', 'Antioquia', 5, 1, 2),
(6, 'Café Martinez', 25874, 25, 'Una variedad de origen puro que tiene un sabor más suave, con aroma pronunciado y cuerpo liviano.', 'Antioquia', 5, 1, 2),
(7, 'Café Mariscal', 14563, 0, 'Su excelente calidad y frescura garantizan siempre un delicioso aroma, su punto exacto de tostión y molienda permiten disfrutar del mejor sabor.', 'Eje Cafetero', 5, 1, 2),
(8, 'Café Buendía', 37915, 5, 'Café Buendía Liofilizado, es un Café con un aroma dulce frutal y un sabor balanceado, propio del café 100% colombiano.', 'Eje Cafetero', 5, 1, 2),
(9, 'Café Sello Rojo', 37915, 15, 'Café Sello Rojo', 'Eje Cafetero', 5, 1, 1),
(10, 'Nescafé Clásico', 42100, 20, 'Es el café soluble por excelencia. Aunque no puede igualar el aroma y la textura de un café de máquina barista, para ser un café soluble, es muy aceptable.', 'Antioquia', 5, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productimage`
--

CREATE TABLE `productimage` (
  `id` int(11) NOT NULL,
  `productImageName` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `productimage`
--

INSERT INTO `productimage` (`id`, `productImageName`, `product_id`) VALUES
(1, '1670941639119.jpg', 1),
(2, '1670942342287.jpg', 2),
(3, '1670943202202.jpg', 3),
(4, '1670943443877.jpg', 4),
(5, '1670944647645.jpg', 5),
(6, '1670943884706.jpg', 6),
(7, '1670943991539.jpg', 7),
(8, '1670944125854.jpg', 8),
(9, '1670944237572.jpg', 9),
(10, '1670944337485.jpg', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_taste`
--

CREATE TABLE `product_taste` (
  `id` int(11) NOT NULL,
  `taste_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `product_taste`
--

INSERT INTO `product_taste` (`id`, `taste_id`, `product_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 1, 4),
(5, 1, 5),
(6, 6, 6),
(7, 1, 7),
(8, 3, 8),
(9, 1, 9),
(10, 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `id` int(11) NOT NULL,
  `productbuy_id` int(11) NOT NULL,
  `userbuy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taste`
--

CREATE TABLE `taste` (
  `id` int(11) NOT NULL,
  `tasteName` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `taste`
--

INSERT INTO `taste` (`id`, `tasteName`) VALUES
(1, 'Chocolate'),
(2, 'Notas de piña'),
(3, 'Noyas de naranja'),
(4, 'Panela'),
(5, 'Chocolate negro'),
(6, 'Jugo de caña'),
(7, 'No aplica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `toastlevel`
--

CREATE TABLE `toastlevel` (
  `id` int(11) NOT NULL,
  `toastLevelName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `toastlevel`
--

INSERT INTO `toastlevel` (`id`, `toastLevelName`) VALUES
(1, 'Oscuro'),
(2, 'Medio'),
(3, 'No aplica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `userName` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `userLastName` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `userEmail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userAs` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `userAvatar` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `userPhone` int(11) NOT NULL,
  `userAddress` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `userName`, `userLastName`, `userEmail`, `userAs`, `password`, `userAvatar`, `userPhone`, `userAddress`) VALUES
(2, 'Susana', 'Restrepo', 'susanarestrepo@gmail.com', 'susi11', '$2a$10$q8o/CGblAOrwJlpGOWJ8iODPvqTjMdDWrn289lhsun6DJLKAwM3uW', '1670945178840_img_.jpg', 11001100, 'calle 11'),
(3, 'Diana', 'Ramirez', 'dianaramirez@gmail.com', 'diana22', '$2a$10$wxDIfNgLXDhazklgdQvIeeQTZJi4FeLaxtfm9FJNbs2BlYHA1nV4C', '1670945335096_img_.jpg', 22002200, 'calle 22'),
(4, 'Mariana', 'Palacio', 'marianapalacio@gmail.com', 'mariana33', '$2a$10$AwfYr3CGSU860P/O5nOYYuFz8xNzLUueZ1MTyQn6D7p07HfFkBOsK', '1670945393916_img_.jpg', 33003300, 'calle33'),
(5, 'Juliana', 'Bedoya', 'julianabedoya@gmail.com', 'juliana44', '$2a$10$/kCxRoTHVRKvxgRS8lf6xuF5fcZzkl4krFd0CD6Hfki08kl96lL2W', '1670945501147_img_.jpg', 44004400, 'calle44'),
(6, 'Sofia', 'Zapata', 'sofiazapata@gmail.com', 'sofia55', '$2a$10$Kk33WBRlMi7MzEo57PSk/.c/ShZFHMbxSW4Jp02YrChs92X4OLEYm', '1670945550961_img_.jpg', 55005500, 'calle55'),
(7, 'Alexander', 'Mejia', 'alexandermejia@gmail.com', 'alexander66', '$2a$10$TpHARPwWZZuBDTLmx07GneI8Wgg6FHwgxBODDAimXYjAT0xWuOgqG', '1670945655639_img_.jpg', 66006600, 'calle66'),
(8, 'Ferney', 'Giraldo', 'ferneygiraldo@gmail.com', 'ferney77', '$2a$10$z83JsT6.p39h/cLsVjpZ8uy0fzqr8FQl78Lw3vbWbhsuZRuc9P6Rm', '1670945727328_img_.jpg', 66006600, 'calle66'),
(9, 'Thomas', 'Rios', 'thomasrios@gmail.com', 'thomas88', '$2a$10$9Jzx1DKylrkW58hUkBq.peM8zpCoOCeybzmDedxNhjCiN7TGD9.v2', '1670945801139_img_.jpg', 77007700, 'cale77'),
(10, 'Luis', 'Montero', 'luismontero@gmail.com', 'luis88', '$2a$10$WRA892XDZwfESaSrKqXEUOXYRKJLkYlLH3rSmFSLXHtmNncbiUPIa', '1670945906921_img_.jpg', 99009900, 'calle99'),
(11, 'Gonzalo', 'Pelizza', 'gonzalopelizza@gmail.com', 'gonzalo1010', '$2a$10$CieTOaI2jR.kapLgFqPKQ.uABLltRYVKmI12B4kcyQUygxovf3K0u', '1670946016453_img_.jpg', 1010001010, 'calle10-10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categoryname_UNIQUE` (`categoryName`);

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iduserbuy_idx` (`user_id`);

--
-- Indices de la tabla `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id_idx` (`order_id`),
  ADD KEY `originalProduct_id_idx` (`originalProduct_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id_idx` (`category_id`),
  ADD KEY `toastlvel_id_idx` (`toastLevel_id`);

--
-- Indices de la tabla `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id_idx` (`product_id`);

--
-- Indices de la tabla `product_taste`
--
ALTER TABLE `product_taste`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taste_id_idx` (`taste_id`),
  ADD KEY `product_id_idx` (`product_id`);

--
-- Indices de la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idproductbuy_idx` (`productbuy_id`),
  ADD KEY `iduserbuy_idx` (`userbuy_id`);

--
-- Indices de la tabla `taste`
--
ALTER TABLE `taste`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `toastlevel`
--
ALTER TABLE `toastlevel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userAs_UNIQUE` (`userAs`),
  ADD UNIQUE KEY `useremail_UNIQUE` (`userEmail`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productimage`
--
ALTER TABLE `productimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `product_taste`
--
ALTER TABLE `product_taste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `shoppingcart`
--
ALTER TABLE `shoppingcart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taste`
--
ALTER TABLE `taste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `toastlevel`
--
ALTER TABLE `toastlevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
