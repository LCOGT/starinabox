<?php

// Database config file...

$usr = "root";
$pass = "";
$host = "localhost";
$db_name = "siab";

mysql_connect($host, $usr, $pass) or die("Database Connection Error");
mysql_selectdb($db_name);

?>