<?php
require_once("PHPMailer/PHPMailerAutoload.php");


/**
 * @param $email
 * @param $subject
 * @param $body
 * @return bool
 */
function send_mail_extended($email, $subject, $body)
{
    $Mail = new PHPMailer();
    //$mail->isSendmail();

    //$mail->IsSMTP(); // enable SMTP
    //$mail->SMTPAuth = true; // authentication enabled
    //$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    //$mail->Host = "smtp.gmail.com";
    //$mail->Port = 587; // or 587
    //$mail->IsHTML(true);
    //$mail->Username = "miboxtest1@gmail.com";
    //$mail->Password = "Miboxtest";

    $Mail = new PHPMailer();
    //$Mail->IsSMTP(); // Use SMTP
    $Mail->isSendmail();
    //$Mail->Host        = "smtp.gmail.com"; // Sets SMTP server
    //$Mail->SMTPDebug   = 2; // 2 to enable SMTP debug information
   // $Mail->SMTPAuth    = TRUE; // enable SMTP authentication
    //$Mail->SMTPSecure  = "ssl"; //Secure conection
    //$Mail->Port        = 465; // set the SMTP port
    //$Mail->Username    = 'miboxtest1@gmail.com'; // SMTP account username
    //$Mail->Password    = 'Miboxtest'; // SMTP account password
    //$Mail->Priority    = 1; // Highest priority - Email priority (1 = High, 3 = Normal, 5 = low)
    $Mail->CharSet     = 'UTF-8';
    $Mail->Encoding    = '8bit';
    $Mail->Subject     = $subject;
    $Mail->ContentType = 'text/html; charset=utf-8\r\n';
    $Mail->From        = 'miboxtest1@gmail.com';
    $Mail->FromName    = 'Drug Info';
    $Mail->WordWrap    = 900; // RFC 2822 Compliant for Max 998 characters per line

    $Mail->AddAddress( $email ); // To:
    $Mail->isHTML( TRUE );
    $Mail->Body    = $body;
    //$Mail->Send();
    //$Mail->SmtpClose();

    //$mail->setFrom("info@drugfinder.com");
   // $mail->addAddress($email);
    //$mail->Subject = $subject;
    //$mail->Body = $body;


    if (!$Mail->send()) {
        $Mail->SmtpClose();
        return false;
    }
    $Mail->SmtpClose();
    return true;
}
