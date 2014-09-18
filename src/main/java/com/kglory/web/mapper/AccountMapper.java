package com.kglory.web.mapper;

import java.util.List;

import com.kglory.web.model.vo.AccountVO;

public interface AccountMapper {
	
	AccountVO selectAccountByUsername(String userid);
	
	List<AccountVO> selectAccounts();
}
