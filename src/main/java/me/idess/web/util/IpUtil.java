package me.idess.web.util;

import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;

import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * IP 유틸리티
 */
public class IpUtil {
	private static final Logger	logger		= LoggerFactory.getLogger(IpUtil.class);
	
	static final long			MaxIpNum	= 4294967295L;
	
	/**
	 * IP를 Long Type 으로 변환한다.
	 * 
	 * @param ipString
	 * @return
	 */
	public static long getHostByteOrderIpToLong(String ipString) throws Exception {
		String[] ipClass = ipString.split("\\.");
		Long ipLong = Long.valueOf(0L);
		for (int i = 0; i < ipClass.length; i++)
			ipLong |= Long.parseLong(ipClass[i]) << 24 - (i * 8);
		return ipLong.intValue();
	}
	
	/**
	 * Host Byte Order 방식으로 IP를 Long Type 으로 변환한다.
	 * 
	 * @param ipString
	 * @return
	 */
	public static long getNetworkByteOrderIpToLong(String ipString) throws Exception {
		String[] ipClass = ipString.split("\\.");
		Long ipLong = Long.valueOf(0L);
		for (int i = 0; i < ipClass.length; i++)
			ipLong |= Long.parseLong(ipClass[i]) << i * 8;
		return ipLong.intValue();
	}
	
	/**
	 * Long Type 을 IP로 변환한다.
	 * 
	 * @param ipNum
	 * @return
	 */
	public static String getHostByteOrderIpToString(long ipNum) {
		byte[] bytes = BigInteger.valueOf(ipNum).toByteArray();
		byte[] inetAddressBytes;
		
		// Should be 4 (IPv4) or 16 (IPv6) bytes long
		if (bytes.length == 5 || bytes.length == 17) {
			// Remove byte with most significant bit.
			bytes = ArrayUtils.remove(bytes, 0);
		}
		
		if (bytes.length < 4) {
			inetAddressBytes = new byte[4];
			int startPos = 4 - bytes.length;
			for (int i = 0; i < bytes.length; i++) {
				inetAddressBytes[startPos + i] = bytes[i];
			}
		} else if (bytes.length > 4 && bytes.length < 16) {
			inetAddressBytes = new byte[16];
			int startPos = 16 - bytes.length;
			for (int i = 0; i < bytes.length; i++) {
				inetAddressBytes[startPos + i] = bytes[i];
			}
		} else {
			inetAddressBytes = bytes;
		}
		InetAddress address = null;
		try {
			address = InetAddress.getByAddress(inetAddressBytes);
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		
		return address.getHostAddress();
	}
	
	/**
	 * Long Type 을 IP로 변환한다.
	 * 
	 * @param ipNum
	 * @return
	 */
	public static String getNetworkByteOrderIpToString(long ipNum) {
		byte[] bytes = BigInteger.valueOf(ipNum).toByteArray();
		ArrayUtils.reverse(bytes);
		byte[] inetAddressBytes;
		
		// Should be 4 (IPv4) or 16 (IPv6) bytes long
		if (bytes.length == 5 || bytes.length == 17) {
			// Remove byte with most significant bit.
			bytes = ArrayUtils.remove(bytes, 0);
		}
		
		if (bytes.length < 4) {
			inetAddressBytes = new byte[4];
			int startPos = 4 - bytes.length;
			for (int i = 0; i < bytes.length; i++) {
				inetAddressBytes[startPos + i] = bytes[i];
			}
		} else if (bytes.length > 4 && bytes.length < 16) {
			inetAddressBytes = new byte[16];
			int startPos = 16 - bytes.length;
			for (int i = 0; i < bytes.length; i++) {
				inetAddressBytes[startPos + i] = bytes[i];
			}
		} else {
			inetAddressBytes = bytes;
		}
		InetAddress address = null;
		try {
			address = InetAddress.getByAddress(inetAddressBytes);
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		
		return address.getHostAddress();
	}
	
	/**
	 * 파라미터가 ip 형식인지를 체크한다.
	 * 
	 * @param ip
	 *            확인할 ip
	 * @return
	 */
	public static boolean isIp(String ip) {
		if (ip == null)
			return false;
		
		return ip.matches("((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)");
	}
	
	/**
	 * 파라미터가 ip 형식의 일부인지를 체크한다.
	 * 
	 * @param ip
	 *            확인할 ip
	 * @return
	 */
	public static boolean isPartOfIp(String ip) {
		if (ip == null)
			return false;
		
		return ip
				.matches("([2][5][0-5]|[2][0-4]\\d|1\\d{2}|[1-9]\\d|\\d)(\\.?|\\.([2][5][0-5]|[2][0-4]\\d|1\\d{2}|[1-9]\\d|\\d)(\\.?|\\.([2][5][0-5]|[2][0-4]\\d|1\\d{2}|[1-9]\\d|\\d)(\\.?|\\.([2][5][0-5]|[2][0-4]\\d|1\\d{2}|[1-9]\\d|\\d))))");
	}
	
	/**
	 * 파라미터가 도메인명 형식인지를 체크한다.
	 * 
	 * @param domainName
	 *            확인할 도메인 명
	 * @return
	 */
	public static boolean isDomainName(String domainName) {
		if (domainName == null)
			return false;
		
		return domainName
				.matches("([a-z0-9]([-a-z0-9]*[a-z0-9])?\\.)+((a[cdefgilmnoqrstuwxz]|aero|arpa)|(b[abdefghijmnorstvwyz]|biz)|(c[acdfghiklmnorsuvxyz]|cat|com|coop)|d[ejkmoz]|(e[ceghrstu]|edu)|f[ijkmor]|(g[abdefghilmnpqrstuwy]|gov)|h[kmnrtu]|(i[delmnoqrst]|info|int)|(j[emop]|jobs)|k[eghimnprwyz]|l[abcikrstuvy]|(m[acdghklmnopqrstuvwxyz]|mil|mobi|museum)|(n[acefgilopruz]|name|net)|(om|org)|(p[aefghklmnrstwy]|pro)|qa|r[eouw]|s[abcdeghijklmnortvyz]|(t[cdfghjklmnoprtvwz]|travel)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])");
	}
	
	/**
	 * 문자형 ip 혹은 그 일부 형식의 파라미터를 정수형 ip 범위로 반환한다.
	 * 
	 * @param ip
	 * @return
	 * @throws NumberFormatException
	 */
	public static long[] getIpToLongRange(String ip) throws NumberFormatException {
		
		long[] ipRange = new long[2];
		if (ip == null || ip.length() == 0) {
			ipRange[0] = 0;
			ipRange[1] = MaxIpNum;
		} else {
			String[] ipClass = ip.split("\\.");
			long startIp = 0;
			for (int i = 0; i < ipClass.length; i++)
				startIp |= Long.parseLong(ipClass[i]) << 24 - (i * 8);
			
			long endIp = 0;
			switch (ipClass.length) {
			case 1:
				endIp |= 255L << 16;
				break;
			case 2:
				endIp |= 255L << 8;
				break;
			case 3:
				endIp |= 255L;
				break;
			case 4:
				endIp |= startIp;
				break;
			default:
				// throw an exception.
			}
			
			ipRange[0] = startIp;
			ipRange[1] = endIp;
		}
		
		logger.debug(String.format("IP %s is from %d to %d.", ip, ipRange[0], ipRange[1]));
		
		return ipRange;
	}
}
