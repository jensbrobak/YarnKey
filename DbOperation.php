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
	function opretProdukt($Navn, $ProduktBeskrivelse, $ProduktType, $ProduktFormat, $LagerBeholdning){
		$stmt = $this->con->prepare("INSERT INTO Produkt (Navn, ProduktBeskrivelse, ProduktType, ProduktFormat, LagerBeholdning) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $Navn, $ProduktBeskrivelse, $ProduktType, $ProduktFormat, $LagerBeholdning);
		if($stmt->execute())
			return true; 
		return false; 
	}

	/*
     * Hent operationen:
     * Når disse metoder bliver kaldt, bliver alle de eksisterende elementer i databasen hentet.
     */
	function hentProdukt(){
		$stmt = $this->con->prepare("SELECT id, Navn, ProduktBeskrivelse, ProduktType, ProduktFormat, LagerBeholdning FROM Produkt");
		$stmt->execute();
		$stmt->bind_result($id, $Navn, $ProduktBeskrivelse, $ProduktType, $ProduktFormat, $LagerBeholdning);
		
		$Produkter = array(); 
		
		while($stmt->fetch()){
			$Produkt = array();
			$Produkt['id'] = $id; 
			$Produkt['Navn'] = $Navn; 
			$Produkt['ProduktBeskrivelse'] = $ProduktBeskrivelse; 
			$Produkt['ProduktType'] = $ProduktType; 
			$Produkt['ProduktFormat'] = $ProduktFormat; 
			$Produkt['LagerBeholdning'] = $LagerBeholdning; 
						
			array_push($Produkter, $Produkt); 
		}
		
		return $Produkter; 
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