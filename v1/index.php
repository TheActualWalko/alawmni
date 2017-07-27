<!DOCTYPE html>
<html>
  <head>
    <title>KCL Law Alumni Database</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Ropa+Sans" rel="stylesheet">
    <link rel="stylesheet" href="css/screen.css" />
  </head>
  <body>
    <div class="background"></div>
    <div id="react-container"></div>
    <script>
      <?php
        $mysqli = new mysqli('127.0.0.1', 'root', 'EbFahux8', 'kcl_students');
        $mysqli->set_charset("utf8");
        if ($mysqli->connect_errno) {
          echo "console.log(`";
          echo "Sorry, this website is experiencing problems.";
          echo "Error: Failed to make a MySQL connection, here is why: \n";
          echo "Errno: " . $mysqli->connect_errno . "\n";
          echo "Error: " . $mysqli->connect_error . "\n";
          echo "`);";
          exit;
        }
        $mysqli->query("INSERT INTO accesses () VALUES ();");
      ?>
      const firms = [
        <?php
          $result = $mysqli->query("SELECT name, id FROM companies;");
          while( $row = $result->fetch_assoc() ){
            echo "{ name : '".$row["name"]."', id : ".$row["id"]." },";
          }
          $result->free();
          $mysqli->close();
        ?>
      ];
    </script>
    <script src="dist/vendor.bundle.js"></script>
    <script src="dist/bundle.js"></script>
  </body>
</html>
