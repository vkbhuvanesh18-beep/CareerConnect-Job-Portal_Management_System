package com.careerconnect.jobportal.controller;

import com.careerconnect.jobportal.model.Job;
import com.careerconnect.jobportal.repository.JobRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobApiController {
    private final JobRepository jobs;

    public JobApiController(JobRepository jobs) {
        this.jobs = jobs;
    }

    @GetMapping
    public List<Job> activeJobs(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "") String location) {
        return jobs.searchActiveJobs(LocalDate.now(), query.trim(), location.trim());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> jobById(@PathVariable Long id) {
        return jobs.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
