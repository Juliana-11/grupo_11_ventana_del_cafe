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
  `userName` VARCHAR(16) NOT NULL,
  `userLastName` VARCHAR(45) NOT NULL,
  `userEmail` VARCHAR(255) NOT NULL,
  `userAs` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `userAvatar` VARCHAR(1000) NOT NULL,
  `userPhone` INT NOT NULL,
  `userAddress` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userAs_UNIQUE` (`userAs` ASC) ,
  UNIQUE INDEX `useremail_UNIQUE` (`userEmail` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`category` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categoryname_UNIQUE` (`categoryName` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`toastLevel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`toastLevel` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`toastLevel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `toastLevelName` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`product` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(100) NOT NULL,
  `productPrice` INT NOT NULL,
  `productDiscount` INT NOT NULL,
  `productDescription` TEXT(1000) NOT NULL,
  `originProduct` VARCHAR(200) NOT NULL,
  `stock` INT NOT NULL,
  `category_id` INT NOT NULL,
  `toastLevel_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_idx` (`category_id` ASC) ,
  INDEX `toastlvel_id_idx` (`toastLevel_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`productImage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`productImage` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`productImage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productImageName` VARCHAR(1000) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`taste`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`taste` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`taste` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tasteName` VARCHAR(100) NOT NULL,
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
  INDEX `taste_id_idx` (`taste_id` ASC) ,
  INDEX `product_id_idx` (`product_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`order` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `totalProducts` DECIMAL(10,2) NOT NULL,
  `paymentMethod` VARCHAR(100) NOT NULL,
  `shippingMethod` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `iduserbuy_idx` (`user_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventanadelcafe`.`orderItem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventanadelcafe`.`orderItem` ;

CREATE TABLE IF NOT EXISTS `ventanadelcafe`.`orderItem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `originalProduct_id` INT NULL,
  `productName` VARCHAR(45) NOT NULL,
  `productPrice` INT NOT NULL,
  `productDiscount` INT NOT NULL,
  `productDescription` TEXT(1000) NOT NULL,
  `originProduct` VARCHAR(200) NOT NULL,
  `stock` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `order_id_idx` (`order_id` ASC) ,
  INDEX `originalProduct_id_idx` (`originalProduct_id` ASC) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;