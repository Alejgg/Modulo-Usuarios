<?php 
class Conexion{	  
    public static function Conectar() {        
        define('servidor', '192.168.236.128');
        define('nombre_bd', 'datacenter');
        define('usuario', 'diss');
        define('password', '279855');					        
        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');			
        try{
            $conexion = new PDO("mysql:host=".servidor."; dbname=".nombre_bd, usuario, password, $opciones);			
            return $conexion;
        }catch (Exception $e){
            die("El error de Conexión es: ". $e->getMessage());
        }
    }
}
