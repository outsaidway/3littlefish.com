<?php
// 设置错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 检查是否是POST请求
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 获取表单数据
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // 基本验证
    if (empty($name) || empty($email) || empty($message)) {
        die('请填写所有必填字段');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('请输入有效的邮箱地址');
    }
    
    // 设置邮件接收者
    $to = "dudu@3littlefish.com"; // 替换为您的邮箱地址
    
    // 设置邮件头部
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // 构建邮件内容
    $email_content = "
    <html>
    <head>
        <title>新的联系表单消息</title>
    </head>
    <body>
        <h2>收到新的联系表单消息</h2>
        <p><strong>姓名：</strong> $name</p>
        <p><strong>邮箱：</strong> $email</p>
        <p><strong>主题：</strong> $subject</p>
        <p><strong>消息：</strong><br>$message</p>
    </body>
    </html>
    ";
    
    // 发送邮件
    $mail_sent = mail($to, "新联系表单消息: $subject", $email_content, $headers);
    
    // 返回结果
    if ($mail_sent) {
        echo json_encode(['status' => 'success', 'message' => '消息已成功发送！']);
    } else {
        echo json_encode(['status' => 'error', 'message' => '发送失败，请稍后重试。']);
    }
    
    exit;
}

// 如果不是POST请求，返回错误
header('HTTP/1.1 403 Forbidden');
echo '访问被拒绝';
?>