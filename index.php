<?php

//* ===============
//* === api php ===
//* ===============

//* ===========================================================================================================================
//* script php que nos sirve como api para recolectar/capturar información que va a ser enviada desde el formulario del html
//* y se va a guardar en la base de datos 'empleados', en la tabla 'empleados'.
//* este archivo lo que hace es comunicarse con la bbdd e insertar | leer | modificar | eliminar  
//* ===========================================================================================================================

// ========================================
// === cabeceras para recibir los datos ===
// ========================================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// =============================================================================
// === conecta a la base de datos con usuario, contraseña y nombre de la BD ===
// =============================================================================
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "empleados";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// =========================================================================================
// === consulta datos y recepciona una clave para consultar dichos datos con dicha clave ===
// =========================================================================================
if (isset($_GET["consultar"])){

    $sqlEmpleados = mysqli_query($conexionBD,"SELECT * FROM empleados WHERE id=".$_GET["consultar"]);

    if(mysqli_num_rows($sqlEmpleados) > 0){
        
        $empleados = mysqli_fetch_all($sqlEmpleados,MYSQLI_ASSOC);
        echo json_encode($empleados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// ===================================================================
// === borrar pero se le debe de enviar una clave ( para borrado ) ===
// ===================================================================
if (isset($_GET["borrar"])){

    $sqlEmpleados = mysqli_query($conexionBD,"DELETE FROM empleados WHERE id=".$_GET["borrar"]);

    if($sqlEmpleados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// ==========================================================================================
// === inserta un nuevo registro y recepciona en método post los datos de nombre y correo ===
// ==========================================================================================
if(isset($_GET["insertar"])){

    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $correo=$data->correo;

    if(($correo!="")&&($nombre!="")){
            
        $sqlEmpleados = mysqli_query($conexionBD,"INSERT INTO empleados(nombre,correo) VALUES('$nombre','$correo') ");
        echo json_encode(["success"=>1]);
    }
    exit();
}

// ==========================================================================================================
// === actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización ===
// ==========================================================================================================
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $correo=$data->correo;
    
    $sqlEmpleados = mysqli_query($conexionBD,"UPDATE empleados SET nombre='$nombre',correo='$correo' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}

// ==========================================================
// === consulta todos los registros de la tabla empleados ===
// ==========================================================
$sqlEmpleados = mysqli_query($conexionBD,"SELECT * FROM empleados ");

if(mysqli_num_rows($sqlEmpleados) > 0){

    $empleados = mysqli_fetch_all($sqlEmpleados,MYSQLI_ASSOC);
    echo json_encode($empleados);
}
else{ echo json_encode([["success"=>0]]); }


?>