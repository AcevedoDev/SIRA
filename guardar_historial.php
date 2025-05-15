<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sengab";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  if (!isset($_POST['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
    exit;
  }
  $id = trim($_POST['id']);

  $horaEntrada = isset($_POST['horaEntrada']) && !empty($_POST['horaEntrada']) ? trim($_POST['horaEntrada']) : null;
  $horaSalida = isset($_POST['horaSalida']) && !empty($_POST['horaSalida']) ? trim($_POST['horaSalida']) : null;
  $checkIngreso = isset($_POST['checkIngreso']) ? $_POST['checkIngreso'] === 'true' || $_POST['checkIngreso'] === true : false;
  $checkSalida = isset($_POST['checkSalida']) ? $_POST['checkSalida'] === 'true' || $_POST['checkSalida'] === true : false;
  $observacion = isset($_POST['observacion']) ? trim($_POST['observacion']) : null;

  $todaysDate = date("Y-m-d");

  // Buscar registro existente
  $stmtSelect = $conn->prepare("SELECT * FROM historial_entrada_salida WHERE IDENTIFICACION = :id AND FECHA = :todaysDate");
  $stmtSelect->bindValue(':id', $id);
  $stmtSelect->bindValue(':todaysDate', $todaysDate);
  $stmtSelect->execute();
  $registro = $stmtSelect->fetch(PDO::FETCH_ASSOC);

  if ($registro) {
    // Solo actualizar observación si está vacía
    $camposActualizar = [];
    $params = [':id' => $id, ':todaysDate' => $todaysDate];

    if ($horaEntrada !== null) {
      $camposActualizar[] = "HORA_ENTRADA = :horaEntrada";
      $params[':horaEntrada'] = $horaEntrada;
    }
    if ($horaSalida !== null) {
      $camposActualizar[] = "HORA_SALIDA = :horaSalida";
      $params[':horaSalida'] = $horaSalida;
    }
    if (empty($registro['OBSERVACION']) && $observacion !== null && $observacion !== '') {
      $camposActualizar[] = "OBSERVACION = :observacion";
      $params[':observacion'] = $observacion;
    }

    if (count($camposActualizar) === 0) {
      echo json_encode(['success' => false, 'message' => 'No se enviaron datos para actualizar']);
      exit;
    }

    $sqlUpdate = "UPDATE historial_entrada_salida SET " . implode(", ", $camposActualizar) . " WHERE IDENTIFICACION = :id AND FECHA = :todaysDate";
    $stmtUpdate = $conn->prepare($sqlUpdate);
    foreach ($params as $key => $val) {
      $stmtUpdate->bindValue($key, $val);
    }
    $stmtUpdate->execute();

    echo json_encode(['success' => true, 'message' => 'Registro actualizado con éxito']);
    exit;
  } else {
    // Obtener datos del aprendiz
    $stmtAprendiz = $conn->prepare("SELECT IDENTIFICACION, NOMBRE_COMPLETO, CELULAR, PERFIL, FICHA, CORREO, PROGRAMA FROM registro_aprendiz WHERE IDENTIFICACION = :id");
    $stmtAprendiz->bindValue(':id', $id);
    $stmtAprendiz->execute();
    $aprendiz = $stmtAprendiz->fetch(PDO::FETCH_ASSOC);

    if (!$aprendiz) {
      echo json_encode(['success' => false, 'message' => 'Aprendiz no encontrado']);
      exit;
    }

    // Insertar registro
    $sqlInsert = "INSERT INTO historial_entrada_salida 
      (IDENTIFICACION, NOMBRE_COMPLETO, CELULAR, PERFIL, FICHA, CORREO, PROGRAMA, FECHA, HORA_ENTRADA, HORA_SALIDA, OBSERVACION)
      VALUES (:id, :nombre, :celular, :perfil, :ficha, :correo, :programa, CURDATE(), :horaEntrada, :horaSalida, :observacion)";

    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bindValue(':id', $aprendiz['IDENTIFICACION']);
    $stmtInsert->bindValue(':nombre', $aprendiz['NOMBRE_COMPLETO']);
    $stmtInsert->bindValue(':celular', $aprendiz['CELULAR']);
    $stmtInsert->bindValue(':perfil', $aprendiz['PERFIL']);
    $stmtInsert->bindValue(':ficha', $aprendiz['FICHA']);
    $stmtInsert->bindValue(':correo', $aprendiz['CORREO']);
    $stmtInsert->bindValue(':programa', $aprendiz['PROGRAMA']);
    $stmtInsert->bindValue(':horaEntrada', $checkIngreso ? $horaEntrada : null);
    $stmtInsert->bindValue(':horaSalida', $checkSalida ? $horaSalida : null);
    $stmtInsert->bindValue(':observacion', $observacion);
    $stmtInsert->execute();

    echo json_encode(['success' => true, 'message' => 'Registro creado con éxito']);
    exit;
  }
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
}
$conn = null;
?>
