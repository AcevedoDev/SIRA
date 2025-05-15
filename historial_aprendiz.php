<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sengab";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recibe el ID por GET
    if (!isset($_GET['id']) || empty(trim($_GET['id']))) {
        echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
        exit;
    }
    $id = trim($_GET['id']);

    // Traer historial completo
    $stmt = $conn->prepare("SELECT FECHA, HORA_ENTRADA, HORA_SALIDA, OBSERVACION FROM historial_entrada_salida WHERE IDENTIFICACION = :id ORDER BY FECHA DESC");
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    $historial = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Traer datos personales
    $stmt2 = $conn->prepare("SELECT IDENTIFICACION, NOMBRE_COMPLETO, CELULAR, PERFIL, CORREO, FICHA, PROGRAMA FROM registro_aprendiz WHERE IDENTIFICACION = :id");
    $stmt2->bindValue(':id', $id);
    $stmt2->execute();
    $datos = $stmt2->fetch(PDO::FETCH_ASSOC);

    if (!$datos) {
        echo json_encode(['success' => false, 'message' => 'Aprendiz no encontrado']);
        exit;
    }

    echo json_encode(['success' => true, 'historial' => $historial, 'datos' => $datos]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
