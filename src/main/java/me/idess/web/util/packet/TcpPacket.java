package me.idess.web.util.packet;

/**
 * TCP 패킷
 * 
 * @author idess
 * @since 2012. 10. 23.
 * @version 1.0
 * 
 */
public class TcpPacket extends IpPacket {
	int		tcpSrcPort;	// 소스 포트
	int		tcpDstPort;	// 대상 포트
	long	seqNo;			// 일련 번호
	long	ackNo;			// 답신 번호
	short	tcpOffset;		// 오프셋
	short	reserved;		// 예약
	short	tcpFlags;		// 플래그
	boolean	urgFlag;		// URG 플래그
	boolean	ackFlag;		// ACK 플래그
	boolean	pshFlag;		// PUSH 플래그
	boolean	rstFlag;		// RST 플래그
	boolean	synFlag;		// SYN 플래그
	boolean	finFlag;		// FIN 플래그
	int		windowSize;	// 윈도우 사이즈
	short	tcpChecksum;	// 체크썸
	int		urgentPtr;		// Urgent 포인터
	short	optionSize;	// 옵션 크기
							
	/**
	 * 생서자
	 * 
	 * @param binary
	 *            패킷 바이너리
	 * @throws Exception 
	 */
	public TcpPacket(byte[] binary) throws Exception {
		super(binary);
		parse();
		this.packetType = PT_TCP;
	}
	
	private void parse() throws Exception {
		try {
			short offset = (short) (ipHdrLength + 14);
			
			tcpSrcPort = ((0xff & binary[offset]) << 8) | (0xff & binary[offset + 1]);
			tcpDstPort = ((0xff & binary[offset + 2]) << 8) | (0xff & binary[offset + 3]);
			seqNo = ((0xffL & binary[offset + 4]) << 24) | ((0xffL & binary[offset + 5]) << 16) | ((0xffL & binary[offset + 6]) << 8)
					| (0xffL & binary[offset + 7]);
			ackNo = ((0xffL & binary[offset + 8]) << 24) | ((0xffL & binary[offset + 9]) << 16) | ((0xffL & binary[offset + 10]) << 8)
					| (0xffL & binary[offset + 11]);
			tcpOffset = (short) (((0xff & binary[offset + 12]) >>> 4) * 4);
			reserved = (short) ((0x0f & binary[offset + 12]) << 2 | (binary[offset + 13] & 0xc0) >>> 6);
			tcpFlags = (short) (binary[offset + 13] & 0x3f);
			urgFlag = (binary[offset + 13] & 0x20) != 0;
			ackFlag = (binary[offset + 13] & 0x10) != 0;
			pshFlag = (binary[offset + 13] & 0x08) != 0;
			rstFlag = (binary[offset + 13] & 0x04) != 0;
			synFlag = (binary[offset + 13] & 0x02) != 0;
			finFlag = (binary[offset + 13] & 0x01) != 0;
			windowSize = ((0xff & binary[offset + 14]) << 8) | (0xff & binary[offset + 15]);
			tcpChecksum = (short) (((0xff & binary[offset + 16]) << 8) | (0xff & binary[offset + 17]));
			urgentPtr = (short) (((0xff & binary[offset + 18]) << 8) | (0xff & binary[offset + 19]));
			optionSize = (short) (tcpOffset - 20);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Override
	public String toString() {
		return super.toString() + "\n" + "TcpPacket [ackFlag=" + ackFlag + ", ackNo=" + ackNo + ", checksum=" + tcpChecksum + ", dstPort="
				+ tcpDstPort + ", finFlag=" + finFlag + ", offset=" + tcpOffset + ", optionSize=" + optionSize + ", pshFlag=" + pshFlag
				+ ", rstFlag=" + rstFlag + ", seqNo=" + seqNo + ", srcPort=" + tcpSrcPort + ", synFlag=" + synFlag + ", urgFlag=" + urgFlag
				+ ", urgentPtr=" + urgentPtr + ", windowSize=" + windowSize + "]";
	}
	
	public int getTcpSrcPort() {
		return tcpSrcPort;
	}
	
	public int getTcpDstPort() {
		return tcpDstPort;
	}
	
	public long getSeqNo() {
		return seqNo;
	}
	
	public long getAckNo() {
		return ackNo;
	}
	
	public short getTcpOffset() {
		return tcpOffset;
	}
	
	public short getReserved() {
		return reserved;
	}
	
	public short getTcpFlags() {
		return tcpFlags;
	}
	
	public boolean getUrgFlag() {
		return urgFlag;
	}
	
	public boolean getAckFlag() {
		return ackFlag;
	}
	
	public boolean getPshFlag() {
		return pshFlag;
	}
	
	public boolean getRstFlag() {
		return rstFlag;
	}
	
	public boolean getSynFlag() {
		return synFlag;
	}
	
	public boolean getFinFlag() {
		return finFlag;
	}
	
	public int getWindowSize() {
		return windowSize;
	}
	
	public short getTcpChecksum() {
		return tcpChecksum;
	}
	
	public int getUrgentPtr() {
		return urgentPtr;
	}
	
	public short getOptionSize() {
		return optionSize;
	}
	
}
