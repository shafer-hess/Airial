<?php
	#				  ===== USAGE =====
	#		POST or GET "username" and "password" forms to "IPv4 address"/loginAuthentication.php
	
	# use $_GET for URL data
	$username = $_GET["username"];
	$password = $_GET["password"];

	# use $_POST for other form data
	#$username = $_POST["username"];
	#$password = $_POST["password"];

	#printf("Attempting to login to %s with input password %s\n", $username, $password);

	$cleanair = new mysqli('cleanair.czp4mdmfzwfg.us-east-2.rds.amazonaws.com', 'youseethat', 'gustavorodriguezrivera', 'cleanair', '3306');
	if ($cleanair->connect_errno) {
		printf("Connection to database failed: %s\n", $cleanair->connect_error);
		exit();
	}

	if ($result = $cleanair->query("SELECT * FROM user WHERE username = \"$username\"")) {
		if ($row = $result->fetch_array()) {
			#printf("User exists... Verifying passwords...\n");
			$hashed_pass = $row['password'];
			#printf("Returned hash: %s\n", $hashed_pass);
			if (password_verify($password, $hashed_pass)) {
				#echo "Password is valid!\n";
				$fullResult = $row['email'] . "-" . $row['firstName'] . "-" . $row['lastName'];
				echo $fullResult;
			} else {
				#echo "Invalid password!\n";
				echo 0;
			}
			$result->close();
		} else {
			echo 2; # user was not found
			$result->close();
		}
	}
	$cleanair->close();
?>
