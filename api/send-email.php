<?php
// Archivo: api/send-email.php
// Endpoint para enviar emails via SMTP Gmail desde React Native APK

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit();
}

// Validar datos requeridos
$required = ['to', 'subject', 'html', 'text', 'smtp'];
foreach ($required as $field) {
    if (!isset($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Campo requerido: $field"]);
        exit();
    }
}

// Configuración SMTP
$smtp = $input['smtp'];
$to = $input['to'];
$subject = $input['subject'];
$html = $input['html'];
$text = $input['text'];

try {
    // Crear email usando mail() nativo de PHP
    $from = $smtp['auth']['user'];
    $headers = [
        'From: ' . $from,
        'Reply-To: ' . $from,
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    $headersString = implode("\r\n", $headers);
    
    // Enviar email
    $success = mail($to, $subject, $html, $headersString);
    
    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Email enviado correctamente via SMTP',
            'to' => $to,
            'subject' => $subject,
            'method' => 'PHP mail() con SMTP Gmail'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al enviar email via mail()',
            'details' => error_get_last()
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error en servidor: ' . $e->getMessage()
    ]);
}
?>
