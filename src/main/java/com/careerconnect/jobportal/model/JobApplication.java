package com.careerconnect.jobportal.model;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(uniqueConstraints=@UniqueConstraint(columnNames={"job_id","applicant_id"}))
public class JobApplication {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @ManyToOne(optional=false) private Job job; @ManyToOne(optional=false) private PortalUser applicant;
 @Column(length=3000) private String coverLetter=""; @Enumerated(EnumType.STRING) private ApplicationStatus status=ApplicationStatus.APPLIED; private LocalDateTime appliedOn=LocalDateTime.now();
 private Integer matchScore; private LocalDateTime interviewScheduledAt;
 public Long getId(){return id;} public Job getJob(){return job;} public void setJob(Job v){job=v;} public PortalUser getApplicant(){return applicant;} public void setApplicant(PortalUser v){applicant=v;}
 public String getCoverLetter(){return coverLetter;} public void setCoverLetter(String v){coverLetter=v;} public ApplicationStatus getStatus(){return status;} public void setStatus(ApplicationStatus v){status=v;} public LocalDateTime getAppliedOn(){return appliedOn;}
 public int getMatchScore(){return matchScore==null?0:matchScore;} public void setMatchScore(int v){matchScore=Math.max(0,Math.min(100,v));}
 public LocalDateTime getInterviewScheduledAt(){return interviewScheduledAt;} public void setInterviewScheduledAt(LocalDateTime v){interviewScheduledAt=v;}
}
