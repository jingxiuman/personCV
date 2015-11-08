<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/8
 * Time: 上午9:45
 */
include("config/config.php");

if(empty($type = strip_tags(@$_POST['type']))){
    $type = strip_tags(@$_GET['type']);
} ;


switch($type){
    case 'admin_index_num':
        admin_index_num($conn);
        break;
    case 'admin_blog':
        admin_blog($conn);
        break;
    default:
        echo "似乎你正在用不一样的方法看源代码呢!";
}

/*
 * 统计数据
 */
function admin_index_num($conn){
    $sql_blog = "select id from blog_news";
    $re_blog = mysqli_query($conn, $sql_blog);
    $num_blog = mysqli_num_rows($re_blog);

    $sql_project = "select id from blog_project ";
    $re_project = mysqli_query($conn , $sql_project);
    $num_project = mysqli_num_rows($re_project);

    $sql_log = "select id from blog_log ";
    $re_log = mysqli_query($conn , $sql_log);
    $num_log = mysqli_num_rows($re_log);

    $sql_user = "select id from blog_admin ";
    $re_user = mysqli_query($conn , $sql_user);
    $num_user = mysqli_num_rows($re_user);

    $data = array(
        'numBlog'=>$num_blog,
        'numProject'=> $num_project,
        'numSee' => $num_log,
        'numUser'=> $num_user
    );
    echo urldecode(json_encode($data));
}
/*
 * 博客列表数据
 */
function admin_blog($conn){
    $sql = "select * from blog_news ";
    $re = mysqli_query($conn, $sql);
    $data = [];
    while($row = mysqli_fetch_array($re)){
        $data[] = array(
            'id'=>$row['id'],
            'news_title'=> $row['news_title'],
            'newsSee'=>$row['newsSee'],
            'news_createTime'=> $row['news_createTime'],
            'news_changeTime'=> $row['news_changeTime'],
            'news_author'=> $row['news_author'],
            'news_show'=> $row['news_show']?'是':'否'
        );
    }
    echo urldecode(json_encode($data));
}