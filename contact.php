<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    $name=$_POST['cont-name'];
    $email=$_POST['cont-mail'];
    $phone=$_POST['cont-tel'];
    $messege=$_POST['cont-msj'];
    $captcha=$_POST['g-recaptcha-response'];
    $secret='6LezXYoUAAAAAEsI0dRF_XssOI3GkDgWIhEPO63T';


    if(!$captcha){
        $confirm = "Por favor verifica el captcha.";
    }else{
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$captcha");
        $arr=json_decode($response, true);
        if($arr['success']){
            $confirm = "Mensaje enviado correctamente.";
        }else{
            $confirm = "Error! el captcha no es valido.";
        }
    }

    echo json_encode($confirm);
?>