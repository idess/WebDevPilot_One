package me.idess.web.util.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import me.idess.web.util.IpUtil;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Network Byte Order 방식으로 IP를 long type과 String type으로 변환해준다.
 */
@MappedJdbcTypes(JdbcType.NUMERIC)
public class HostByteOrderIpTypeHandler extends BaseTypeHandler<String> {
	private static final Logger	logger	= LoggerFactory.getLogger(HostByteOrderIpTypeHandler.class);
	
	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, String parameter, JdbcType jdbcType)
			throws SQLException {
		try {
			ps.setLong(i, IpUtil.getHostByteOrderIpToLong(parameter));
		} catch (Exception e) {
			logger.error(e.getLocalizedMessage());
			e.printStackTrace();
		}
	}
	
	@Override
	public String getNullableResult(ResultSet rs, String columnName) throws SQLException {
		long longIP = rs.getLong(columnName);
		return IpUtil.getHostByteOrderIpToString(longIP);
	}
	
	@Override
	public String getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		long longIP = rs.getLong(columnIndex);
		return IpUtil.getHostByteOrderIpToString(longIP);
	}
	
	@Override
	public String getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		long longIP = cs.getLong(columnIndex);
		return IpUtil.getHostByteOrderIpToString(longIP);
	}
	
}
