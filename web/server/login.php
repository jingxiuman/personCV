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
$username = new ownCookie();
$username_string = $username->getCookie("username");


if($username_string ) {
    $sql = "select * from blog_admin where ba_username='$username_string'";
    $re = mysqli_query($conn, $sql);

    if ($re) {
        echo 1;
    } else {
        echo 0;
    }
}