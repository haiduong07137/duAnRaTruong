package com.example.demo.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.demo.domain.User;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.OTPDto;
import com.example.demo.dto.UserDto;
import com.example.demo.repository.AgencyRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.OTPService;
import com.example.demo.service.OfferService;
import com.example.demo.service.UserService;
import com.example.demo.utils.EmailConstants;
import com.example.demo.service.SignUpService;

@Service
public class SignUpServiceImpl implements SignUpService {

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	@Autowired
	UserRepository userRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	OfferService offerService;

	@Autowired
	AgencyRepository agencyRepository;

	@Autowired
	EntityManager manager;

	@Autowired
	UserService userService;

	@Autowired
	JavaMailSender emailSender;

	@Autowired
	OTPService otpService;

	@Autowired
	RoleRepository roleRepository;

	EmailConstants myct;
	@Value("${spring.mail.username}")
	// Replace with your email here:
	private String emailAddress;

	@Override
	public UserDto createUser(AgencyDto dto) {
		User user = null;
		if (dto != null) {
			user = new User();
			user.setUsername(dto.getUsername());
			user.setEmail(dto.getEmail());
			user.setPassword(dto.getPassword());
			user.setActive(false);
			if (dto.getIsNetwork() == true) {
				user.setRole(roleRepository.getOne((long) 3));
			} else if(dto.getIsNetwork() == false) {
				user.setRole(roleRepository.getOne((long) 2));
			}
			user.setCreateDate(new Date());
			user.setModifyDate(new Date());
			
			user = userRepository.save(user);

		}
		return new UserDto(user);
	}

	@Override
	public void addProductToOfferForNewAgency(UUID idAgency) {

	}

	@Override
	public boolean checkEmail(AgencyDto dto) {
		List<UserDto> list = agencyRepository.findByEmail(dto.getEmail());
		if (list != null && list.size() > 0 && list.get(0) != null && list.get(0).getId() != null) {
			if (dto.getId() != null && StringUtils.hasText(dto.getId().toString())) {
				if (list.get(0).getId().equals(dto.getId())) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	@Override
	public boolean checkUsername(AgencyDto dto) {
		List<UserDto> list = agencyRepository.findByUsername(dto.getUsername());
		if (list != null && list.size() > 0 && list.get(0) != null && list.get(0).getId() != null) {
			if (dto.getId() != null && StringUtils.hasText(dto.getId().toString())) {
				if (list.get(0).getId().equals(dto.getId())) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	@Override
	public void sendMailRegister(String emailTo, String token, String hostSite) {
		ExecutorService emailExecutor = Executors.newSingleThreadExecutor();
		emailExecutor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					String url = hostSite + "confirmRegistration?token=" + token;

					String bodyEmail = EmailConstants.getEmailBody(url);

					try {
						// Tạo mail
						MimeMessage mail = emailSender.createMimeMessage();
						// Sử dụng lớp trợ giúp
						MimeMessageHelper helper = new MimeMessageHelper(mail);
						helper.setFrom(emailAddress);
						helper.setTo(emailTo);
						helper.setSubject("Offer Pro - Account Verification");
						helper.setText(bodyEmail, true);
						// Gửi mail
						emailSender.send(mail);
					} catch (Exception ex) {
						ex.printStackTrace();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
		emailExecutor.shutdown();
	}

	@Override
	public int confirmRegistration(String token) {
		OTPDto dto = otpService.findByToken(token);
		if (dto == null) {
			return 1;
		}

		int result;
		LocalDateTime now = new LocalDateTime();
		LocalDateTime expired = LocalDateTime.fromDateFields(dto.getExpired());

		result = now.compareTo(expired);
		if (result > 0) {
			return 2;
		}

		UserDto user = userService.getOne(dto.getUserId());
		user.setActive(true);
		userService.saveOrUpdate(user, user.getId());
		return 3;
	}

}
