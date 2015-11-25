<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/13
 * Time: 下午9:59
 */
header("Content-Type: text/html; charset=UTF-8");
include("config/config.php");

// 获取用户名
$token = new ownCookie();
$token_string = $token->getCookie("token");


if(strlen($token_string)>24 ) {

    $sql = "select * from blog_token where bt_token";
    $re = mysqli_query($conn, $sql);

    if ($re) {
        echo 1;
    } else {
        echo 0;
    }
}