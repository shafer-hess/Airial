<?php
	#				  ===== USAGE =====
	#	 POST or GET "username", "password", "email", "firstName", "lastName" forms
	#			to "IPv4 address"/createAccount.php
	# use $_GET for URL data
	$username = $_GET["username"];
	$pass = $_GET["password"];
	$addr = $_GET["email"];
	
	$cleanair = new mysqli('cleanair.cuxgs3tcx7pv.us-east-2.rds.amazonaws.com', 'youseethat', 'gustavorodriguezrivera', 'cleanair', '3306');
	if ($cleanair->connect_errno) {
		printf("Connect failed: %s\n", $cleanair->connect_error);
		exit();
	}
	if ($result = $cleanair->query("SELECT * FROM user WHERE username = \"$username\"")) {
		if ($result->num_rows > 0) {
			echo 2;
			$result->close();
			$cleanair->close();
			exit();
		}
		$result->close();
	}
	if ($result = $cleanair->query("SELECT * FROM user WHERE email = \"$addr\"")) {
		if ($result->num_rows > 0) {
			echo 3;
			$result->close();
			$cleanair->close();
			exit();
		}
		$result->close();
	}

	$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
	$cleanair->query("INSERT INTO user (username, password, email) VALUES (\"$username\", \"$hashed_pass\", \"$addr\")");
	$cleanair->close();
	echo 1;
?>
