package com.careerconnect.jobportal.controller;

import com.careerconnect.jobportal.model.*;
import com.careerconnect.jobportal.repository.*;
import com.careerconnect.jobportal.service.NotificationService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller @RequestMapping("/admin")
public class AdminController {
    private final JobRepository jobs; private final JobApplicationRepository apps; private final NotificationService notificationService;
    public AdminController(JobRepository j,JobApplicationRepository a,NotificationService n){jobs=j;apps=a;notificationService=n;}
    @GetMapping("/jobs") public String jobs(Model m){m.addAttribute("jobs",jobs.findAll());return "admin/jobs";}
    @GetMapping("/jobs/new") public String form(Model m){m.addAttribute("job",new Job());return "admin/job-form";}
    @PostMapping("/jobs") public String save(@ModelAttribute Job job){jobs.save(job);return "redirect:/admin/jobs";}
    @GetMapping("/applications") public String applications(@RequestParam(defaultValue="0") int minMatch,Model m){List<JobApplication> candidates=apps.findAll().stream().filter(a->a.getMatchScore()>=minMatch).toList();m.addAttribute("applications",candidates);m.addAttribute("minMatch",minMatch);return "admin/applications";}
    @PostMapping("/applications/{id}/status") public String status(@PathVariable Long id,@RequestParam ApplicationStatus status,@RequestParam(required=false) String interviewScheduledAt){JobApplication application=apps.findById(id).orElseThrow();application.setStatus(status);if(interviewScheduledAt!=null&&!interviewScheduledAt.isBlank())application.setInterviewScheduledAt(LocalDateTime.parse(interviewScheduledAt));apps.save(application);notificationService.applicationStageChanged(application);return "redirect:/admin/applications";}
}
