<?php
	$username = $_POST["username"];
	$location = $_POST["location"];

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
	if ($result = $cleanair->query("SELECT * FROM cities WHERE username = \"$username\" AND city = \"$location\"")) {
		if ($result->num_rows > 0) {
			echo 2;
			$result->close();
			$cleanair->close();
			exit();
		}
		$result->close();
	}
	$cleanair->query("INSERT INTO cities (username, city) VALUES (\"$username\", \"$location\")");
	$cleanair->close();
	echo 1;
?>
