package com.careerconnect.jobportal.model;
import jakarta.persistence.*;
@Entity
public class JobSeekerProfile {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @OneToOne(optional=false) private PortalUser user;
 private String phone=""; private String qualification=""; @Column(length=2000) private String skills=""; @Column(length=3000) private String experience=""; private Integer experienceYears; private String portfolioUrl="";
 public Long getId(){return id;} public PortalUser getUser(){return user;} public void setUser(PortalUser v){user=v;} public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
 public String getQualification(){return qualification;} public void setQualification(String v){qualification=v;} public String getSkills(){return skills;} public void setSkills(String v){skills=v;}
 public String getExperience(){return experience;} public void setExperience(String v){experience=v;}
 public int getExperienceYears(){return experienceYears==null?0:experienceYears;} public void setExperienceYears(int v){experienceYears=Math.max(0,v);}
 public String getPortfolioUrl(){return portfolioUrl;} public void setPortfolioUrl(String v){portfolioUrl=v==null?"":v;}
}
