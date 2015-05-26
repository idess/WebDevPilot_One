package me.idess.web.util.packet;

/**
 * ICMP 패킷
 * 
 * @author idess
 * @since 2012. 10. 23.
 * @version 1.0
 * 
 */
public class IcmpPacket extends IpPacket {
	private short	icmpType;		// ICMP 유형
	private String	icmpTypeDesc;	// ICMP 유형 설명
	short			icmpCode;		// ICMP 코드
	short			icmpChecksum;	// ICMP 체크썸
									// short id;
									// short seqNo;
									
	/**
	 * 생성자
	 * 
	 * @param binary
	 *            패킷 바이너리
	 */
	public IcmpPacket(byte[] binary) {
		super(binary);
		parse();
		this.packetType = PT_ICMP;
	}
	
	private void parse() {
		short offset = (short) (ipHdrLength + 14);
		
		setType((short) (0xff & binary[offset]));
		icmpCode = (short) (0xff & binary[offset + 1]);
		icmpChecksum = (short) (((0xff & binary[offset + 2]) << 8) | (0xff & binary[offset + 3]));
	}
	
	void setType(short type) {
		switch (type) {
		case 0:
			icmpTypeDesc = "Echo reply";
			break;
		case 3:
			icmpTypeDesc = "Destination unreachable";
			break;
		case 4:
			icmpTypeDesc = "Source quench";
			break;
		case 5:
			icmpTypeDesc = "Redirect";
			break;
		case 8:
			icmpTypeDesc = "Echo request";
			break;
		case 9:
			icmpTypeDesc = "Router advertisement";
			break;
		case 10:
			icmpTypeDesc = "Router selection";
			break;
		case 11:
			icmpTypeDesc = "Time exceeded";
			break;
		case 12:
			icmpTypeDesc = "Parameter problem";
			break;
		case 13:
			icmpTypeDesc = "Timestamp";
			break;
		case 14:
			icmpTypeDesc = "Timestamp reply";
			break;
		case 15:
			icmpTypeDesc = "Information request";
			break;
		case 16:
			icmpTypeDesc = "Information reply";
			break;
		case 17:
			icmpTypeDesc = "Address mask request";
			break;
		case 18:
			icmpTypeDesc = "Address mask reply";
			break;
		case 30:
			icmpTypeDesc = "Traceroute";
			break;
		default:
			icmpTypeDesc = "";
		}
	}
	
	@Override
	public String toString() {
		return "IcmpPacket [icmpChecksum=" + icmpChecksum + ", icmpCode=" + icmpCode + ", icmpType=" + icmpType + ", icmpTypeDesc=" + icmpTypeDesc
				+ "]";
	}
	
	public short getIcmpType() {
		return icmpType;
	}
	
	public String getIcmpTypeDesc() {
		return icmpTypeDesc;
	}
	
	public short getIcmpCode() {
		return icmpCode;
	}
	
	public short getIcmpChecksum() {
		return icmpChecksum;
	}
	
}
