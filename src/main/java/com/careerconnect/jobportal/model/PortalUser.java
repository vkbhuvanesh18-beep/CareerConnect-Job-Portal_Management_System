package com.careerconnect.jobportal.model;
import jakarta.persistence.*;
@Entity @Table(name="portal_users")
public class PortalUser {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true) private String username;
 @Column(nullable=false) private String password;
 @Column(nullable=false) private String fullName;
 @Column(nullable=false,unique=true) private String email;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private Role role=Role.SEEKER;
 public Long getId(){return id;} public String getUsername(){return username;} public void setUsername(String v){username=v;}
 public String getPassword(){return password;} public void setPassword(String v){password=v;} public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;} public Role getRole(){return role;} public void setRole(Role v){role=v;}
}
