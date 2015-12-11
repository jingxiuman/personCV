<?php
/**
 * Created by PhpStorm.
 * User: knowthis
 * Date: 15/11/8
 * Time: 上午9:45
 */
include("config/config.php");
include("class/AES.class.php");

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
    case 'add_blog':
        add_blog();
        break;
    case 'admin_change_show':
        admin_change_show();
        break;
    case 'admin_blog_del':
        admin_blog_del();
        break;
    case 'admin_login':
        admin_login();
        break;
    case 'admin_user':
        admin_user();
        break;
    case 'cancel_login':
        cancel_login();
        break;
    default:
        echo "似乎你正在用不一样的方法看源代码呢!";
}


/*
 * 统计数据
 */
function admin_index_num($conn){
//
//检测是否登录了
    $username_md5 = md5("username");
    $username_string = @$_COOKIE[$username_md5];
    $token = @$_COOKIE['token'];
    $num_username = strlen($token);
    if( $num_username == 32) {
        $now = date("Y-m-d");
        $sql = "
            select blog_token.id
            from blog_admin,blog_token
            where bt_user = blog_admin.id
            and  ba_username = '$username_string'
            and bt_token='$token'
            and bt_start <= '$now'
            and bt_end >= '$now' ";
        $re = mysqli_query($conn, $sql);
        $num = mysqli_num_rows($re);
        if ($num>0) {
            echo 302;
        }
    }else{
        echo "302";
        exit;
    }

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
            'news_pic'=> '<img src="'.$row['news_pic'].'" width="64" height="64"/>',
            'newsSee'=>$row['newsSee'],
            'news_createTime'=> $row['news_createTime'],
            'news_changeTime'=> $row['news_changeTime'],
            'news_author'=> $row['news_author'],
            'news_show'=> $row['news_show']?'是':'否'
        );
    }
    echo urldecode(json_encode($data));
}
/*
 * 添加博客
 */
function add_blog(){
    global $conn;

    $newsTitle =  strip_tags($_POST['newsTitle']);
    $newsAuthor = strip_tags($_POST['newsAuthor']);
    $newsShow = strip_tags($_POST['newsShow']);
    $newsContent = $_POST['newsContent'];


     preg_match('/<img.+bootstrap-table="([^"]*?)".+>/i',$newsContent,$match);
    $match = @$match[1]?$match[1]:'';
    $sql ="insert into blog_news( news_pic, news_title,  news_createTime, news_changeTime, news_author, news_content, news_show)
VALUES('$match','$newsTitle', NOW(),NOW(),'$newsAuthor','$newsContent','$newsShow') ";
    $re = mysqli_query($conn, $sql);
    if($re){
        echo 1;
    }else{
       echo 0;
    }

}
/*
 * 修改显示状态
 */
function admin_change_show(){
    global $conn;
    $id = $_POST['id'];
    $value = $_POST['value'];
    if(preg_match('/^\d+$/',$id) ){
        $sql = '';
        if($_POST['valueType'] =='show') {
            if( preg_match('/^\d{1}$/', $value)) {
                $sql = "update blog_news set news_show='$value' where id='$id'";
            }
        }elseif($_POST['valueType'] == 'title'){
            $sql = "update blog_news set news_title='$value' where id='$id'";
        }
        $re = mysqli_query($conn, $sql);
        if($re){
            echo 1;

        }else{
            echo 0;
        }
    }else{
        echo "非法输入哦" ;
    }

}
/*
 * 删除波俄看
 */
 function admin_blog_del()
 {
     global $conn;
     $id = $_POST['id'];
     if (preg_match('/^\d+$/', $id)) {
         $sql = "delete  from blog_news where id='$id'";
         $re = mysqli_query($conn, $sql);
         if($re){
             echo 1;
         }else{
             echo 0;
         }
     }else{
         echo "非法输入哦" ;
     }
 }

/*
 * 用户登陆
 */

 function admin_login(){
     global $conn;
     $username = strip_tags($_POST['username']);
     $password = pass_md5($_POST['password']);

     $sql = "select id from blog_admin where ba_username='$username' and ba_password='$password'";
     $re = mysqli_query($conn, $sql);

     $num = mysqli_num_rows($re);
     if($num){

        /*
         * 存储token
         */
         $row = mysqli_fetch_array($re);
         $user_id = $row['id'];
         $time = time();
         $token = pass_md5($time.$user_id);
         $END_date = date('Y-m-d',strtotime('+30 day'));
         $sql_insert = " insert into blog_token ( bt_token, bt_start, bt_end,bt_user) VALUES ('$token',NOW(),'$END_date','$user_id')";
         mysqli_query($conn, $sql_insert);
         setcookie("token", $token,time()+3600*24*7*30,"/");

         $username_md5 = md5("username");
         $aes = new AES("abcdefgh12345678");
         $username_string = $aes->encrypt($username);
         setcookie($username_md5, $username_string,time()+3600*24*7*30,"/");

         echo 1;
     }else{
         echo 0;
     }
 }
/*
 * 获取用户名
 */
function admin_user(){
    $username_md5 = md5('username');
    $username_cookie = $_COOKIE[$username_md5];
    $aes = new AES("abcdefgh12345678");
    $username =  $aes->decrypt($username_cookie);
    echo $username;
}
/*
 * 注销登录
 */
function cancel_login(){
    global $conn;
    $username_md5 = md5("username");
    setcookie($username_md5,"",time() + 0,"/");
    $token = $_COOKIE['token'];
    $now = date("Y-m-d");
    $sql ="update blog_token set bt_end = '$now' where bt_token = '$token' ";
    $re = mysqli_query($conn, $sql);
    setcookie("token",'',time()+0,"/");
    echo 1;
}