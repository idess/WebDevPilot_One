package me.idess.web.util.packet;

import me.idess.web.util.security.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 패킷 분석기
 * 
 * @author idess
 * @since 2012. 10. 27.
 * @version 1.0
 * 
 */
public class PacketAnalyzer implements IPacketAnalyzer {
	private static final Logger	logger	= LoggerFactory.getLogger(PacketAnalyzer.class);
	
	/**
	 * 패킷을 분석한다.
	 * 
	 * @param hexPacket
	 *            HEX로 인코딩된 패킷 문자열
	 * @return 분석된 패킷
	 * @throws Exception
	 */
	public Packet analyzeHexStringPacket(String hexPacket, String charset) throws Exception {
		byte[] bin = null;
		String strData = null;
		char[] data = hexPacket.toUpperCase().toCharArray();
		if (data != null) {
			bin = toByte(data);
			strData = new String(bin, charset);
		}
		return analyze(bin, strData);
	}
	
	private byte[] toByte(char[] data) {
		byte[] bin = new byte[data.length / 2 + data.length % 2];
		for (int i = 0; i < data.length; i++) {
			byte ch = (byte) (Character.isDigit(data[i]) ? data[i] - '0' : data[i] - 'A' + 10);
			if (i % 2 == 0) {
				bin[i / 2] = (byte) (ch << 4);
			} else {
				bin[i / 2] |= ch;
			}
		}
		return bin;
	}
	
	/**
	 * 패킷을 분석한다.
	 * 
	 * @param base64Bin
	 *            Base64 인코딩된 패킷 문자열
	 * @return 분석된 패킷
	 * @throws Exception
	 */
	public Packet analyze(String base64Bin, String charset) throws Exception {
		byte[] binary = Base64.decode(base64Bin);
		
		return analyze(binary, new String(binary, charset));
	}
	
	/**
	 * 패킷을 분석한다.
	 * 
	 * @param binary
	 *            패킷 바이너리
	 * @param strData
	 *            바이너리 패킷을 String 으로 변환한 데이터
	 * @return 분석된 패킷
	 * @throws Exception
	 */
	public Packet analyze(byte[] binary, String strData) throws Exception {
		Packet packet = null;
		if (binary != null) {
			switch (binary[23]) {
			case 1: // ICMP
				packet = getIcmpPacket(binary);
				break;
			case 6: // TCP
				packet = getTcpPacket(binary);
				break;
			case 17: // UDP
				packet = getUdpPacket(binary);
				break;
			default:
				packet = getPacket(binary);
			}
		}
		packet.setDatalink(getEthernetPacket(binary));
		packet.setStrData(strData);
		
		return packet;
	}
	
	private Packet getPacket(byte[] binary) {
		Packet packet = new Packet(binary);
		
		return packet;
	}
	
	private EthernetPacket getEthernetPacket(byte[] binary) {
		if (binary == null)
			return null;
		return new EthernetPacket(binary);
	}
	
	private IcmpPacket getIcmpPacket(byte[] binary) {
		return new IcmpPacket(binary);
	}
	
	private TcpPacket getTcpPacket(byte[] binary) throws Exception {
		return new TcpPacket(binary);
	}
	
	private UdpPacket getUdpPacket(byte[] binary) {
		return new UdpPacket(binary);
	}
}
