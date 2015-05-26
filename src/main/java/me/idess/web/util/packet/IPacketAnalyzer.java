package me.idess.web.util.packet;


/**
 * @author idess
 * @since 2012. 10. 22.
 * @version 1.0
 * 
 */
public interface IPacketAnalyzer {
	public Packet analyzeHexStringPacket(String hexPacket, String charset) throws Exception;
	
	public Packet analyze(String base64Bin, String charset) throws Exception;
	
	public Packet analyze(byte[] binary, String strData) throws Exception;
}
