package com.careerconnect.jobportal.model;

/** Recruitment stages used by the applicant-tracking pipeline. */
public enum ApplicationStatus {
    APPLIED, SHORTLISTED, INTERVIEW, OFFERED, REJECTED,
    /* Kept for compatibility with applications created by the earlier version. */
    PENDING, SELECTED
}
