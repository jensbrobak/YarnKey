CREATE TABLE Persons (
    Id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255),
    Phone int(10),
    Email varchar(255) NOT NULL,
    birthDate DATE,
    PRIMARY KEY (Id),
    UNIQUE (Id)
  );

CREATE TABLE Projects_Status (
    Id int NOT NULL AUTO_INCREMENT,
    status varchar(255) NOT NULL,
    PRIMARY KEY (Id),
    UNIQUE (Id)
  );

CREATE TABLE Projects (
      Id int NOT NULL AUTO_INCREMENT,
      person_Id int NOT NULL,
      name varchar(255) NOT NULL,
      description varchar(255),
      status_Id int NOT NULL,
      yarnProductName varchar(255),
      yarnColorCode varchar(255),
      yarnColor varchar(255),
      yarnLength int,
      recipeLink varchar(255),
      needleSize varchar(255),
      batchNr varchar(255),
      notes varchar(255),
      counter int,
      PRIMARY KEY (Id),
      UNIQUE (Id),
      FOREIGN KEY (person_Id) REFERENCES Persons(Id),
      FOREIGN KEY (status_Id) REFERENCES Projects_Status(Id)
    );

CREATE TABLE Projects_PicturePaths (
      Id int NOT NULL AUTO_INCREMENT,
      projects_Id int NOT NULL,
      paths varchar(255) NOT NULL,
      PRIMARY KEY (Id),
      UNIQUE (Id),
      FOREIGN KEY (projects_Id) REFERENCES Projects(Id)
  );
