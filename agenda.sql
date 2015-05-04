# ************************************************************
# Sequel Pro SQL dump
# Versión 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.21)
# Base de datos: ullde
# Tiempo de Generación: 2015-03-19 21:51:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla actes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `actes`;

CREATE TABLE `actes` (
  `id` int(11) NOT NULL,
  `tipo` varchar(20) DEFAULT NULL,
  `data` date NOT NULL,
  `hora` time DEFAULT NULL,
  `titul` varchar(50) NOT NULL DEFAULT '',
  `text` text NOT NULL,
  `local` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `actes` WRITE;
/*!40000 ALTER TABLE `actes` DISABLE KEYS */;

INSERT INTO `actes` (`id`, `tipo`, `data`, `hora`, `titul`, `text`, `local`)
VALUES
	(2,NULL,'2015-03-16','17:00:00','Este es el segon','Aqui vindra el text del even, la explicacio llarga','carrer calvari'),
	(3,NULL,'2015-03-17','12:45:00','El tercer','Imagino que tots els camps contindran sempre informacio	','Placa de lEsglesia'),
	(4,NULL,'2015-03-17','10:00:00','Lo cuart, es un text molt llarg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla metus mi, egestas in sapien et, mattis varius leo. Duis vel vulputate nisl. Aliquam non lorem eros. Vivamus dapibus mauris vitae lacus sollicitudin faucibus. Nam tincidunt scelerisque massa id aliquet. Curabitur sit amet placerat sem. Quisque eget pharetra nisl, sed gravida diam. Nam ullamcorper diam id suscipit auctor.\n\nDuis ante elit, dictum quis suscipit id, tempor id arcu. Phasellus scelerisque suscipit leo, sit amet feugiat mauris fringilla ac. Curabitur eros nibh, tincidunt sed molestie quis, aliquam sit amet lectus. Duis sodales iaculis tellus vitae condimentum. Ut viverra velit mattis nibh finibus, in gravida arcu gravida. Maecenas dapibus augue in ex scelerisque elementum. Duis sollicitudin ultrices iaculis. Ut semper mi eget justo fringilla, in hendrerit odio posuere.','Placa de Bous'),
	(1,NULL,'2015-03-22','22:30:00','Este es el titul del dia primer','Tota esta informacio l\'arriba desde una basÃ¨ de dadsÃ§','Pavello municipal');

/*!40000 ALTER TABLE `actes` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla serveis
# ------------------------------------------------------------

DROP TABLE IF EXISTS `serveis`;

CREATE TABLE `serveis` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) DEFAULT NULL,
  `nombre` text,
  `text` text,
  `horari` text,
  `guardia` tinyint(1) DEFAULT NULL,
  `tlf` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `serveis` WRITE;
/*!40000 ALTER TABLE `serveis` DISABLE KEYS */;

INSERT INTO `serveis` (`id`, `tipo`, `nombre`, `text`, `horari`, `guardia`, `tlf`)
VALUES
	(1,'farmacia','pio','aixo de posar text de relleno es un exercisi vanal i fut , si no fos prerque me va molt be per a reacticar la meconografia','21:10-23:30',1,'977723454'),
	(2,'farmacia','latra','algo diferent per a nesta que sempre ho escric com me surt del anima','21:10-23:30',0,'977723454'),
	(3,'biblioteca','biblioteca','hem de tornar el material que tenim pero urgentment, si no mmmos pegaran el toc i en rao','21:10-23:30',NULL,'977723454'),
	(4,'piscina','piscina','Aqui aniran els horaris de la piscina i demes','10:00 a 13:30h',NULL,'977729865 977724546');

/*!40000 ALTER TABLE `serveis` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
