package com.careerconnect.jobportal.service;
import com.careerconnect.jobportal.model.PortalUser; import com.careerconnect.jobportal.repository.PortalUserRepository; import org.springframework.security.core.userdetails.*; import org.springframework.stereotype.Service;
@Service public class PortalUserDetailsService implements UserDetailsService { private final PortalUserRepository users; public PortalUserDetailsService(PortalUserRepository users){this.users=users;}
 public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException{PortalUser u=users.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found"));return User.withUsername(u.getUsername()).password(u.getPassword()).roles(u.getRole().name()).build();}}
