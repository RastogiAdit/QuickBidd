package com.quickbidd.dto;

import com.quickbidd.model.User;

public class UserRegistrationResponse extends CommanApiResponse {

	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
