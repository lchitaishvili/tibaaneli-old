<?php
/*
	Author: Travolgi
	Theme: Grapeland
	Version: 1.0.0
	Created: 22/10/2024
	Last update: 22/10/2024
*/

// server information
$domain = $_SERVER['SERVER_NAME'];
$IPaddress = $_SERVER['REMOTE_ADDR'];
$date = date('d/m/Y');
$time = date('H:i:s');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	// data from the form
	$name = str_replace(array("\r","\n"), array(" "," "), strip_tags(trim($_POST["name"])));
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$subject = 'New message from your site';
	$message = trim($_POST["message"]);
	
	// return the 400 response code and exit if the form fields are empty or incorrect
	if ( empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		http_response_code(400);
		echo "Please complete the form and try again.";
		exit;
	}


	// replace this email with recipient email
	$recipientEmail = "YOUR@EMAIL.HERE";

	//email headers
	$emailHeader = "From: $name <$email> \r\nReply-To: $email \r\n";

	// body of the email message
	$emailContent = "Name: $name\nEmail: $email\n\nMessage:\n$message\n\n\n---\nMessage sent from the contact form on the site $domain.\nIP Adress: {$IPaddress} on {$date} at {$time}";
	
	// send the email
	$success = mail($recipientEmail, $subject, $emailContent, $emailHeader);
	
	// check the status of the email sent
	if ($success) {
		http_response_code(200);
		echo "<h1 style=\"text-align:center; color:green; padding: 10% 1rem;\">Thank You! Your message has been sent.</h1>";
		header("refresh:5;url=index.html");
	} else {
		http_response_code(500);
		echo "<h1 style=\"text-align:center; color:red; padding: 10% 1rem;\">Oops! Something went wrong, we couldn't send your message.</h1>";
		header("refresh:5;url=contact.html");
	}

} else {
	http_response_code(403);
	echo "<h1 style=\"text-align:center; color:red; padding: 10% 1rem;\">There was a problem with your submission, please try again.</h1>";
}