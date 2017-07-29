<?php
  $mysqli = new mysqli($_SERVER["MYSQL_HOST"], $_SERVER["MYSQL_USERNAME"], $_SERVER["MYSQL_PASSWORD"], 'alumni_db');
  $mysqli->set_charset("utf8");
  if ($mysqli->connect_errno) {
    echo "Sorry, this website is experiencing problems.";
    echo "Error: Failed to make a MySQL connection, here is why: \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    exit;
  }

  $domain = $_SERVER["HTTP_HOST"];
  if (strpos($domain, "localhost") !== false) {
    $domain = urldecode($_COOKIE["domain"]);
  } else {
    $mysqli->query("INSERT INTO accesses () VALUES ();");
  }

  $email = $_POST["email"];
  $name = $_POST["firstName"] . " " . $_POST["lastName"];
  $firm = $_POST["firmID"];

  $addStudentStmt = $mysqli->prepare("
    INSERT INTO students (
      name, 
      email, 
      client_id
    ) VALUES (
      ?, 
      ?, 
      (SELECT id FROM clients WHERE domain = ?)
    );
  ");
  $addStudentStmt->bind_param('sss', $name, $email, $domain);
  $addStudentStmt->execute();

  // get LAST_INSERT_ID here

  $connectCompanyStmt = $mysqli->prepare("INSERT INTO student_companies (student_id, company_id) VALUES (?, ?);");
  $connectCompanyStmt->bind_param('ii', $studentID, $firmID);
  //$connectCompanyStmt->execute();
  $mysqli->close();
?>
