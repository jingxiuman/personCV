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



class ownCookie {
    private $_secret_soid = "benbentime";

    public function getCookie($data){
        $data_md5 = md5($data.$this->_secret_soid);
        $data_cookie = @$_COOKIE[$data_md5];

        return $data_cookie;
    }
    public function  setcookie($key, $value,$time){
        $this->setCookie($key,$value, $time);
    }
}
function pass_md5($data){
    return md5($data."benbentime");
}