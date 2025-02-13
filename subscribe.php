<?php
header('Content-Type: application/json');

// 设置错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    
    if (!$email) {
        echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
        exit;
    }
    
    // 这里可以添加将邮箱保存到数据库或发送确认邮件的代码
    // 目前仅返回成功消息
    echo json_encode(['status' => 'success', 'message' => 'Thank you for subscribing!']);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']); 