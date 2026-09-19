package com.careerconnect.jobportal.repository;
import com.careerconnect.jobportal.model.*; import java.util.List; import org.springframework.data.jpa.repository.JpaRepository;
public interface JobApplicationRepository extends JpaRepository<JobApplication,Long>{ boolean existsByJobIdAndApplicantId(Long jobId,Long applicantId); List<JobApplication> findByApplicantOrderByAppliedOnDesc(PortalUser applicant); }
