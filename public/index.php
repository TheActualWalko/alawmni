<?php
  $mysqli = new mysqli($_SERVER["MYSQL_HOST"], $_SERVER["MYSQL_USERNAME"], $_SERVER["MYSQL_PASSWORD"], "alumni_db");
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

  $stmt = $mysqli->prepare("SELECT id, app_display_name, contact_email, client_website FROM clients WHERE domain = ?;");
  $stmt->bind_param("s", $domain);
  $stmt->execute();
  $stmt->bind_result($clientID, $appDisplayName, $contactEmail, $clientWebsite);
  $stmt->fetch();
  $stmt->close();
?>
<!DOCTYPE html>
<html>
  <head>
    <script>
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
      analytics.load("PO9SjXmJU7ZIsB4ygIuzYI1oiQ8VRmaC");
      analytics.page();
      }}();
    </script>
    <title><?php echo $appDisplayName; ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Ropa+Sans" rel="stylesheet">
    <link rel="stylesheet" href="css/screen.css" />
  </head>
  <body>
    <div class="background"></div>
    <div id="react-container"></div>
    <script>
      const statics = {
        clientID: <?php echo $clientID; ?>,
        appDisplayName: <?php echo "'".$appDisplayName."'"; ?>,
        contactEmail: <?php echo "'".$contactEmail."'"; ?>,
        clientWebsite: <?php echo "'".$clientWebsite."'"; ?>
      };
      const firms = [
        <?php
          $result = $mysqli->query("SELECT name, id FROM companies;");
          while ($row = $result->fetch_assoc()) {
            echo "{name: '".$row["name"]."', id: ".$row["id"]."},\n";
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
