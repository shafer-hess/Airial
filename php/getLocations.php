<?php
	$username = $_GET["username"];
	$response = array();
	$locations = array();
	
	$cleanair = new mysqli('cleanair.czp4mdmfzwfg.us-east-2.rds.amazonaws.com', 'youseethat', 'gustavorodriguezrivera', 'cleanair', '3306');
	if ($cleanair->connect_errno) {
		printf("Connect failed: %s\n", $cleanair->connect_error);
		exit();
	}
	if ($result = $cleanair->query("SELECT * FROM users WHERE username = \"$username\"")) {
		if ($result->num_rows < 1) {
			echo 0;
			$result->close();
			$cleanair->close();
			exit();
		}
		$result->close();
	}
	if ($result = $cleanair->query("SELECT * FROM cities WHERE username = \"$username\"")) {
		if ($result->num_rows < 1) {
			echo 1;
			$result->close();
			$cleanair->close();
			exit();
		} else {
			while ($row = $result->fetch_array()) {
				$location = preg_split("|", $row['city']);
				$locations[] = array('Country' => $location[0], 'State' => $location[1], 'City' => $location[2]); 	
			}

			$response['saved'] = $locations;
			$encoded = json_encode($response, JSON_PRETTY_PRINT); 
		
			$result->close();
			$cleanair->close();
			return $encoded;
		}
	}
	$cleanair->close();
?>
