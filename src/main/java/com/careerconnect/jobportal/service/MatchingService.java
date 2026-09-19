package com.careerconnect.jobportal.service;

import com.careerconnect.jobportal.model.*;
import java.util.*;
import org.springframework.stereotype.Service;

/** Simple explainable AI-style matching: 80% skills + 20% experience. */
@Service
public class MatchingService {
    public int score(Job job, JobSeekerProfile profile) {
        Set<String> required=tags(job.getRequiredSkills());
        Set<String> candidate=tags(profile.getSkills());
        int skillScore=required.isEmpty()?80:(int)Math.round(80.0*required.stream().filter(candidate::contains).count()/required.size());
        int experienceScore=profile.getExperienceYears()>=job.getMinimumExperienceYears()?20:0;
        return Math.min(100,skillScore+experienceScore);
    }
    private Set<String> tags(String value){
        Set<String> result=new HashSet<>(); if(value==null)return result;
        for(String tag:value.toLowerCase().split(",")){String clean=tag.trim();if(!clean.isBlank())result.add(clean);} return result;
    }
}
