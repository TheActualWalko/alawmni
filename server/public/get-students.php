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
    $domain = 'alumni.kcllawsociety.com'; //$domain = $_COOKIE["domain"];
  } else {
    $mysqli->query("INSERT INTO accesses () VALUES ();");
  }

  $firmID = urldecode($_GET["firm"]);
  $stmt = $mysqli->prepare("
    SELECT name, email 
    FROM students 
    WHERE id IN (
      SELECT student_id 
      FROM student_companies 
      WHERE company_id = ?
    )
    AND client_id IN (
      SELECT id 
      FROM clients 
      WHERE domain = ?
    );
  ");
  
  $stmt->bind_param('is', $firmID, $domain);
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
