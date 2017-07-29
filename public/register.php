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
  if (strpos($domain, "localhost") !== false || strpos($domain, "51.255.193.170") !== false) {
    $domain = 'alumni.kcllawsociety.com'; //$domain = 'alumni.kcllawsociety.com'; //$domain = $_COOKIE["domain"];
  } else {
    $mysqli->query("INSERT INTO accesses () VALUES ();");
  }

  $email = $_POST["email"];
  $name = $_POST["firstName"] . " " . $_POST["lastName"];
  $firm = $_POST["firm"];

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

  $addFirmStmt = $mysqli->prepare("
    INSERT INTO companies (
      name
    ) VALUES (
      ?
    ) ON DUPLICATE KEY UPDATE name = ?;
  ");
  $addFirmStmt->bind_param('ss', $firm, $firm);
  $addFirmStmt->execute();

  $connectCompanyStmt = $mysqli->prepare("
    INSERT INTO student_companies (
      student_id, 
      company_id
    ) VALUES (
      (SELECT id FROM students WHERE email = ?),
      (SELECT id FROM companies WHERE name = ?)
    );");
  $connectCompanyStmt->bind_param('ss', $email, $firm);
  $connectCompanyStmt->execute();
  $mysqli->close();

  echo "success";
?>
