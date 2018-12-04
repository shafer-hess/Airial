<?php
	$username = $_GET["username"];
	$location = $_GET["location"];

	$cleanair = new mysqli('cleanair.czp4mdmfzwfg.us-east-2.rds.amazonaws.com', 'youseethat', 'gustavorodriguezrivera', 'cleanair', '3306');
	if ($cleanair->connect_errno) {
		printf("Connect failed: %s\n", $cleanair->connect_error);
		exit();
	}
	if ($result = $cleanair->query("SELECT * FROM users WHERE username = \"$username\"")) {
		if ($result->num_rows > 0) {
			echo 2;
			$result->close();
			$cleanair->close();
			exit();
		}
		$result->close();
	}
	if ($result = $cleanair->query("SELECT * FROM users WHERE email = \"$addr\"")) {
		if ($result->num_rows > 0) {
			echo 3;
			$result->close();
			$cleanair->close();
			exit();
		}
		$result->close();
	}

	$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
	$cleanair->query("INSERT INTO users (username, password, email, firstName, lastName) VALUES (\"$username\", \"$hashed_pass\", \"$addr\", \"$first\", \"$last\")");
	$cleanair->close();
	echo 1;
?>
