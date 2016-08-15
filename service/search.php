<?php


use GuzzleHttp\Client;



function run_command($command_name){

    if($command_name=="search"){
        //TODO : rakib please check whether it is $_POST or $_GET to get the data
        $search_term = "";
        getSearchResult($search_term);
    }

    return Null;
}

function getSearchResult($search_term){

    $url = "https://developer.pillfill.com:443/service/v1/products";

    $urlData = array();
    $headers = array();
    $headers['api_key'] = '92a56ac1f3a69e47c68f3cae207f2a87';

    $queryParam = array();
    $queryParam['term'] = $search_term;
    $queryParam['type'] = 'name';
    $queryParam['page'] = '0';


    $urlData['headers'] = $headers;
    $urlData['query'] = $queryParam;

    $client = new Client();
    $response = $client->request('GET', $url, $urlData);

    if ($response->getStatusCode() == 200) {

        $results = json_decode($response->getBody(), true);
        // TODO : Please check whether we need to decode it to JSON ?
        return generateSearchList($results );
    }

    return null;
}


function generateSearchList($productList)
{
    $searchList = array();

    foreach ($productList as $product)
    {
        $tempData = array();
        $tempData['manufacturer'] = $product['manufacturer'];
        $tempData['item'] = $product['product']['name'];
        $tempData['genericMedicine'] = $product['product']['genericMedicine'];
        $tempData['form'] = $product['product']['form'];
        $tempData['splId'] = $product['splId'];
        array_push($searchList, $tempData);
    }
    return $searchList;
}

?>