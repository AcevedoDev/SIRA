<?php
include('conexion.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ? AND password = ?");
    $stmt->bind_param("ss", $usuario, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        // Usuario autenticado correctamente
        $_SESSION['usuario_id'] = $user['id'];
        header("Location: dashboard.php");
        exit();
    } else {
        // Usuario o contraseña incorrectos, mostrar mensaje y detener ejecución
        echo "<script>
            alert('Usuario o contraseña incorrectos');
            window.location.href='index.html';
        </script>";
        exit();
    }
}
?>
