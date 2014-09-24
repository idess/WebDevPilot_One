package com.kglory.tms.web.services;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.kglory.tms.web.controller.AuthenticationController;
import com.kglory.tms.web.exception.BaseException;
import com.kglory.tms.web.filter.SessionObject;
import com.kglory.tms.web.filter.TokenObject;
import com.kglory.tms.web.mapper.AccountMapper;
import com.kglory.tms.web.model.CommonBean.ReturnType;
import com.kglory.tms.web.model.dto.LoginFormDto;
import com.kglory.tms.web.model.vo.AccountVO;

@Service
public class AuthenticationService {
	
	private static final Logger	logger	= LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	MessageSource				messageSource;
	@Autowired
	AccountMapper				accountMapper;
	
	public void login(LoginFormDto dto, HttpSession session) throws BaseException {
		try {
			AccountVO accountVO = accountMapper.selectAccountByUsername(dto.getUsername());
			if (accountVO != null && accountVO.getPassword().equals(dto.getPassword())) {
				dto.setSuccessLogin("Y");
				dto.setToken(TokenObject.makeToken(dto.getUsername()));
				
				dto.setReturnType(ReturnType.success);
				dto.setErrorCode("");
				
				// 로그인 완료 후 세션 관리
				session.setAttribute("Username", dto.getUsername());
				session.setAttribute("Token", dto.getToken());
				SessionObject.addSession(dto.getUsername(), session);
				TokenObject.setToken(dto.getUsername(), dto.getToken());
			} else {
				dto.setSuccessLogin("N");
				
				dto.setReturnType(ReturnType.warning);
				dto.setErrorCode("username.password.invalid");
			}
		} catch (Exception e) {
			logger.error("(errorCode)" + e.getLocalizedMessage());
			throw new BaseException(messageSource, "errorCode", null, "", e);
		}
	}
	
}
