
INSERT INTO `Persons` (`Id`, `firstName`, `lastName`, `Phone`, `Email`, `birthDate`) VALUES (NULL, 'Jan', 'Brobak', '33', 'jan@gmail.com', '2014-10-05');


INSERT INTO `Persons` (`Id`, `firstName`, `lastName`, `Phone`, `Email`, `birthDate`) VALUES (NULL, 'Jakob', 'Nielsen', '24', 'jakob@gmail.com', '2013-10-05');


INSERT INTO `Persons` (`Id`, `firstName`, `lastName`, `Phone`, `Email`, `birthDate`) VALUES (NULL, 'Jens', 'Skrubbeltrang', '11', 'jens@gmail.com', '2012-10-05');


INSERT INTO `Projects`(`Id`, `person_Id`, `name`, `description`, `status`, `yarnProductName`, `yarnColorCode`, `yarnColor`,`yarnLength`, `needleSize`, `batchNr`, `notes`, `counter`) VALUES (NULL,'1','trøje','blå','Åben','Bumbo','206','lyseblå','170','2','1003','blive færdig til maj','6');


INSERT INTO `Projects`(`Id`, `person_Id`, `name`, `description`, `status`, `yarnProductName`, `yarnColorCode`, `yarnColor`,`yarnLength`, `needleSize`, `batchNr`, `notes`, `counter`) VALUES (NULL,'2','bukser','rød','Igangværende','Anna','22491','mørkerød','160','4','162065','Svært at lave','10');


INSERT INTO `Projects`(`Id`, `person_Id`, `name`, `description`, `status`, `yarnProductName`, `yarnColorCode`, `yarnColor`,`yarnLength`, `needleSize`, `batchNr`, `notes`, `counter`) VALUES (NULL,'3','hue','grøn','Færdig','Tykke Bertha','102','darkgreen','50','6','505','Ikke så ringe endda','100');


INSERT INTO `Projects_PicturePaths`(`Id`, `project_Id`, `uploadPath`, `description`) VALUES (NULL,'1','Google Drive/path/10.png', 'billede1');


INSERT INTO `Projects_PicturePaths`(`Id`, `project_Id`, `uploadPath`, `description`) VALUES (NULL,'1','Google Drive/path/10.jpg', 'billede2');


INSERT INTO `Projects_PicturePaths`(`Id`, `project_Id`, `uploadPath`, `description`) VALUES (NULL,'2','Google Drive/path/10.bitmap', NULL);


INSERT INTO `Projects_RecipePaths`(`Id`, `project_Id`, `uploadPath`, `bookPage`, `link`, `description`) VALUES (NULL,'1', NULL, NULL, 'http://www.garnopskrifter.dk/lyseblåtrøje.pdf', 'lyseblåtrøje');


INSERT INTO `Projects_RecipePaths`(`Id`, `project_Id`, `uploadPath`, `bookPage`, `link`, `description`) VALUES (NULL,'1', NULL, 'Alt om Hækling - side 3', NULL, 'trøje');


INSERT INTO `Projects_RecipePaths`(`Id`, `project_Id`, `uploadPath`, `bookPage`, `link`, `description`) VALUES (NULL,'2','Google Drive/path/darkgreensweater.docx', NULL, NULL, NULL);
