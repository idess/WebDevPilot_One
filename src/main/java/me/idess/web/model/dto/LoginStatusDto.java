package me.idess.web.model.dto;

import me.idess.web.model.CommonBean;

public class LoginStatusDto extends CommonBean {
	boolean	loginYN;
	
	public boolean isLoginYN() {
		return loginYN;
	}
	
	public void setLoginYN(boolean loginYN) {
		this.loginYN = loginYN;
	}
	
	@Override
	public String toString() {
		return "LoginStatusDto [loginYN=" + loginYN + "]";
	}
	
}
