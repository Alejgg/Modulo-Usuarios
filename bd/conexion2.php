<?php 

class Conexion2{	  
    public static function Conectar2() {        
        define('servidor2', '192.168.236.129');
        define('nombre_bd2', 'datacenter');
        define('usuario2', 'crud');
        define('password2', '279855');					        
        $opciones2 = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');			
        try{
            $conexion2 = new PDO("mysql:host=".servidor2."; dbname=".nombre_bd2, usuario2, password2, $opciones2);			
            return $conexion2;
        }catch (Exception $e){
            die("El error de Conexión es: ". $e->getMessage());
        }
    }
}