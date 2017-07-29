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
  $firmID = $_POST["firmID"];

  // echo $email . ", " . $name . ", " . $firm;
  $addStudentStmt = $mysqli->prepare("
    INSERT INTO students (
      name, 
      email, 
      client_id
    ) VALUES (
      ?, 
      ?, 
      (SELECT id FROM clients WHERE domain = ?)
    ) ON DUPLICATE KEY UPDATE
      name = ?,
      email = ?,
      client_id = (SELECT id FROM clients WHERE domain = ?);
  ");
  $addStudentStmt->bind_param('ssssss', $name, $email, $domain, $name, $email, $domain);
  $addStudentStmt->execute();

  $connectCompanyStmt = $mysqli->prepare("
    INSERT INTO student_companies (
      student_id, 
      company_id
    ) VALUES (
      (SELECT id FROM students WHERE email = ?),
      ?
    );");
  $connectCompanyStmt->bind_param('si', $email, $firmID);
  $connectCompanyStmt->execute();
  $mysqli->close();

  echo "success";
?>
