<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "jad_alsmadi@drjadurologyclinic.com";
    $subject = "طلب توظيف: أخصائي وسائل التواصل الاجتماعي";
    
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $additionalInfo = htmlspecialchars($_POST['additional-info']);

    $message = "تم استلام طلب التوظيف التالي:\n\n";
    $message .= "الاسم الكامل: $name\n";
    $message .= "البريد الإلكتروني: $email\n";
    $message .= "رقم الهاتف: $phone\n";
    $message .= "معلومات إضافية:\n$additionalInfo\n\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // File attachments
    $attachments = [];
    foreach (['cv', 'photo'] as $fileInput) {
        if (isset($_FILES[$fileInput]) && $_FILES[$fileInput]['error'] === UPLOAD_ERR_OK) {
            $attachments[] = $_FILES[$fileInput];
        }
    }

    if (!empty($attachments)) {
        $boundary = md5(uniqid(time()));
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= $message . "\r\n";

        foreach ($attachments as $attachment) {
            $fileContent = file_get_contents($attachment['tmp_name']);
            $fileContent = chunk_split(base64_encode($fileContent));
            $body .= "--$boundary\r\n";
            $body .= "Content-Type: " . $attachment['type'] . "; name=\"" . $attachment['name'] . "\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "Content-Disposition: attachment; filename=\"" . $attachment['name'] . "\"\r\n\r\n";
            $body .= $fileContent . "\r\n";
        }

        $body .= "--$boundary--\r\n";
    } else {
        $body = $message;
    }

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "تم إرسال الطلب بنجاح!";
    } else {
        echo "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.";
    }
} else {
    echo "طريقة الإرسال غير مسموحة.";
}
?>
