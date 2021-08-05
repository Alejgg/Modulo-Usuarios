<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$password = (isset($_POST['pass'])) ? $_POST['pass'] : '';
$tipo = (isset($_POST['tipo'])) ? $_POST['tipo'] : '';
$created_by = (isset($_POST['creador'])) ? $_POST['creador'] : '';
$login_count = 0;
$deleted = 0;
//$created_by = (isset($_POST['creador'])) ? $_POST['creador'] : '';

$pass = ($password);

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';





switch ($opcion) {
    case 1:

        $consulta = "SELECT * FROM usuarios WHERE email='$email'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        //$data = $resultado->fetchAll(PDO::FETCH_ASSOC);

        if ($resultado->rowCount() >= 1) {
            //Esto esta raro pero sirve
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $_SESSION["s_email"] = $data[0]["email"];
            if ($_SESSION["s_email"] === $email) {
                $consulta = "UPDATE usuarios SET deleted=0 WHERE email='$email'";
                $resultado = $conexion->prepare($consulta);
                $resultado->execute();
                echo 1;
                return 1;
                break;
            }
        } else {
            $_SESSION["s_usuario"] = null;
            $_SESSION["s_tipo"] = null;
            $data = null;
        }

        $pass = MD5($password);
        $consulta = "INSERT INTO `usuarios` (`email`, `usuario`, `pass`, `tipo`, `last_login_time`, `login_count`, `created_time`, `created_by`, `modified_time`, `modified_by`, `deleted`) VALUES
    ('$email', '$usuario', '$pass', '$tipo', CURRENT_TIMESTAMP, $login_count, CURRENT_TIMESTAMP, '$created_by', CURRENT_TIMESTAMP, NULL, 0)";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        echo 0;
        return 0;

        // $consulta = "SELECT * FROM usuarios";
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();
        // $data = $resultado->fetchAll(PDO::FETCH_ASSOC);

        break;
    case 2:
        $pass = MD5($password);
        $consulta = "UPDATE usuarios SET email='$email', usuario='$usuario', pass='$pass', tipo='$tipo',modified_time=CURRENT_TIMESTAMP, modified_by='$created_by' WHERE id='$id'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        echo 2;
        return 2;

        // $consulta = "SELECT * FROM usuarios WHERE deleted=0";
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();
        // $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:
        $consulta = "UPDATE usuarios SET deleted=1 WHERE id='$id' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 4:
        // $consulta = "SELECT * FROM usuarios WHERE deleted=0";
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();
        // $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}




print json_encode($data, JSON_UNESCAPED_UNICODE); //envio el array final el formato json a AJAX
$conexion = null;
