package com.aimdek.google.DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.aimdek.google.model.Contact;

public class ContactDAOImpl implements ContactDAO {

    private JdbcTemplate jdbcTemplate;
    
    public ContactDAOImpl() {	
    }
    
    public ContactDAOImpl(DataSource dataSource) {
    	jdbcTemplate =new JdbcTemplate(dataSource);
    }
    
	@Override
	public void saveOrUpdate(Contact contact) {
		 if (contact.getId() > 0) {
		        // update
		        String sql = "UPDATE contact SET name=?, email=? WHERE contact_id=?";
		        jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getId());
		    } else {
		        // insert
		        String sql = "INSERT INTO contact (name, email)"
		                    + " VALUES (?, ?)";
		        jdbcTemplate.update(sql, contact.getName(), contact.getEmail());
		    }
	}

	@Override
	public void delete(int contactId) {
		 String sql = "DELETE FROM contact WHERE contact_id=?";
		 jdbcTemplate.update(sql, contactId);
	}

	@Override
	public Contact get(int contactId) {
		 String sql = "SELECT * FROM contact WHERE contact_id=" + contactId;
		 return jdbcTemplate.query(sql, new ResultSetExtractor<Contact>() {

			@Override
			public Contact extractData(ResultSet rs) throws SQLException, DataAccessException {
				 if (rs.next()) {
		                Contact contact = new Contact();
		                contact.setId(rs.getInt("contact_id"));
		                contact.setName(rs.getString("name"));
		                contact.setEmail(rs.getString("email"));
		                return contact;
		            }
		 
				return null;
			}
			 
		 });
	}

	@Override
	public List<Contact> list() {
		String sql = "SELECT * FROM contact";
	    List<Contact> listContact = jdbcTemplate.query(sql, new org.springframework.jdbc.core.RowMapper<Contact>() {

			@Override
			public Contact mapRow(ResultSet rs, int rowNum) throws SQLException {
				 Contact aContact = new Contact();

		            aContact.setId(rs.getInt("contact_id"));
		            aContact.setName(rs.getString("name"));
		            aContact.setEmail(rs.getString("email"));

		            return aContact;
			}

	    });
	    return listContact;
	}
}
