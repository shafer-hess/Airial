<?php
	$username = $_GET["username"];

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
			$allLocations = "";
			while ($row = $result->fetch_array()) {
				$allLocations = $allLocations . $row['city'] . "||";
			}
			echo $allLocations;
			$result->close();
		}
	}
	$cleanair->close();
?>
