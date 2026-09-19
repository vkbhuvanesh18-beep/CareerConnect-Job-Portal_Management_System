package com.careerconnect.jobportal.model;
import jakarta.persistence.*; import java.math.BigDecimal; import java.time.*;
@Entity
public class Job {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String title; @Column(nullable=false) private String companyName; @Column(nullable=false) private String location; @Column(nullable=false) private String category;
 @Column(nullable=false,length=3000) private String description; @Column(nullable=false) private BigDecimal salary; @Column(nullable=false) private LocalDate deadline; @Column(nullable=false) private LocalDateTime postedDate=LocalDateTime.now();
 @Column(length=1000) private String requiredSkills=""; private Integer minimumExperienceYears;
 public Long getId(){return id;} public String getTitle(){return title;} public void setTitle(String v){title=v;} public String getCompanyName(){return companyName;} public void setCompanyName(String v){companyName=v;}
 public String getLocation(){return location;} public void setLocation(String v){location=v;} public String getCategory(){return category;} public void setCategory(String v){category=v;}
 public String getDescription(){return description;} public void setDescription(String v){description=v;} public BigDecimal getSalary(){return salary;} public void setSalary(BigDecimal v){salary=v;}
 public LocalDate getDeadline(){return deadline;} public void setDeadline(LocalDate v){deadline=v;} public LocalDateTime getPostedDate(){return postedDate;} public void setPostedDate(LocalDateTime v){postedDate=v;}
 public String getRequiredSkills(){return requiredSkills;} public void setRequiredSkills(String v){requiredSkills=v==null?"":v;}
 public int getMinimumExperienceYears(){return minimumExperienceYears==null?0:minimumExperienceYears;} public void setMinimumExperienceYears(int v){minimumExperienceYears=Math.max(0,v);}
}
