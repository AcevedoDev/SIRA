<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sengab";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT IDENTIFICACION, NOMBRE_COMPLETO, PROGRAMA, FOTO, FECHA, HORA_ENTRADA, HORA_SALIDA, OBSERVACION,
    CASE WHEN HORA_ENTRADA IS NOT NULL THEN 1 ELSE 0 END AS ingreso,
    CASE WHEN HORA_SALIDA IS NOT NULL THEN 1 ELSE 0 END AS salida
    FROM historial_entrada_salida
    ORDER BY FECHA DESC, HORA_ENTRADA DESC");

  $stmt->execute();
  $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['success' => true, 'data' => $registros]);

} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>
