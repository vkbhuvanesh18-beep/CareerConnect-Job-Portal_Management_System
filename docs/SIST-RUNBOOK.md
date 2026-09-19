# CareerConnect — Job Portal Management System

**Institution:** Sathyabama Institute of Science and Technology (SIST)  
**Technology:** Java 21, Spring Boot 3, Spring Security, JPA, HTML5, CSS Grid/Flexbox, JavaScript Fetch API, H2 (local development), MySQL 8 (deployment profile)

## Phase 1 — Define

### Problem statement
Generic job boards contain irrelevant or outdated listings. Recruiters also spend significant time manually comparing candidate skills and experience with job requirements. CareerConnect provides a focused job portal where job seekers maintain structured profiles and recruiters can manage applications using a transparent match score and hiring pipeline.

### User personas

| Persona | Goal | Main actions |
|---|---|---|
| Job seeker | Find relevant work and track applications | Register, create profile, add skills/education/experience/portfolio, apply, read notifications |
| Recruiter / admin | Find suitable candidates quickly | Create jobs, set required skills and minimum experience, filter candidates, update stages, schedule interviews |

### Acceptance criteria (Given / When / Then)

1. **Profile:** Given a registered job seeker, when they save their profile, then skills, education, experience years, qualification, phone number, and portfolio link are stored.
2. **Match score:** Given a job with required skill tags and experience requirement, when a job seeker applies, then the portal calculates and stores a 0–100 compatibility percentage.
3. **Recruitment pipeline:** Given an admin viewing applications, when a candidate stage is changed to APPLIED, SHORTLISTED, INTERVIEW, OFFERED, or REJECTED, then the new stage is stored in one click.
4. **Candidate filtering:** Given a recruiter provides a minimum score, when they apply the filter, then only candidates meeting that score are displayed.
5. **Notifications:** Given an application stage changes, when the update is saved, then an in-portal notification is created for the candidate. An interview date/time is stored when supplied.

## Phase 2 — Design

### Three-tier architecture

The system uses a presentation layer (responsive Thymeleaf HTML/CSS/JavaScript), an application layer (Spring MVC controllers, Spring Security, match and notification services), and a persistence layer (Spring Data JPA with H2 locally or MySQL 8 through the MySQL profile).

Import [system-architecture.drawio](system-architecture.drawio) into Draw.io to view or edit the architecture diagram. Import [database-schema.drawio](database-schema.drawio) for the 3NF relational schema.

### Database normalisation

The schema is in 3NF: user identity is separate from job seeker profile, jobs, applications, and notifications. The application table is the relationship between a job and a candidate and has a uniqueness rule that prevents duplicate applications for the same job.

### REST API contract

See [api-contracts.md](api-contracts.md). The live JSON endpoint is `GET /api/v1/jobs`. It supports `query` and `location` parameters and is used by the home-page JavaScript Fetch API.

## Phase 3 — Develop and Integrate

### Main functionality implemented

- Registration and login with BCrypt password hashing
- Job seeker profile with skills, education, experience, and portfolio URL
- Job posting with required skills and minimum experience
- Compatibility scoring (80% matching skills + 20% experience)
- One-click application stages and interview scheduling
- Recruiter score filter and in-portal candidate notifications
- Responsive HTML5/CSS Grid/Flexbox UI
- REST endpoint with restricted CORS configuration for `http://localhost:8080`

### Database profiles

- **Default profile:** H2 file database for easy local demonstration. This keeps the project usable without installing a database server.
- **MySQL profile:** [application-mysql.properties](../src/main/resources/application-mysql.properties) for MySQL 8. Database credentials come from environment variables rather than source code.

## Phase 4 — Deploy

### One-click local startup

Double-click [START-WEBSITE.bat](../START-WEBSITE.bat), keep the black window open, then visit `http://localhost:8080`.

### MySQL deployment checklist

1. Install and start MySQL 8.
2. Set `MYSQL_USERNAME` and `MYSQL_PASSWORD` on the host machine.
3. Start the JAR with `--spring.profiles.active=mysql`.
4. Confirm the portal opens at `http://localhost:8080`.

### GitHub and cloud status

The project has not been published to GitHub or a cloud host yet. Create a repository under the team account and add the real repository URL to this section before submission; do not submit a placeholder URL.

### Three-minute technical viva pitch

“CareerConnect solves the issue of generic job boards by matching a candidate’s structured skills and experience with job requirements. The frontend is built with responsive HTML, CSS, and JavaScript Fetch API. The backend is Java Spring Boot 3 with Spring Security and JPA. A job seeker creates a profile including skills, qualification, experience, and portfolio. When applying, the system calculates a transparent compatibility score: skills contribute 80 percent and experience contributes 20 percent. Recruiters use the admin dashboard to filter candidates by minimum score and update each candidate through Applied, Shortlisted, Interview, Offered, or Rejected stages. Every stage update creates an in-portal notification, and interviews can be scheduled with a date and time. For local demonstration we use H2, while an included MySQL profile supports MySQL 8 deployment. The project is started using one batch file and is available on localhost port 8080.”

## CARE prompt examples used for this project

**C — Context:** We are building a Java Spring Boot job portal for job seekers and recruiters.  
**A — Action:** Add a compatibility score based on required skills and experience.  
**R — Result:** Store and display a 0–100 percentage on applications and allow admin filtering.  
**E — Example:** Java, Spring Boot, and MySQL required; candidate has Java and Spring Boot with enough experience.
