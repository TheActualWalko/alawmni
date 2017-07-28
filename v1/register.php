<?php
  $mysqli = new mysqli('127.0.0.1', 'root', 'EbFahux8', 'kcl_students');
  $mysqli->set_charset("utf8");
  if ($mysqli->connect_errno) {
    echo "Sorry, this website is experiencing problems.";
    echo "Error: Failed to make a MySQL connection, here is why: \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    exit;
  }
  $email = $_POST["email"];
  $name = $_POST["firstName"] . " " . $_POST["lastName"];
  $firm = $_POST["firmID"];

  $addStudentStmt = $mysqli->prepare("INSERT INTO kcl_students.students (name, email) VALUES (?, ?);");
  $addStudentStmt->bind_param('ss', $name, $email);
  //$addStudentStmt->execute();

  // get LAST_INSERT_ID here

  $connectCompanyStmt = $mysqli->prepare("INSERT INTO kcl_students.student_companies (student_id, company_id) VALUES (?, ?);");
  $connectCompanyStmt->bind_param('ii', $studentID, $firmID);
  //$connectCompanyStmt->execute();
  $mysqli->close();
?>