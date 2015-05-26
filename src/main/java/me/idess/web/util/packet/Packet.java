package me.idess.web.util.packet;

public class Packet {
	public static final short	PT_ETC		= 0;
	public static final short	PT_ICMP		= 1;
	public static final short	PT_TCP		= 2;
	public static final short	PT_UDP		= 3;
	
	private EthernetPacket		datalink;			// 데이터 링크
	protected byte[]			binary;			// 패킷 바이너리
	protected short				packetType	= 0;	// 패킷 유형
	private String				strData;			// 패킷을 스트링으로 파싱
													
	/**
	 * 생성자
	 * 
	 * @param binary
	 *            패킷 바이너리
	 */
	public Packet(byte[] binary) {
		this.binary = binary;
	}
	
	public EthernetPacket getDatalink() {
		return datalink;
	}
	
	public void setDatalink(EthernetPacket datalink) {
		this.datalink = datalink;
	}
	
	public byte[] getBinary() {
		return binary;
	}
	
	public short getPacketType() {
		return packetType;
	}
	
	public String getBinaryString() {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < binary.length; i++)
			sb.append(String.format("%02x", 0xff & binary[i]));
		
		return sb.toString();
	}
	
	public String getStrData() {
		return strData;
	}
	
	public void setStrData(String strData) {
		this.strData = strData;
	}
}
