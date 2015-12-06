<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/2
 * Time: 下午10:32
 */
$db_name = "personBlog";
$db_host = "localhost";
$db_user = "blog";
$db_password = '94cc67509172617e4632de25412812de';

$conn = mysqli_connect($db_host, $db_user,$db_password,$db_name);

mysqli_query($conn, "set names utf8");




function pass_md5($data){
    return md5($data."benbentime");
}