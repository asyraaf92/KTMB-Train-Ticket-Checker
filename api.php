<?php
/*
	Codes for fetching data from KTMB E-Ticket Page
*/

$option = (isset($_GET['option'])) ? $_GET['option'] : '';

if($option == 'GetOrigin')
{
	$url = "https://intranet.ktmb.com.my/e-ticket/Ajax/GetOriginDest.aspx";

    $result = file_get_contents($url);

    echo $result;
}

if($option == 'GetDest')
{
	$originCode = $_GET['origin'];

	$url = "https://intranet.ktmb.com.my/e-ticket/Ajax/GetOriginDest.aspx?Origin=".$originCode;

    $result = file_get_contents($url);

    echo $result;
}

if($option == 'GetTrain')
{

}

if($option == 'GetCoach')
{

}


?>

