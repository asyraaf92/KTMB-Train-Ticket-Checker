<?php
/*
	Codes for fetching data from KTMB E-Ticket Page
	Needs to fetch the page using PHP, because KTMB website does not enable CORS for AJAX call from foreign Domains.
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
	$originCode = $_GET['Origin'];

	$url = "https://intranet.ktmb.com.my/e-ticket/Ajax/GetOriginDest.aspx?Origin=".$originCode;

    $result = file_get_contents($url);

    echo $result;
}

if($option == 'GetTrain')
{
	$originCode = $_GET['Origin'];
	$destCode = $_GET['Destination'];
	$date = $_GET['Date'];

	$url = "https://intranet.ktmb.com.my/e-ticket/Ajax/GetTrainList.aspx?Origin=".$originCode."&Destination=".$destCode."&Tarikh=".$date;

    $result = file_get_contents($url);

    echo $result;
}

if($option == 'GetCoach')
{
	$originCode = $_GET['Origin'];
	$destCode = $_GET['Destination'];
	$date = $_GET['Date'];
	$train = $_GET['Train'];

	$url = "https://intranet.ktmb.com.my/e-ticket/Ajax/CoachList.aspx?Origin=".$originCode."&Destination=".$destCode."&Tarikh=".$date."&Train=".$train;

    $result = file_get_contents($url);

    echo $result;
}


?>

