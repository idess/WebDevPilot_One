package me.idess.web.util.packet;

import me.idess.web.util.IpUtil;

/**
 * IP 패킷
 * 
 * @author idess
 * @since 2012. 10. 23.
 * @version 1.0
 * 
 */
public class IpPacket extends Packet {
	short	version;		// 버전
	short	ipHdrLength;	// 헤더 크기
	short	typeOfService;	// 서비스 유형
	int		ipLength;		// 크기
	int		identification; // 식별자
	short	ipFlags;		// 플래그
	boolean	moreFragFlag;	// More Fragments 플래그
	boolean	dontFragFlag;	// Don't Fragment 플래그
	short	fragOffset;	// Fragment Offset
	short	ipTtl;			// TTL
	short	ipProtocol;	// 프로토콜
	short	ipChecksum;	// 체크썸
	long	srcIp;			// 소스 IP
	long	dstIp;			// 대상 IP
	String	strSrcIp;		// 소스 IP
	String	strDstIp;		// 대상 IP
							
	/**
	 * 생성자
	 * 
	 * @param binary
	 *            패킷 바이너리
	 */
	public IpPacket(byte[] binary) {
		super(binary);
		
		if (binary == null)
			return;
		
		short offset = 14;
		version = (short) ((0xff & binary[offset]) >>> 4);
		ipHdrLength = (short) ((binary[offset] & 0x0f) * 4);
		typeOfService = (short) (0xff & binary[offset + 1]);
		ipLength = (0xff & binary[offset + 2]) << 8 | (0xff & binary[offset + 3]);
		identification = ((0xff & binary[offset + 4]) << 8) | (0xff & binary[offset + 5]);
		ipFlags = (short) ((binary[offset + 6] & 0x60) >>> 4);
		dontFragFlag = (binary[offset + 6] & 0x40) != 0;
		moreFragFlag = (binary[offset + 6] & 0x20) != 0;
		fragOffset = (short) ((binary[offset + 6] & 0x1f) << 8 | (0xff & binary[offset + 7]));
		ipTtl = (short) (0xff & binary[offset + 8]);
		ipProtocol = (short) (0xff & binary[offset + 9]);
		ipChecksum = (short) ((0xff & binary[offset + 10]) << 8 | (0xff & binary[offset + 11]));
		srcIp = ((0xffL & binary[offset + 12]) << 24) | ((0xffL & binary[offset + 13]) << 16)
				| ((0xffL & binary[offset + 14]) << 8) | (0xffL & binary[offset + 15]);
		strSrcIp = IpUtil.getHostByteOrderIpToString(srcIp);
		dstIp = ((0xffL & binary[offset + 16]) << 24) | ((0xffL & binary[offset + 17]) << 16)
				| ((0xffL & binary[offset + 18]) << 8) | (0xffL & binary[offset + 19]);
		strDstIp = IpUtil.getHostByteOrderIpToString(dstIp);
	}
	
	@Override
	public String toString() {
		return "IpPacket [dontFragFlag=" + dontFragFlag + ", fragOffset=" + fragOffset + ", identification="
				+ identification + ", ipChecksum=" + ipChecksum + ", ipDstIp=" + dstIp + ", ipFlags=" + ipFlags
				+ ", ipHdrLength=" + ipHdrLength + ", ipLength=" + ipLength + ", ipProtocol=" + ipProtocol
				+ ", ipSrcIp=" + srcIp + ", ipTtl=" + ipTtl + ", moreFragFlag=" + moreFragFlag + ", typeOfService="
				+ typeOfService + ", version=" + version + "]";
	}
	
	public short getVersion() {
		return version;
	}
	
	public void setVersion(short version) {
		this.version = version;
	}
	
	public short getIpHdrLength() {
		return ipHdrLength;
	}
	
	public void setIpHdrLength(short ipHdrLength) {
		this.ipHdrLength = ipHdrLength;
	}
	
	public short getTypeOfService() {
		return typeOfService;
	}
	
	public void setTypeOfService(short typeOfService) {
		this.typeOfService = typeOfService;
	}
	
	public int getIpLength() {
		return ipLength;
	}
	
	public void setIpLength(int ipLength) {
		this.ipLength = ipLength;
	}
	
	public int getIdentification() {
		return identification;
	}
	
	public void setIdentification(int identification) {
		this.identification = identification;
	}
	
	public short getIpFlags() {
		return ipFlags;
	}
	
	public void setIpFlags(short ipFlags) {
		this.ipFlags = ipFlags;
	}
	
	public boolean isMoreFragFlag() {
		return moreFragFlag;
	}
	
	public void setMoreFragFlag(boolean moreFragFlag) {
		this.moreFragFlag = moreFragFlag;
	}
	
	public boolean isDontFragFlag() {
		return dontFragFlag;
	}
	
	public void setDontFragFlag(boolean dontFragFlag) {
		this.dontFragFlag = dontFragFlag;
	}
	
	public short getFragOffset() {
		return fragOffset;
	}
	
	public void setFragOffset(short fragOffset) {
		this.fragOffset = fragOffset;
	}
	
	public short getIpTtl() {
		return ipTtl;
	}
	
	public void setIpTtl(short ipTtl) {
		this.ipTtl = ipTtl;
	}
	
	public short getIpProtocol() {
		return ipProtocol;
	}
	
	public void setIpProtocol(short ipProtocol) {
		this.ipProtocol = ipProtocol;
	}
	
	public short getIpChecksum() {
		return ipChecksum;
	}
	
	public void setIpChecksum(short ipChecksum) {
		this.ipChecksum = ipChecksum;
	}
	
	public long getSrcIp() {
		return srcIp;
	}
	
	public void setSrcIp(long srcIp) {
		this.strSrcIp = IpUtil.getHostByteOrderIpToString(srcIp);
		this.srcIp = srcIp;
	}
	
	public long getDstIp() {
		return dstIp;
	}
	
	public void setDstIp(long dstIp) {
		this.strDstIp = IpUtil.getHostByteOrderIpToString(dstIp);
		this.dstIp = dstIp;
	}
	
	public String getStrSrcIp() {
		return strSrcIp;
	}
	
	public void setStrSrcIp(String strSrcIp) {
		this.strSrcIp = strSrcIp;
	}
	
	public String getStrDstIp() {
		return strDstIp;
	}
	
	public void setStrDstIp(String strDstIp) {
		this.strDstIp = strDstIp;
	}
	
}
