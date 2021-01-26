package projectXML.team9.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.ByteBuffer;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;

import projectXML.team9.configuration.PropertiesConfiguration;

@Component
public class AmazonSESSample {

	private static String SENDER = "Sender Name <%s>";
	private static String SUBJECT = "Customer service contact info";
	private static String BODY_TEXT = "Hello,\r\n" + "Please see the attached file for a list "
			+ "of customers to contact.";
	private static String BODY_HTML = "<html>" + "<head></head>" + "<body>" + "<h1>Hello!</h1>"
			+ "<p>Please see the attached file for a " + "list of customers to contact.</p>" + "</body>" + "</html>";

	@Autowired
	private PropertiesConfiguration configuration;

	public void sendMail(String recipient, String htmlURL, String pdfURL)
			throws AddressException, MessagingException, IOException {

		Session session = Session.getDefaultInstance(new Properties());

		// Create a new MimeMessage object.
		MimeMessage message = new MimeMessage(session);

		String sender = String.format(SENDER, configuration.getAwsConfiguration().getFrom());
		// Add subject, from and to lines.
		message.setSubject(SUBJECT, "UTF-8");
		message.setFrom(new InternetAddress(sender));
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));

		// Create a multipart/alternative child container.
		MimeMultipart msg_body = new MimeMultipart("alternative");

		// Create a wrapper for the HTML and text parts.
		MimeBodyPart wrap = new MimeBodyPart();

		// Define the text part.
		MimeBodyPart textPart = new MimeBodyPart();
		textPart.setContent(BODY_TEXT, "text/plain; charset=UTF-8");

		// Define the HTML part.
		MimeBodyPart htmlPart = new MimeBodyPart();
		htmlPart.setContent(BODY_HTML, "text/html; charset=UTF-8");

		// Add the text and HTML parts to the child container.
		msg_body.addBodyPart(textPart);
		msg_body.addBodyPart(htmlPart);

		// Add the child container to the wrapper object.
		wrap.setContent(msg_body);

		// Create a multipart/mixed parent container.
		MimeMultipart msg = new MimeMultipart("mixed");

		// Add the parent container to the message.
		message.setContent(msg);

		// Add the multipart/alternative part to the message.
		msg.addBodyPart(wrap);

		// Define the attachments
		MimeBodyPart att = new MimeBodyPart();
		DataSource fds = new FileDataSource(pdfURL);
		att.setDataHandler(new DataHandler(fds));
		att.setFileName(fds.getName());

		MimeBodyPart attHtml = new MimeBodyPart();
		DataSource fdsHtml = new FileDataSource(htmlURL);
		attHtml.setDataHandler(new DataHandler(fdsHtml));
		attHtml.setFileName(fdsHtml.getName());

		// Add the attachment to the message.
		msg.addBodyPart(att);
		msg.addBodyPart(attHtml);
		// Try to send the email.
		try {
			AmazonSimpleEmailService client = AmazonSimpleEmailServiceClientBuilder.standard()
					.withCredentials(new AWSStaticCredentialsProvider(
							new BasicAWSCredentials(configuration.getAwsConfiguration().getAccessKey(),
									configuration.getAwsConfiguration().getSecretKey())))
					.withRegion(Regions.US_EAST_2).build();

			// Send the email.
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			message.writeTo(outputStream);
			RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));
			SendRawEmailRequest rawEmailRequest = new SendRawEmailRequest(rawMessage);
			client.sendRawEmail(rawEmailRequest);
		} catch (Exception ex) {
			System.out.println("Email Failed");
			System.err.println("Error message: " + ex.getMessage());
			ex.printStackTrace();
		}
	}
}
