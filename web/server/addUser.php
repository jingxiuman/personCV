<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/18
 * Time: 15:04
 */
include("config/config.php");
$username ="admin";
$password = "admin";

$password_data = pass_md5($password);
$sql ="insert into blog_admin ( ba_username, ba_nickName, ba_password, ba_email, ba_createTime) VALUE (
'$username','benbentime','$password_data','admin@zhouxianbao.cn',NOW()
)";
$re = mysqli_query($conn, $sql);