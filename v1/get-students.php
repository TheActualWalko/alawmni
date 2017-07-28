<?php
  $mysqli = new mysqli('127.0.0.1', 'root', $MYSQL_PWD, 'kcl_students');
  $mysqli->set_charset("utf8");
  if ($mysqli->connect_errno) {
    echo "Sorry, this website is experiencing problems.";
    echo "Error: Failed to make a MySQL connection, here is why: \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    exit;
  }
  $firmID = urldecode($_GET["firm"]);
  $stmt = $mysqli->prepare("SELECT name, email FROM kcl_students.students WHERE id IN ( SELECT student_id FROM kcl_students.student_companies WHERE company_id IN ( SELECT id FROM kcl_students.companies WHERE id = ? ));");
  $stmt->bind_param('i', $firmID);
  $stmt->execute();
  $stmt->bind_result($studentName, $studentEmail);
  $isFirst = true;
  echo "[";
  while($stmt->fetch()){
    if( !$isFirst ){
      echo ",";
    }
    echo "{ \"name\":\"" . $studentName . "\", \"email\":\"" . $studentEmail . "\" }";
    $isFirst = false;
  }
  echo "]";
  $mysqli->close();
?>
