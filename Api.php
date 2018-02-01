<?php 



	// Henter DbOperation klassen.
	require_once 'DbOperation.php';

	 // Funktionen vil validere om alle parametrene er tilgængelige.
 // Vi vil sende de påkrævede parametre til denne funktion. 
	function isTheseParametersAvailable($params){
		// Hvis all parametrene er tilgængelige.
		$available = true; 
		$missingparams = ""; 
		
		foreach($params as $param){
			if(!isset($_POST[$param]) || strlen($_POST[$param])<=0){
				$available = false; 
				$missingparams = $missingparams . ", " . $param; 
			}
		}
		
		 // Hvis der mangler parametre.
		if(!$available){
			$response = array(); 
			$response['error'] = true; 
			$response['message'] = 'Parameters ' . substr($missingparams, 1, strlen($missingparams)) . ' missing';
			
			 // Fremviser fejl
			echo json_encode($response);
			
			// Dropper yderligere eksekveringer.
			die();
		}
	}
	
	// Et array som står for at vise svar.
	$response = array();
	
	// Hvis det er et API-kald
    // Hvilket vil sige, at et "GET" parametre ved navn: "apicall" er placeret i URL'en.
    // Og med den parametre, kan vi konkludere, at der er tale om et API-kald.
	if(isset($_GET['apicall'])){
		
		switch($_GET['apicall']){
			
			//createProject operationen
            // Hvis API-kald værdien er: "createProject".
            // Så vil vi oprette projektet i databasen.
			case 'createproject':
				// Vi tjekker først om parametrene for forespørgslen er tilgængelige eller ej.
				isTheseParametersAvailable(array('person_Id', 'name', 'description', 'status_Id', 'yarnProductName', 'yarnColorCode','yarnColor','yarnLength','needleSize', 'batchNr', 'notes', 'counter'));
				
				// Opretter et nyt DbOperation objekt
				$db = new DbOperation();
				
				// Opretter et nyt produkt i databasen.
				$result = $db->createProject(
					$_POST['person_Id'],
					$_POST['name'],
					$_POST['description'],
					$_POST['status_Id'],
					$_POST['yarnColorCode'],
					$_POST['yarnColor'],
					$_POST['yarnLength'],
					$_POST['needleSize'],
					$_POST['batchNr'],
					$_POST['notes'],
					$_POST['counter']
					
				);
				

				// Hvis produktet bliver oprettet, får vi følgende svar: Produkt tilføjet. Ellers får vi beskeden: Fejl.
				if($result){
					// Hvis produktet bliver tilføjet, er der ingen fejl.
					$response['error'] = false; 

					// Her har vi en besked med indholdet: "Produkt tilføjet".
					$response['message'] = 'Produkt tilføjet';

					// Her bliver alle produkterne fra databasen hentet, som svar.
					$response['produkt'] = $db->hentProdukt();
				}else{

					 // Hvis produktet ikke bliver tilføjet, har vi en fejl.
					$response['error'] = true; 

					// Her har vi fejlbeskeden.
					$response['message'] = 'Fejl';
				}
				
			break; 
			
			        // Hent operationen:
                    // Hvis API-kaldet er hentprodukt.
			case 'getproject':
				$db = new DbOperation();
				$response['error'] = false; 
				$response['message'] = 'Fuldført';
				$response['project'] = $db->getProject();
			break; 

			case 'getperson':
				$db = new DbOperation();
				$response['error'] = false; 
				$response['message'] = 'Fuldført';
				$response['person'] = $db->getPerson();
			break; 
			
			
			     // Opdater operationen:
                 // Hvis API-kaldet er opdaterprodukt.
			case 'opdaterprodukt':
				isTheseParametersAvailable(array('id','Navn','ProduktBeskrivelse', 'ProduktType', 'ProduktFormat', 'LagerBeholdning'));
				$db = new DbOperation();
				$result = $db->opdaterProdukt(
					$_POST['id'],
					$_POST['Navn'],
					$_POST['ProduktBeskrivelse'],
					$_POST['ProduktType'],
					$_POST['ProduktFormat'],
					$_POST['LagerBeholdning']
				);
				
				if($result){
					$response['error'] = false; 
					$response['message'] = 'Produkt opdateret';
					$response['produkt'] = $db->hentProdukt();
				}else{
					$response['error'] = true; 
					$response['message'] = 'Fejl';
				}
			break; 
			
			     // Slet operationen:
                // Hvis API-kaldet er sletprodukt.
			case 'sletprodukt':

				// For Slet operationen skal vi anvende et GET parameter fra URL'en med det ID, for det element som skal slettes.
				if(isset($_GET['id'])){
					$db = new DbOperation();
					if($db->sletProdukt($_GET['id'])){
						$response['error'] = false; 
						$response['message'] = 'Produkt slettet';
						$response['produkt'] = $db->hentProdukt();
					}else{
						$response['error'] = true; 
						$response['message'] = 'Fejl';
					}
				}else{
					$response['error'] = true; 
					$response['message'] = 'Intet at slette, venligst angiv et nyt ID';
				}
			break; 
		}
		
	}else{
		// Hvis det ikke er et API-kald.
        // Sender en besked med svaret: "ikke et gyldigt API kald".
		$response['error'] = true; 
		$response['message'] = 'Ugyldigt API-kald';
	}
	
	// Viser svaret i JSON formatet.
	echo json_encode($response);
	
	
