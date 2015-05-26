package me.idess.web.filter;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 사용자 세션 관련
 */
public class SessionObject {
	
	private static final Logger				logger		= LoggerFactory.getLogger(SessionObject.class);
	
	private static Map<String, HttpSession>	sessionMap	= new HashMap<String, HttpSession>();
	
	private static String					controller	= "";
	
	public static void removeSession(String id) {
		
		try {
			if (sessionMap.containsKey(id)) {
				sessionMap.remove(id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.debug("removeSession id[" + id + "]");
		
	}
	
	public static void addSession(String id, HttpSession httpSession) {
		sessionMap.put(id, httpSession);
		logger.debug("addSession id[" + id + "]");
	}
	
	public static HttpSession getSession(String id) {
		logger.debug("getSession id[" + id + "]");
		return sessionMap.get(id);
	}
	
	public static Integer getSessionCount() {
		logger.debug("getSessionCount[" + sessionMap.size() + "]");
		return sessionMap.size();
	}
	
	public static Set<String> getUsers() {
		return sessionMap.keySet();
	}
	
	public static String getController() {
		return controller;
	}
	
	public static void setController(String controller) {
		SessionObject.controller = controller;
	}
	
}
