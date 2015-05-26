package me.idess.web.util.packet;

/**
 * UDP 패킷
 * 
 * @author idess
 * @since 2012. 10. 23.
 * @version 1.0
 * 
 */
public class UdpPacket extends IpPacket {
	int		udpSrcPort;	// 소스 포트
	int		udpDstPort;	// 대상 포트
	int		udpLength;		// 크기
	short	udpChecksum;	// 체크썸
							
	/**
	 * 생성자
	 * 
	 * @param binary
	 *            패킷 바이너리
	 */
	public UdpPacket(byte[] binary) {
		super(binary);
		parse();
		this.packetType = PT_UDP;
	}
	
	private void parse() {
		short offset = (short) (ipHdrLength + 14);
		
		udpSrcPort = ((0xff & binary[offset]) << 8) | (0xff & binary[offset + 1]);
		udpDstPort = ((0xff & binary[offset + 2]) << 8) | (0xff & binary[offset + 3]);
		udpLength = ((0xff & binary[offset + 4]) << 8) | (0xff & binary[offset + 5]);
		udpChecksum = (short) (((0xff & binary[offset + 6]) << 8) | (0xff & binary[offset + 7]));
	}
	
	public int getUdpSrcPort() {
		return udpSrcPort;
	}
	
	public int getUdpDstPort() {
		return udpDstPort;
	}
	
	public int getUdpLength() {
		return udpLength;
	}
	
	public short getUdpChecksum() {
		return udpChecksum;
	}
	
}
