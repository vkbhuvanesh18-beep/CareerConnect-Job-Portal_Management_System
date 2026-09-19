package com.careerconnect.jobportal.repository;
import com.careerconnect.jobportal.model.PortalUser; import java.util.Optional; import org.springframework.data.jpa.repository.JpaRepository;
public interface PortalUserRepository extends JpaRepository<PortalUser,Long>{ Optional<PortalUser> findByUsername(String username); boolean existsByUsername(String username); boolean existsByEmail(String email); }
