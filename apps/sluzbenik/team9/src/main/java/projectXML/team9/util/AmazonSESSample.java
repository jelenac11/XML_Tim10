package projectXML.team9.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import projectXML.team9.dto.EmailDTO;

@EnableAsync
@Component
public class AmazonSESSample {

	private static String SENDER = "Sender Name <%s>";
	private static String SUBJECT = "Customer service contact info";
	private static String BODY_TEXT = "Hello,\r\n" + "Please see the attached file for a list "
			+ "of customers to contact.";
	private static String BODY_HTML = "<html>" + "<head></head>" + "<body>" + "<h1>Hello!</h1>"
			+ "<p>Please see the attached file for a " + "list of customers to contact.</p>" + "</body>" + "</html>";

	private RestTemplate restTemplate;

	@Autowired
	public AmazonSESSample(RestTemplateBuilder restTemplateBuilder) {
		this.restTemplate = restTemplateBuilder.build();
	}

	@Async
	public void sendMailWhenZahtevIsAccepted(String recipient, String htmlURL, String pdfURL)
			throws AddressException, MessagingException, IOException {

		Session session = Session.getDefaultInstance(new Properties());

		// Create a new MimeMessage object.
		MimeMessage message = new MimeMessage(session);

		String sender = String.format(SENDER, "milan_marinkovic98@hotmail.com");
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

		MimeMultipart msg = new MimeMultipart("mixed");

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

		message.setContent(msg);

		msg.addBodyPart(wrap);

		sendMail(message);
	}

	public void sendMailWhenZahtevIsDenied(String recipient) throws AddressException, MessagingException, IOException {
		Session session = Session.getDefaultInstance(new Properties());

		// Create a new MimeMessage object.
		MimeMessage message = new MimeMessage(session);

		String sender = String.format(SENDER, "milan_marinkovic98@hotmail.com");
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

		MimeMultipart msg = new MimeMultipart("mixed");

		MimeBodyPart attHtml = new MimeBodyPart();
		attHtml.setText("");
		
		msg.addBodyPart(attHtml);

		message.setContent(msg);

		msg.addBodyPart(wrap);

		sendMail(message);
	}

	private void sendMail(MimeMessage message) throws IOException, MessagingException {
		// Create a multipart/mixed parent container.
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_XML);

		ByteArrayOutputStream str = new ByteArrayOutputStream();
		message.writeTo(str);

		EmailDTO emailDTO = new EmailDTO();
		emailDTO.setMime(str.toByteArray());

		HttpEntity<EmailDTO> request = new HttpEntity<EmailDTO>(emailDTO, headers);

		restTemplate.postForEntity("http://localhost:8083/api/emails", request, Void.class);
	}
}
