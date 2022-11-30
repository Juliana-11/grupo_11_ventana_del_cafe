-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ventanadelcafe
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ventanadelcafe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ventanadelcafe` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `ventanadelcafe` ;

-- -----------------------------------------------------
-- Table `ventanadelcafe`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`user` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `userlastname` VARCHAR(45) NOT NULL,
  `useremail` VARCHAR(255) NOT NULL,
  `userAs` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `useravatar` VARCHAR(1000) NOT NULL,
  `userphone` INT NOT NULL,
  `useraddress` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userAs_UNIQUE` (`userAs` ASC) VISIBLE,
  UNIQUE INDEX `useremail_UNIQUE` (`useremail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`category` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoryname` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categoryname_UNIQUE` (`categoryname` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`toastlevel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`toastlevel` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`toastlevel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `toastlevelname` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`product` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productname` VARCHAR(100) NOT NULL,
  `productprice` INT NOT NULL,
  `productdiscount` INT NOT NULL,
  `productdescription` TEXT(1000) NOT NULL,
  `productorigin` VARCHAR(200) NOT NULL,
  `stock` INT NOT NULL,
  `category_id` INT NOT NULL,
  `toastlevel_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  INDEX `toastlvel_id_idx` (`toastlevel_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`daysreceive`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`daysreceive` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`daysreceive` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dayname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`day_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`day_user` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`day_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_day` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user_idx` (`id_user` ASC) VISIBLE,
  INDEX `id_day_idx` (`id_day` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`productimage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`productimage` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`productimage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productimagename` VARCHAR(1000) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`taste`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`taste` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`taste` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tastename` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`product_taste`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`product_taste` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`product_taste` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `taste_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `taste_id_idx` (`taste_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`shoppingcart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`shoppingcart` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`shoppingcart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productbuy_id` INT NOT NULL,
  `userbuy_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idproductbuy_idx` (`productbuy_id` ASC) VISIBLE,
  INDEX `iduserbuy_idx` (`userbuy_id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
