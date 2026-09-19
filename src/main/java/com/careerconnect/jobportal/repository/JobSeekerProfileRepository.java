package com.careerconnect.jobportal.repository;
import com.careerconnect.jobportal.model.*; import java.util.Optional; import org.springframework.data.jpa.repository.JpaRepository;
public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile,Long>{ Optional<JobSeekerProfile> findByUser(PortalUser user); }
