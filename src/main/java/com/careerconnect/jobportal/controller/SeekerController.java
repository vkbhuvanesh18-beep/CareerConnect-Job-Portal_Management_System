package com.careerconnect.jobportal.controller;

import com.careerconnect.jobportal.model.*;
import com.careerconnect.jobportal.repository.*;
import com.careerconnect.jobportal.service.MatchingService;
import java.time.LocalDate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class SeekerController {
    private final PortalUserRepository users; private final JobRepository jobs; private final JobSeekerProfileRepository profiles;
    private final JobApplicationRepository apps; private final PortalNotificationRepository notifications; private final MatchingService matching;
    public SeekerController(PortalUserRepository u,JobRepository j,JobSeekerProfileRepository p,JobApplicationRepository a,PortalNotificationRepository n,MatchingService m){users=u;jobs=j;profiles=p;apps=a;notifications=n;matching=m;}
    @GetMapping("/profile") public String profile(Authentication a,Model m){m.addAttribute("profile",profile(a));return "profile";}
    @PostMapping("/profile") public String save(Authentication a,@RequestParam String phone,@RequestParam String qualification,@RequestParam String skills,@RequestParam(defaultValue="") String experience,@RequestParam(defaultValue="0") int experienceYears,@RequestParam(defaultValue="") String portfolioUrl){JobSeekerProfile p=profile(a);p.setPhone(phone);p.setQualification(qualification);p.setSkills(skills);p.setExperience(experience);p.setExperienceYears(experienceYears);p.setPortfolioUrl(portfolioUrl);profiles.save(p);return "redirect:/profile?saved";}
    @GetMapping("/jobs/{id}/apply") public String applyForm(Authentication a,@PathVariable Long id,Model m){Job job=jobs.findById(id).orElseThrow();m.addAttribute("job",job);m.addAttribute("matchScore",matching.score(job,profile(a)));return "apply";}
    @PostMapping("/jobs/{id}/apply") public String apply(Authentication a,@PathVariable Long id,@RequestParam(defaultValue="") String coverLetter){PortalUser u=user(a);Job job=jobs.findById(id).orElseThrow();JobSeekerProfile p=profile(a);if(p.getPhone().isBlank()||p.getQualification().isBlank()||p.getSkills().isBlank())return "redirect:/profile?incomplete";if(job.getDeadline().isBefore(LocalDate.now())||apps.existsByJobIdAndApplicantId(id,u.getId()))return "redirect:/jobs/"+id+"?alreadyApplied";JobApplication app=new JobApplication();app.setJob(job);app.setApplicant(u);app.setCoverLetter(coverLetter);app.setMatchScore(matching.score(job,p));apps.save(app);return "redirect:/applications?applied";}
    @GetMapping("/applications") public String applications(Authentication a,Model m){m.addAttribute("applications",apps.findByApplicantOrderByAppliedOnDesc(user(a)));return "applications";}
    @GetMapping("/notifications") public String notifications(Authentication a,Model m){m.addAttribute("notifications",notifications.findByRecipientOrderByCreatedOnDesc(user(a)));return "notifications";}
    private PortalUser user(Authentication a){return users.findByUsername(a.getName()).orElseThrow();} private JobSeekerProfile profile(Authentication a){return profiles.findByUser(user(a)).orElseThrow();}
}
