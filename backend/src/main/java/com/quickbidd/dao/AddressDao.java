package com.quickbidd.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickbidd.model.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {

}
