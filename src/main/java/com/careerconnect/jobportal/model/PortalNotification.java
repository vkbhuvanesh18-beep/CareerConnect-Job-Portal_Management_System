package com.careerconnect.jobportal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/** An in-portal notification sent when a recruiter changes an application stage. */
@Entity
public class PortalNotification {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private PortalUser recipient;
    @Column(nullable=false, length=1000) private String message;
    private LocalDateTime createdOn=LocalDateTime.now();
    private boolean read=false;
    public Long getId(){return id;} public PortalUser getRecipient(){return recipient;} public void setRecipient(PortalUser v){recipient=v;}
    public String getMessage(){return message;} public void setMessage(String v){message=v;} public LocalDateTime getCreatedOn(){return createdOn;}
    public boolean isRead(){return read;} public void setRead(boolean v){read=v;}
}
