package com.careerconnect.jobportal.repository;

import com.careerconnect.jobportal.model.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortalNotificationRepository extends JpaRepository<PortalNotification,Long> {
    List<PortalNotification> findByRecipientOrderByCreatedOnDesc(PortalUser recipient);
}
