CREATE DATABASE docentes_sys;
USE docentes_sys;

CREATE TABLE `course` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `instructorName` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `enrollStart` datetime DEFAULT NULL,
  `enrollEnd` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

INSERT INTO `course` VALUES ('asd','asd','asd','asd','asd','2020-04-10 07:30:00','2020-04-10 07:30:00',NULL,NULL,NULL),('BD2020-1','Base de datos','Docentes','Taller','Oscar Arturo Clark Hernandez','2020-05-10 17:30:00','2020-09-10 17:30:00',NULL,NULL,NULL),('erbr','her','rgeg','erg','regr','2020-05-22 12:30:00','2020-05-22 12:30:00','2020-05-22 12:30:00','2020-05-22 12:30:00',NULL),('PROG123','Programación','Docente','Taller','Oscar Arturo Clark Hernández','2020-10-05 12:45:00','2020-10-05 12:45:00',NULL,NULL,NULL),('REDES2020','Redes','Docente','Taller','Oscar Arturo Clark Hernandez','2020-01-01 07:00:00','2020-01-01 07:00:00',NULL,NULL,NULL);

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
)

INSERT INTO `sessions` VALUES ('1YGBOXMzZADLBG3gCOBEBX0Bc3_A6CG7',1591608038,'{\"cookie\":{\"originalMaxAge\":2628003600,\"expires\":\"2020-06-08T09:18:35.994Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":null}'),('CG9BpNShneGlpQdES7G-0jzeHWvcEHVD',1591608699,'{\"cookie\":{\"originalMaxAge\":2628003600,\"expires\":\"2020-06-08T09:20:45.272Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":null}'),('GhV6gE4Zoz_ej4rdl0zMe8zoyXGXnWar',1591607980,'{\"cookie\":{\"originalMaxAge\":2628003600,\"expires\":\"2020-06-08T09:16:03.083Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"admin\",\"password\":\"admin\",\"name\":\"Administrador\",\"lastName\":\"\",\"admin\":1,\"email\":\"admin@docentes.com\"}}'),('J3CxUY-sxtH6NyxNbn0dfyfVoT9vPDf5',1592820159,'{\"cookie\":{\"originalMaxAge\":2628003600,\"expires\":\"2020-06-09T18:19:15.341Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"admin\",\"password\":\"admin\",\"name\":\"Administrador\",\"lastName\":\"\",\"admin\":1,\"email\":\"admin@docentes.com\"}}'),('Wt5jmqpw-yzNgI9rK_dgIMlym80F_FDC',1591607772,'{\"cookie\":{\"originalMaxAge\":2628003600,\"expires\":\"2020-06-08T09:16:00.154Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"admin\",\"password\":\"admin\",\"name\":\"Administrador\",\"lastName\":\"\",\"admin\":1,\"email\":\"admin@docentes.com\"}}'),('fGPCH4ittFeEH7LYev2hUVsq8_-zdq_P',1591608110,'{\"cookie\":{\"originalMaxAge\":2628003600,\"expires\":\"2020-06-08T09:16:12.269Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"admin\",\"password\":\"admin\",\"name\":\"Administrador\",\"lastName\":\"\",\"admin\":1,\"email\":\"admin@docentes.com\"}}');

CREATE TABLE `user` (
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
)
INSERT INTO `user` VALUES ('admin','admin','Administrador','',1,'admin@docentes.com');

ALTER USER 'root'@'localhost' IDENTIFIED BY 'docentes_sys'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'docentes_sys';