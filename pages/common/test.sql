/*
 Navicat Premium Data Transfer

 Source Server         : ck
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost:3306
 Source Schema         : PalmtopHospital

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : 65001

 Date: 18/10/2022 14:39:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Evaluate
-- ----------------------------
DROP TABLE IF EXISTS `Evaluate`;
CREATE TABLE `Evaluate` (
  `eid` varchar(255) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `age` varchar(256) DEFAULT NULL,
  `sex` varchar(256) DEFAULT NULL,
  `Payment` varchar(256) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `education` varchar(256) DEFAULT NULL,
  `healthy` varchar(256) DEFAULT NULL,
  `clean` varchar(256) DEFAULT NULL,
  `technology` varchar(256) DEFAULT NULL,
  `attitude` varchar(256) DEFAULT NULL,
  `comments` varchar(256) DEFAULT NULL,
  `recommend` varchar(256) DEFAULT NULL,
  `hooby` varchar(256) DEFAULT NULL,
  `feedbacks` varchar(256) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `hid` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TAsker
-- ----------------------------
DROP TABLE IF EXISTS `TAsker`;
CREATE TABLE `TAsker` (
  `aId` varchar(255) NOT NULL DEFAULT '',
  `aName` varchar(128) DEFAULT NULL,
  `aSex` varchar(16) DEFAULT NULL,
  `aIDCard` varchar(128) DEFAULT NULL,
  `aPhone` varchar(64) DEFAULT NULL,
  `openId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`aId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TCollection
-- ----------------------------
DROP TABLE IF EXISTS `TCollection`;
CREATE TABLE `TCollection` (
  `cId` varchar(255) NOT NULL,
  `openId` varchar(64) DEFAULT NULL,
  `hId` varchar(255) DEFAULT NULL,
  `dId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for TDoctor
-- ----------------------------
DROP TABLE IF EXISTS `TDoctor`;
CREATE TABLE `TDoctor` (
  `dId` varchar(255) NOT NULL,
  `dName` varchar(64) DEFAULT NULL,
  `dImg` varchar(64) DEFAULT NULL,
  `dRole` varchar(16) DEFAULT NULL,
  `dIntroduce` varchar(64) DEFAULT NULL,
  `dReceiveNum` int(11) DEFAULT NULL,
  `dCount` int(11) DEFAULT NULL,
  `dFee` int(11) DEFAULT NULL,
  `hId` varchar(255) NOT NULL,
  `oId` varchar(255) DEFAULT NULL,
  `rId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dId`),
  KEY `hId` (`hId`),
  KEY `oId` (`oId`),
  KEY `rId` (`rId`),
  CONSTRAINT `TDoctor_ibfk_1` FOREIGN KEY (`hId`) REFERENCES `THospital` (`hId`),
  CONSTRAINT `TDoctor_ibfk_2` FOREIGN KEY (`oId`) REFERENCES `toffice` (`oId`),
  CONSTRAINT `TDoctor_ibfk_3` FOREIGN KEY (`rId`) REFERENCES `troom` (`rId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TEnvironment
-- ----------------------------
DROP TABLE IF EXISTS `TEnvironment`;
CREATE TABLE `TEnvironment` (
  `EnvirId` varchar(255) NOT NULL,
  `EnvirName` varchar(255) DEFAULT NULL,
  `EnvirOpenId` varchar(255) DEFAULT NULL,
  `platformId` int(10) NOT NULL,
  PRIMARY KEY (`EnvirId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TFeedback
-- ----------------------------
DROP TABLE IF EXISTS `TFeedback`;
CREATE TABLE `TFeedback` (
  `fid` varchar(255) NOT NULL,
  `fcontent` varchar(255) DEFAULT NULL,
  `Thid` varchar(255) NOT NULL,
  `openid` varchar(255) NOT NULL,
  PRIMARY KEY (`fid`),
  KEY `Thid` (`Thid`),
  CONSTRAINT `TFeedback_ibfk_1` FOREIGN KEY (`Thid`) REFERENCES `THospital` (`hId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TGuaHao
-- ----------------------------
DROP TABLE IF EXISTS `TGuaHao`;
CREATE TABLE `TGuaHao` (
  `gId` varchar(255) NOT NULL,
  `gTime` varchar(32) DEFAULT NULL,
  `roomName` varchar(32) DEFAULT NULL,
  `gIntroduce` varchar(255) DEFAULT NULL,
  `aId` varchar(255) DEFAULT NULL,
  `dId` varchar(255) DEFAULT NULL,
  `timePeriod` int(11) DEFAULT NULL,
  `openId` varchar(128) DEFAULT NULL,
  `gPayStatus` int(11) DEFAULT NULL,
  `gOrder` varchar(64) DEFAULT NULL,
  `hName` varchar(64) DEFAULT NULL,
  `dateTimes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gId`),
  KEY `uId` (`aId`),
  KEY `dId` (`dId`),
  CONSTRAINT `TGuaHao_ibfk_2` FOREIGN KEY (`dId`) REFERENCES `TDoctor` (`dId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for THealthy
-- ----------------------------
DROP TABLE IF EXISTS `THealthy`;
CREATE TABLE `THealthy` (
  `id` varchar(255) NOT NULL,
  `healthyTitle` varchar(255) DEFAULT NULL,
  `healthyCategory` int(10) DEFAULT NULL,
  `healthyAwart` varchar(255) DEFAULT NULL,
  `healthyTime` varchar(255) DEFAULT NULL,
  `healthySource` varchar(255) DEFAULT NULL,
  `healthyForeword` varchar(255) DEFAULT NULL,
  `healthyImg` varchar(255) DEFAULT NULL,
  `healthyContent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for THospital
-- ----------------------------
DROP TABLE IF EXISTS `THospital`;
CREATE TABLE `THospital` (
  `hId` varchar(255) NOT NULL,
  `hName` varchar(255) DEFAULT NULL,
  `hRate` varchar(255) DEFAULT NULL,
  `hGrade` varchar(255) DEFAULT NULL,
  `hType` varchar(255) DEFAULT NULL,
  `hAddress` varchar(255) DEFAULT NULL,
  `hDistance` varchar(255) DEFAULT NULL,
  `hCity` varchar(255) DEFAULT NULL,
  `hAttitude` varchar(255) DEFAULT NULL,
  `hEnviroment` varchar(255) DEFAULT NULL,
  `hImg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TNotice
-- ----------------------------
DROP TABLE IF EXISTS `TNotice`;
CREATE TABLE `TNotice` (
  `nId` varchar(255) NOT NULL COMMENT '公告代F码',
  `nTitle` varchar(255) DEFAULT NULL COMMENT '公告名称',
  `nTime` varchar(255) DEFAULT NULL COMMENT '公告发布时间',
  `nContent` varchar(255) DEFAULT NULL COMMENT '公告发布内容',
  `hId` varchar(255) NOT NULL COMMENT '医院ID',
  PRIMARY KEY (`nId`,`hId`) USING BTREE,
  KEY `hId` (`hId`),
  CONSTRAINT `TNotice_ibfk_1` FOREIGN KEY (`hId`) REFERENCES `THospital` (`hId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TOffice
-- ----------------------------
DROP TABLE IF EXISTS `TOffice`;
CREATE TABLE `TOffice` (
  `oId` varchar(255) NOT NULL,
  `oName` varchar(64) DEFAULT NULL,
  `hId` varchar(255) NOT NULL,
  PRIMARY KEY (`oId`,`hId`) USING BTREE,
  KEY `hId` (`hId`),
  KEY `oId` (`oId`),
  CONSTRAINT `TOffice_ibfk_1` FOREIGN KEY (`hId`) REFERENCES `THospital` (`hId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TPlatform
-- ----------------------------
DROP TABLE IF EXISTS `TPlatform`;
CREATE TABLE `TPlatform` (
  `platformId` varchar(255) NOT NULL,
  `platformName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`platformId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TRoom
-- ----------------------------
DROP TABLE IF EXISTS `TRoom`;
CREATE TABLE `TRoom` (
  `rId` varchar(255) NOT NULL,
  `rName` varchar(64) DEFAULT NULL,
  `hId` varchar(255) NOT NULL,
  `oId` varchar(255) NOT NULL,
  PRIMARY KEY (`rId`,`oId`,`hId`) USING BTREE,
  KEY `hId` (`hId`),
  KEY `oId` (`oId`),
  CONSTRAINT `TRooms_ibfk_1` FOREIGN KEY (`hId`) REFERENCES `THospital` (`hId`),
  CONSTRAINT `TRooms_ibfk_2` FOREIGN KEY (`oId`) REFERENCES `TOffice` (`oId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TSchedule
-- ----------------------------
DROP TABLE IF EXISTS `TSchedule`;
CREATE TABLE `TSchedule` (
  `sId` varchar(255) NOT NULL,
  `sMorningNum` int(11) DEFAULT NULL,
  `sAfternoonNum` int(11) DEFAULT NULL,
  `dId` varchar(255) DEFAULT NULL,
  `dayOfWeek` int(255) DEFAULT NULL,
  `flag` int(10) DEFAULT NULL,
  `timePeriod` int(10) DEFAULT NULL,
  PRIMARY KEY (`sId`),
  KEY `dId` (`dId`),
  CONSTRAINT `TSchedule_ibfk_1` FOREIGN KEY (`dId`) REFERENCES `TDoctor` (`dId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TUser
-- ----------------------------
DROP TABLE IF EXISTS `TUser`;
CREATE TABLE `TUser` (
  `openid` varchar(255) NOT NULL,
  `uPassword` varchar(255) DEFAULT NULL,
  `uName` varchar(255) DEFAULT NULL,
  `uImg` varchar(255) DEFAULT NULL,
  `uRegisterTime` varchar(255) DEFAULT NULL,
  `uEnvirn` varchar(255) DEFAULT NULL,
  `uFlag` varchar(255) DEFAULT NULL,
  `uPhone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`openid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
