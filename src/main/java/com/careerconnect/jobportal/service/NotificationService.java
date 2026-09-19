package com.careerconnect.jobportal.service;

import com.careerconnect.jobportal.model.*;
import com.careerconnect.jobportal.repository.PortalNotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final PortalNotificationRepository notifications;
    public NotificationService(PortalNotificationRepository notifications){this.notifications=notifications;}
    public void applicationStageChanged(JobApplication application){
        PortalNotification notification=new PortalNotification(); notification.setRecipient(application.getApplicant());
        String text="Your application for " + application.getJob().getTitle()+" is now " + application.getStatus()+".";
        if(application.getInterviewScheduledAt()!=null) text+=" Interview scheduled for "+application.getInterviewScheduledAt()+".";
        notification.setMessage(text); notifications.save(notification);
    }
}
