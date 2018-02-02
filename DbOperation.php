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
	function createProject($person_Id, $name, $description, $status_Id, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter){
		$stmt = $this->con->prepare("INSERT INTO Project (person_Id, name, description, status_Id, yarnProductName, yarnColorCode,yarnColor,yarnLength,needleSize, batchNr, notes, counter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ississsssssi", $person_Id, $name, $description, $status_Id, $yarnProductName, $yarnColorCode, $yarnColor, $yarnLength, $needleSize, $batchNr, $notes, $counter);
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
		
		return $uploadPaths; 
	}

	function getRecipePaths($project_Id){
		$stmt = $this->con->prepare("SELECT Id, project_Id, uploadPath, description FROM Projects_PicturePaths WHERE project_Id = ? ");
		$stmt->bind_param("i", $project_Id);
		$stmt->execute();
		$stmt->bind_result($Id, $project_Id, $uploadPath, $description);
		
		$uploadPaths = array(); 
		
		while($stmt->fetch()){
			$uploadPath = array();
			$uploadPath['Id'] = $Id; 
			$uploadPath['project_Id'] = $project_Id; 
			$uploadPath['uploadPath'] = $uploadPath; 
			$uploadPath['description'] = $description;
								
			array_push($uploadPaths, $uploadPath); 
		}
		
		return $uploadPaths; 
	}

	
	
	/*
     * Opdater operationen:
     * Når disse metoder bliver kaldt, bliver de elementer med det indtastede ID, opdateret til nye værdier.
     */
	function opdaterProdukt($id, $Navn, $ProduktBeskrivelse, $ProduktType, $ProduktFormat, $LagerBeholdning){
		$stmt = $this->con->prepare("UPDATE Produkt SET Navn = ?, ProduktBeskrivelse = ?, ProduktType = ?, ProduktFormat = ?, LagerBeholdning = ? WHERE id = ?");
		$stmt->bind_param("sssssi", $Navn, $ProduktBeskrivelse, $ProduktType, $ProduktFormat, $LagerBeholdning, $id);
		if($stmt->execute())
			return true; 
		return false; 
	}
	
	
	/*
     * Slet operationerne:
     * Når disse metoder bliver kaldt, vil elementerne med det indtastede ID, blive slettet i databasen. 
     */
	function sletProdukt($id){
		$stmt = $this->con->prepare("DELETE FROM Produkt WHERE id = ? ");
		$stmt->bind_param("i", $id);
		if($stmt->execute())
			return true; 
		
		return false; 
	}
}