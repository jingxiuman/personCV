<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/13
 * Time: 下午9:59
 */
header("Content-Type: text/html; charset=UTF-8");
include("config/config.php");
include("class/AES.class.php");

// 获取用户名
$token_string = $_COOKIE['token'];
$username_md5 = md5('username');
$username_string = $_COOKIE[$username_md5];
$aes = new AES(("abcdefgh12345678"));
$username = $aes->decrypt($username_string);

if(strlen($token_string) == 32 ) {
    $now = date("Y-m-d");
    $sql = "select blog_token.id from blog_admin,blog_token
            where bt_user = blog_admin.id
            and  ba_username = '$username'
            and bt_token='$token_string'
            and bt_start <= '$now'
            and bt_end >= '$now' ";
    $re = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($re);
    if ($num) {
        echo 1;
    } else {
        echo 0;
    }
}