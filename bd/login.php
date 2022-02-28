<?php
session_start(); //Nos deja usar las variables de sesion

include_once '../bd/conexion2.php';
$objeto = new Conexion2();
$conexion = $objeto->Conectar2();

//recepción de datos enviados mediante POST desde ajax
$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';
$fecha = "CURRENT_TIMESTAMP";

$pass = MD5($password); //encripto la clave enviada por el usuario 
//para compararla con la clava encriptada 
//y almacenada en la BD

//Consulta y ejecucion de usuarios
$consulta = "SELECT * FROM usuarios WHERE email='$usuario' AND pass='$pass' AND deleted=0";
$resultado = $conexion->prepare($consulta);
$resultado->execute();

//Si encuentra algo nos devuelve un valor
if ($resultado->rowCount() >= 1) {
    //Esto esta raro pero sirve
    $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
    $_SESSION["s_usuario"] = $usuario; //Arreglo de sesiones
    $_SESSION["s_tipo"] = $data[0]["tipo"];

    // $consulta = "UPDATE usuarios SET login_count=login_count+1, last_login_time=CURRENT_TIMESTAMP WHERE email='$usuario' AND pass='$pass' ";
    // $resultado = $conexion->prepare($consulta);
    // $resultado->execute();
} else {
    $_SESSION["s_usuario"] = null;
    $_SESSION["s_tipo"] = null;
    $data = null;
}

print json_encode($data);
$conexion = null;





include_once '../bd/conexion.php';
$objeto = new Conexion2();
$conexion = $objeto->Conectar2();

$consulta = "UPDATE usuarios SET login_count=login_count+1, last_login_time=CURRENT_TIMESTAMP WHERE email='$usuario' AND pass='$pass' ";
$resultado = $conexion->prepare($consulta);
$resultado->execute();

print json_encode($data);
$conexion = null;