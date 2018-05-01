<?php
$book = $_GET["title"];
$mode = $_GET["mode"];
switch($mode){
    case ("info"):
        info($book);
    break;
    case ("description"):
        description($book);
    break;
    case ("reviews"):
        reviews($book);
    break;
    case ("books"):
        books();
    break;
    default:
        books();
    break;
}
function info($book){
    $path = "books/$book/info.txt";
    $txt = file($path);
    $output = array("title" => $txt[0], "author" => $txt[1], "stars" => $txt[2]);
    $json = json_encode($output);
    echo $json;
}
function description($book){
    $path = "books/$book/description.txt";
    $txt = file($path);
    $description = $txt[0];
    echo $description;
}
function reviews($book){
    $xml = "";
    foreach (glob("books/$book/review*.txt") as $filename){
       $name = file($filename)[0];
       $stars = file($filename)[1];
       $comments = file($filename)[2];
       $output = "<h3>$name<span>$stars</span></h3>\n<p>$comments</p>";
       $xml = $xml.$output;
    }
    echo $xml;
}
function books(){
    $xml = "<books>";
    foreach (glob("books/*") as $filename){
        $path = "$filename/info.txt";
        $txt = file($path);
        $name = rtrim($txt[0]);
        $output = "\n\t<book>\n";
        $output = $output."\t \t <title>$name</title>\n";
        $output = $output."\t \t <folder>$filename</folder>\n";
        $output = $output."\t </book>\n";
        $xml = $xml.$output;
    }
    $xml = $xml."</books>";
    echo $xml;
}
?>