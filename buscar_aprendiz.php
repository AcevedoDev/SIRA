<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sengab";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (!isset($_GET['id']) || empty(trim($_GET['id']))) {
        echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
        exit;
    }
    $id = trim($_GET['id']);
    $fechaHoy = date("Y-m-d");

    // Traer datos del aprendiz
    $stmtAprendiz = $conn->prepare("SELECT IDENTIFICACION, NOMBRE_COMPLETO, CELULAR, PERFIL, FICHA, CORREO, PROGRAMA FROM registro_aprendiz WHERE IDENTIFICACION = :id");
    $stmtAprendiz->bindValue(':id', $id);
    $stmtAprendiz->execute();
    $aprendiz = $stmtAprendiz->fetch(PDO::FETCH_ASSOC);

    if (!$aprendiz) {
        echo json_encode(['success' => false, 'message' => 'Aprendiz no encontrado']);
        exit;
    }

    // Traer horas del historial para hoy
    $stmtHistorial = $conn->prepare("SELECT HORA_ENTRADA, HORA_SALIDA, OBSERVACION FROM historial_entrada_salida WHERE IDENTIFICACION = :id AND FECHA = :fecha");
    $stmtHistorial->bindValue(':id', $id);
    $stmtHistorial->bindValue(':fecha', $fechaHoy);
    $stmtHistorial->execute();
    $historial = $stmtHistorial->fetch(PDO::FETCH_ASSOC);

    // Combinar datos
    $resultado = $aprendiz;
    if ($historial) {
        $resultado = array_merge($resultado, $historial);
    }

    echo json_encode(['success' => true, 'data' => $resultado]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
}

$conn = null;
?>
