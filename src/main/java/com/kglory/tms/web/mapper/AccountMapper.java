package com.kglory.tms.web.mapper;

import java.util.List;

import com.kglory.tms.web.model.vo.AccountVO;

public interface AccountMapper {
	
	AccountVO selectAccountByUsername(String userid);
	
	List<AccountVO> selectAccounts();
}
