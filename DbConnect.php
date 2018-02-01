<?php 
	
	
	
	// DbConnect klassen.
	class DbConnect
	{
		// Variable som skal indholde databaseforbindelsen.
		private $con;
	 
		// Konstruktør klassen.
		function __construct()
		{
	 
		}
	 
		// Denne metode vil forbinde til databasen.
		function connect()
		{
			// Henter loginoplysninger fra Constants.php filen.
			include_once dirname(__FILE__) . '/Constants.php';
	 
			// Forbinder til MySQL Databasen.
			$this->con = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	 
			// Tjekker for eventuelle fejl i forbindelse med opkoblingen.
			if (mysqli_connect_errno()) {
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}
	 
			// Returnerer stien til forbindelsen. 
			return $this->con;
		}
	 
	}