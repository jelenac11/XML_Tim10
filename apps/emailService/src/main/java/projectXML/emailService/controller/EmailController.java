package projectXML.emailService.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectXML.emailService.dto.EmailDTO;
import projectXML.emailService.services.AmazonSESSample;

@RestController
@RequestMapping(value = "/api/emails", consumes = MediaType.APPLICATION_XML_VALUE)
public class EmailController {

	@Autowired
	AmazonSESSample amazonSESSample;

	@PostMapping
	@CrossOrigin
	public void generateEmailObavestenje(@RequestBody EmailDTO emailDTO) {
		Session session = Session.getDefaultInstance(new Properties());
		ByteArrayInputStream str = new ByteArrayInputStream(emailDTO.getMime());
		try {
			MimeMessage msg = new MimeMessage(session, str);
			amazonSESSample.sendMail(emailDTO.getRecipient(), msg);
		} catch (MessagingException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
