<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/3
 * Time: 下午2:48
 */
include("config/config.php");

$id = $_GET['blog_id'];
$reg = '/^\d+$/';
if(preg_match($reg,$id)){
    $sql = "select * from blog_news where id='$id'";
    $re_news=  mysqli_query($conn, $sql);
   // $news_data = '';
    $row_news = mysqli_fetch_array($re_news);
    $news_data = array(
        "id" => $row_news['id'],
        "newsPic" => $row_news['news_pic'],
        "newsTitle"=> $row_news['news_title'],
        "newsSee"=> $row_news['newsSee'],
        "newsCreateTime"=> $row_news['news_createTime'],
        "newsAuthor" => $row_news['news_author'],
        "newsContent" => $row_news['news_content']
    );

    echo json_encode($news_data);
}else{
    echo "非法输入";
}
