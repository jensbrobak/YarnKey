<?php
 


class DbOperation
{
    // Sti til databaseforbindelsen.
    private $con;
 
    // Konstruktør klassen.
    function __construct()
    {
        // Henter DbConnect.php filen.
        require_once dirname(__FILE__) . '/DbConnect.php';
 
        // Opretter et DbConnect objekt til at forbinde til databasen med.
        $db = new DbConnect();
 
        // Initialisere vores sti til databaseforbindelsen for denne klasse.
        // Ved at kalde metoden: "connect" fra DbConnect klassen.
        $this->con = $db->connect();
    }
	
	 /*
     * Opret operationen:
     * Når disse metoder bliver kaldt, så bliver der oprettet nye elementer i databasen.
     */
	function createPerson($firstName, $lastName, $Phone, $Email, $birthDate){
		$stmt = $this->con->prepare("INSERT INTO Persons (firstName, lastName, Phone, Email, birthDate) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("ssiss", $firstName, $lastName, $Phone, $Email, $birthDate);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function createProject($person_Id, $name, $description, $status, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter){
		$stmt = $this->con->prepare("INSERT INTO Projects (person_Id, name, description, status, yarnProductName, yarnColorCode, yarnColor, yarnLength, needleSize, batchNr, notes, counter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("issssssssssi", $person_Id, $name, $description, $status, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function createPicturePaths($project_Id, $uploadPath, $description){
		$stmt = $this->con->prepare("INSERT INTO Projects_PicturePaths (project_Id, uploadPath, description) VALUES (?, ?, ?)");
		$stmt->bind_param("iss", $project_Id, $uploadPath, $description);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function createRecipePaths($project_Id, $uploadPath, $bookPage, $link, $description){
		$stmt = $this->con->prepare("INSERT INTO Projects_RecipePaths (project_Id, uploadPath, bookPage, link, description) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("issss", $project_Id, $uploadPath, $bookPage, $link, $description);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function getPerson($Id){
		$stmt = $this->con->prepare("SELECT Id, firstName, lastName, Phone, Email, birthDate FROM Persons WHERE Id = ? ");
		$stmt->bind_param("i", $Id);
		$stmt->execute();
		$stmt->bind_result($Id, $firstName, $lastName, $Phone, $Email, $birthDate);
		
		$Persons = array(); 
		
		while($stmt->fetch()){
			$Person = array();
			$Person['Id'] = $Id; 
			$Person['firstName'] = $firstName; 
			$Person['lastName'] = $lastName; 
			$Person['Phone'] = $Phone; 
			$Person['Email'] = $Email; 
			$Person['birthDate'] = $birthDate; 
						
			array_push($Persons, $Person); 
		}
		
		return $Persons; 

	}

	/*
     * Hent operationen:
     * Når disse metoder bliver kaldt, bliver alle de eksisterende elementer i databasen hentet.
     */
	function getProjects($person_Id){
		$stmt = $this->con->prepare("SELECT Id, person_Id, name, description, status, yarnProductName, yarnColorCode, yarnColor, yarnLength, needleSize, batchNr, notes, counter FROM Projects WHERE person_Id = ? ");
		$stmt->bind_param("i", $person_Id);
		$stmt->execute();
		$stmt->bind_result($Id, $person_Id, $name, $description, $status, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter);
		
		$Projects = array(); 
		
		while($stmt->fetch()){
			$Project = array();
			$Project['Id'] = $Id; 
			$Project['person_Id'] = $person_Id; 
			$Project['name'] = $name; 
			$Project['description'] = $description; 
			$Project['status'] = $status; 
			$Project['yarnProductName'] = $yarnProductName; 
			$Project['yarnColorCode'] = $yarnColorCode; 
			$Project['yarnColor'] = $yarnColor; 
			$Project['yarnLength'] = $yarnLength; 
			$Project['needleSize'] = $needleSize; 
			$Project['batchNr'] = $batchNr; 
			$Project['notes'] = $notes; 
			$Project['counter'] = $counter; 
						
			array_push($Projects, $Project); 
		}
		
		return $Projects; 
	}

	function getPicturePaths($project_Id){
		$stmt = $this->con->prepare("SELECT Id, project_Id, uploadPath, description FROM Projects_PicturePaths WHERE project_Id = ? ");
		$stmt->bind_param("i", $project_Id);
		$stmt->execute();
		$stmt->bind_result($Id, $project_Id, $uploadPath, $description);
		
		
		$picturePaths = array(); 
		
		while($stmt->fetch()){
			$picturePath = array();
			$picturePath['Id'] = $Id; 
			$picturePath['project_Id'] = $project_Id; 
			$picturePath['uploadPath'] = $uploadPath; 
			$picturePath['description'] = $description;
								
			array_push($picturePaths, $picturePath); 
		}
		
		return $picturePaths; 
	}

	function getRecipePaths($project_Id){
		$stmt = $this->con->prepare("SELECT Id, project_Id, uploadPath, bookPage, link, description FROM Projects_RecipePaths WHERE project_Id = ? ");
		$stmt->bind_param("i", $project_Id);
		$stmt->execute();
		$stmt->bind_result($Id, $project_Id, $uploadPath, $bookPage, $link, $description);
		
		$recipePaths = array(); 
		
		while($stmt->fetch()){
			$recipePath = array();
			$recipePath['Id'] = $Id; 
			$recipePath['project_Id'] = $project_Id; 
			$recipePath['uploadPath'] = $uploadPath; 
			$recipePath['bookPage'] = $bookPage; 
			$recipePath['link'] = $link;
			$recipePath['description'] = $description;
								
			array_push($recipePaths, $recipePath); 
		}
		
		return $recipePaths; 
	}

	/*
     * Opdater operationen:
     * Når disse metoder bliver kaldt, bliver de elementer med det indtastede ID, opdateret til nye værdier.
     */
	function updatePerson($Id, $firstName, $lastName, $Phone, $Email, $birthDate){
		$stmt = $this->con->prepare("UPDATE Persons SET firstName = ?, lastName = ?, Phone = ?, Email = ?, birthDate = ? WHERE Id = ?");
		$stmt->bind_param("ssissi", $firstName, $lastName, $Phone, $Email, $birthDate, $Id);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function updateProject($Id, $person_Id, $name, $description, $status, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter){
		$stmt = $this->con->prepare("UPDATE Projects SET person_Id = ?, name = ?, description = ?, status = ?, yarnProductName = ?, yarnColorCode = ?, yarnColor = ?, yarnLength = ?, needleSize = ?, batchNr = ?, notes = ?, counter = ? WHERE Id = ?");
		$stmt->bind_param("issssssssssii", $person_Id, $name, $description, $status, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter, $Id);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function updatePicturePaths($Id, $project_Id, $uploadPath, $description){
		$stmt = $this->con->prepare("UPDATE Projects_PicturePaths SET project_Id = ?, uploadPath = ?, description = ? WHERE Id = ?");
		$stmt->bind_param("issi", $project_Id, $uploadPath, $description, $Id);
		if($stmt->execute())
			return true; 
		return false; 
	}

	function updateRecipePaths($Id, $project_Id, $uploadPath, $bookPage, $link, $description){
		$stmt = $this->con->prepare("UPDATE Projects_RecipePaths SET project_Id = ?, uploadPath = ?, bookPage = ?, link = ?, description = ? WHERE Id = ?");
		$stmt->bind_param("issssi", $project_Id, $uploadPath, $bookPage, $link, $description, $Id);
		if($stmt->execute())
			return true; 
		return false; 
	}
	
	}
}