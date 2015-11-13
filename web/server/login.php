<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/13
 * Time: 下午9:59
 */
header("Content-Type: text/html; charset=UTF-8");
include("config/config.php");


$aes = new aes();
$aes->setKey('benbentime');

// 获取用户名
$username = md5("username");
$username_string = @$_COOKIE[$username];


if($username_string ) {
    $username_value = $aes->decode($username_string);
    $sql = "select * from blog_admin where ba_username='$username_value'";
    $re = mysqli_query($conn, $sql);

    if ($re) {
        echo 1;
    } else {
        echo 0;
    }
}