USE `pokemons`;

DROP TABLE IF EXISTS `pokemonTrainer`;

/*Table structure for table `pokemon` */
DROP TABLE IF EXISTS `pokemon`;
CREATE TABLE `pokemon` (
  `id` smallint(6) NOT NULL,
  `name` varchar(30),
  `type` smallint(6),
  `height` smallint(6),
  `weight` smallint(6),
  PRIMARY KEY (`id`)
);

/*Table structure for table `pokemonType` */
DROP TABLE IF EXISTS `pokemonType`;
CREATE TABLE `pokemonType` (
  `id` smallint(6) NOT NULL,
  `type` varchar(30),
  PRIMARY KEY (`id`)
);

/*Table structure for table `town` */
DROP TABLE IF EXISTS `town`;
CREATE TABLE `town` (
  `id` smallint(6) NOT NULL,
  `name` varchar(30),
  PRIMARY KEY (`id`)
);

/*Table structure for table `trainer` */
DROP TABLE IF EXISTS `trainer`;
CREATE TABLE `trainer` (
  `id` smallint(6) NOT NULL,
  `name` varchar(30),
  `townID` smallint(6),
  PRIMARY KEY (`id`)
);

/*Table structure for table `pokemonTrainer` */
CREATE TABLE `pokemonTrainer` (
  `pokemonID` smallint(6),
  `trainerID` smallint(6),
  FOREIGN KEY (`pokemonID`) REFERENCES `pokemon` (`id`),
  FOREIGN KEY (`trainerID`) REFERENCES `trainer` (`id`)
);
