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


class aes {

    // CRYPTO_CIPHER_BLOCK_SIZE 32

    private $_secret_key = 'benbentime';

    public function setKey($key) {
        $this->_secret_key = $key;
    }

    public function encode($data) {
        $td = mcrypt_module_open(MCRYPT_RIJNDAEL_256,'',MCRYPT_MODE_CBC,'');
        $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td),MCRYPT_RAND);
        mcrypt_generic_init($td,$this->_secret_key,$iv);
        $encrypted = mcrypt_generic($td,$data);
        mcrypt_generic_deinit($td);

        return $iv . $encrypted;
    }

    public function decode($data) {
        $td = mcrypt_module_open(MCRYPT_RIJNDAEL_256,'',MCRYPT_MODE_CBC,'');
        $iv = mb_substr($data,0,32,'latin1');
        mcrypt_generic_init($td,$this->_secret_key,$iv);
        $data = mb_substr($data,32,mb_strlen($data,'latin1'),'latin1');
        $data = mdecrypt_generic($td,$data);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);

        return trim($data);
    }
}
class ownCookie extends aes{
    private $_secret_soid = "benbentime";

    public function getCookie($data){
        $data_md5 = md5($data.$this->_secret_soid);
        $data_cookie = $_COOKIE[$data_md5];

        return $this->decode($data_cookie);
    }
    public function  setCookie($key, $value,$time){
        $key_md5 = md5($key.$this->_secret_soid);
        $this->setCookie($key_md5,$this->encode($value), $time);
    }
}
