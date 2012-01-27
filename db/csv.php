<?php

include_once('config.php');

$m = $_REQUEST['s']; //mass from url

if(is_numeric($m)){
	//return a csv list of all the data points from the database
	
	$iQuery = "SELECT *, MIN(ABS(mass - $m)) as minvalue FROM indecies GROUP BY mass ORDER BY minvalue LIMIT 1 ";
	$iResult = mysql_query($iQuery) or die('Something went wrong. Please try again later. (l:11)');
	$index = mysql_fetch_assoc($iResult);
	$id = $index['id'];
	$rMass = $index['mass'];
	
	//Get data
	$dQuery = "SELECT * FROM data WHERE index_id = $id ORDER BY id ASC";
	$dResult = mysql_query($dQuery) or die ('Something went wrong. Please try again later. (l:18)');
	$i=0;
	$result_array = array();
	while( $row = mysql_fetch_assoc($dResult)){
		$result_array[] = $row;
	}
	
	foreach($result_array[0] as $key => $value){
		if($key != 'id' && $key != 'index_id'){
			$title_array[] = $key;
		}
	}
	
	//set headers
	header("Content-type: application/csv");
	header("Content-Disposition: attachment; filename=".$rMass."_solar_mass_star.csv");
	header("Pragma: no-cache");
	header("Expires: 0");
	
	//print list of titles
	print implode(',',$title_array)."\n";
	
	foreach($result_array as $row){
		$temp_array = array();
		foreach($row as $key => $value){
			if($key != 'id' && $key != 'index_id'){
				$temp_array[] = $value;	
			}
		}
		print implode(",",$temp_array)."\n";
	}
}