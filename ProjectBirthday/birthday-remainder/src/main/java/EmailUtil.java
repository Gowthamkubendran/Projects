import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailUtil {
    public static void sendEmail(String to, String subject, String content) throws UnsupportedEncodingException {
        final String from = "kubendranrani50@gmail.com";  
        final String fromName = "Birthday Reminder App";// Replace with your email
        final String password = "spkp ytir lozz kacb";        // Use App Password (not your email password)

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
           
            message.setFrom(new InternetAddress(from, fromName));

            // Set reply-to address
            message.setReplyTo(InternetAddress.parse(from));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            message.setSubject(subject);
            message.setContent(content, "text/html; charset=utf-8");

            Transport.send(message);
            System.out.println("✅ Email sent to " + to);
        } catch (MessagingException e) {
             System.out.println("Email sending failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
