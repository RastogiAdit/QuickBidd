package com.quickbidd.dto;

public class AddWalletMoneyRequestDto {
	
	private int userId;
	
	private double  walletAmount;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public double getWalletAmount() {
		return walletAmount;
	}

	public void setWalletAmount(double walletAmount) {
		this.walletAmount = walletAmount;
	}

}
