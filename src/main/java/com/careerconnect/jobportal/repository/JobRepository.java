package com.careerconnect.jobportal.repository;
import com.careerconnect.jobportal.model.Job; import java.time.LocalDate; import java.util.List; import org.springframework.data.jpa.repository.*; import org.springframework.data.repository.query.Param;
public interface JobRepository extends JpaRepository<Job,Long>{
 List<Job> findTop6ByDeadlineGreaterThanEqualOrderByPostedDateDesc(LocalDate date);
 @Query("select j from Job j where j.deadline>=:today and (:q='' or lower(j.title) like lower(concat('%',:q,'%')) or lower(j.companyName) like lower(concat('%',:q,'%')) or lower(j.category) like lower(concat('%',:q,'%'))) and (:location='' or lower(j.location) like lower(concat('%',:location,'%'))) order by j.postedDate desc")
 List<Job> searchActiveJobs(@Param("today") LocalDate today,@Param("q") String q,@Param("location") String location);
}
