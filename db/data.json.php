<?php

/**
 *
 *Output from siab database to interaface
 *
 **/

$d = $_REQUEST['d']; //data? 
$m = $_REQUEST['m']; //Mass
$t = $_REQUEST['t']; //Metalisity
$s = $_REQUEST['s']; //Life-cycle Stage

//stage into array
$sArr = explode(",",$s);

include_once('config.php');

switch($d){
	case("star"):
	
		// Get plot data for a star with M (and eventually T)
		
		$sArray = explode(",",$s);
		//print_r($sArray);
		$sQ = implode(" OR type = ", $sArray);
		//print "<br/>$sQ";
		
		//Get ID
		$iQuery = "SELECT *, MIN(ABS(mass - $m)) as minvalue FROM indecies GROUP BY mass ORDER BY minvalue LIMIT 1 ";
		$iResult = mysql_query($iQuery);
		$index = mysql_fetch_assoc($iResult);
		$id = $index['id'];
		$rMass = $index['mass'];
		
		//Get data
		$dQuery = "SELECT log10_l, log10_teff FROM data WHERE index_id = $id AND ( type >= ".$sArr[0]." AND type <= ".$sArr[1].") ORDER BY id ASC";
		$dResult = mysql_query($dQuery);
		
		$dArray = array();
		
		while($dp = mysql_fetch_assoc($dResult)){
			$dArray[] = "[".$dp['log10_teff'].", ".$dp['log10_l']."]";
		}
		
		$dString = '  "data": ['.implode(", ", $dArray)."]\n";
		
		//print output...
		print "{\n";
		//if($rMass > 1){
		//	$pmass = 'es';
		//}else{
		//	$pmass = '';
		//}
		print '  "mass": "'.$rMass.'"'.", \n";
		print $dString;
		print "}\n";
		//print '{ "mass":"'.$rMass.'"}';
		break;
	
	case("stages"):
	
		//Get stages for a star with M (and eventually T)
		
		//Get ID
		$iQuery = "SELECT *, MIN(ABS(mass - $m)) as minvalue FROM indecies GROUP BY mass ORDER BY minvalue LIMIT 1 ";
		$iResult = mysql_query($iQuery);
		$index = mysql_fetch_assoc($iResult);
		$id = $index['id'];
		
		//Get list of stages (stellar_types)
		$sQuery = "SELECT distinct tev, ROUND(log10_l,4) AS lum, type, description, data.log10_r, data.log10_teff FROM data RIGHT JOIN stellar_type ON (data.type = stellar_type.id ) WHERE data.index_id = $id group by type";
		$sResult = mysql_query($sQuery);
		
		$sArray = array();
		
		while($sp = mysql_fetch_assoc($sResult)){
			
			//work out nearest colour...
			$cQuery = "SELECT temp, html, MIN(ABS(temp - ".round(pow(10,$sp['log10_teff']),0)." )) as minvalue FROM bb_colour GROUP BY temp ORDER BY minvalue LIMIT 1";
			$cResult = mysql_query($cQuery);
			$c = mysql_fetch_assoc($cResult);
			//print_r($c);
					
			$sArray[] = "\n".'{"optionValue":'.$sp['type'].', "optionLum":'.$sp['lum'].', "optionTev":'.round($sp['tev'],4).', "optionDisplay":"'.$sp['description'].'", "optionRadius":'. round(pow(10,$sp['log10_r']),2).', "optionTemp":'. $c['temp'].', "optionRGB":"'. $c['html'].'"}';
		}
		
		$sString = '['.implode(", ", $sArray)."\n]";
		print $sString;
	
	break;
	
	case("evolve"):
	
		//get values to show how star evolves over selected stage(s)
		//Get ID
		$iQuery = "SELECT *, MIN(ABS(mass - $m)) as minvalue FROM indecies GROUP BY mass ORDER BY minvalue LIMIT 1 ";
		$iResult = mysql_query($iQuery);
		$index = mysql_fetch_assoc($iResult);
		$id = $index['id'];
		
		
		//get data points for slider...
		$dQuery = "SELECT type, description, tev, ROUND(log10_l,4) AS lum, POW(10,log10_r) AS radius, ROUND(POW(10,log10_teff),0) as temp FROM data RIGHT JOIN stellar_type ON (data.type = stellar_type.id ) WHERE index_id = $id AND ( type >= ".$sArr[0]." AND type <= ".$sArr[1].") and tev >= 0 order by tev ASC";
		$dResult = mysql_query($dQuery);
		
		$sArray = array();
		$i = 0;
		while($sp = mysql_fetch_assoc($dResult)){
			
			if ($i % 4 == 0 || $i = (count(mysql_fetch_assoc($dResult))-1)) {
			//print $sp['temp'];
			//work out nearest colour...
			$cQuery = "SELECT temp, html, MIN(ABS(temp - ".$sp['temp']." )) as minvalue FROM bb_colour GROUP BY temp ORDER BY minvalue LIMIT 1";
			$cResult = mysql_query($cQuery);
			$c = mysql_fetch_assoc($cResult);
			//print_r($c);
					
			$sArray[] = "\n".'{"optionRadius":'. $sp['radius'].', "optionLum":'.$sp['lum'].', "optionTev":'. $sp['tev'].', "optionTemp":'. $c['temp'].', "optionRGB":"'. $c['html'].'", "type":'. $sp['type'].', "typeDesc":"'.$sp['description'].'"}';
			}
			$i++;
		}
		$sString = '['.implode(", ", $sArray)."\n]";
		print $sString;
		
	
	break;
	
	case("ms"):
	
		$msQuery = "SELECT DISTINCT index_id, log10_l, log10_teff FROM data GROUP BY index_id";
		$msResult = mysql_query($msQuery);
		while($msp = mysql_fetch_assoc($msResult)){
			$msArray[] = "[".$msp['log10_teff'].", ".$msp['log10_l']."]";
		}
		
		$msString = '  "data": ['.implode(", \n", $msArray)."]\n";
		
		
		print "{\n";
		print $msString;
		print "}";
	
	
	break;
	
	case("drag"):
	
	break;
}


?>