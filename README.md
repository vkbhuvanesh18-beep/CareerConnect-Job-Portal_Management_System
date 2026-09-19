CareerConnect – Job Portal Management System

CareerConnect is a full-stack job portal built for a college project. It helps job seekers discover suitable opportunities and lets administrators manage job posts and candidate applications from one system.

## Features

- Job seekers can register, sign in, build a profile, browse jobs, and apply online.
- Profiles store skills, qualification, experience, phone number, and a portfolio link.
- The application calculates an explainable match score: **80% skill match + 20% experience match**.
- Applicants can track their application status: **APPLIED**, **SHORTLISTED**, **INTERVIEW**, or **OFFERED**.
- Administrators can add job posts, filter candidates by minimum match score, update candidate status, and schedule interviews.
- Candidates receive in-portal notifications after an application stage is updated.
- A JSON jobs API is available at `/api/v1/jobs`.

## Technology Stack

| Area | Technology |
| --- | --- |
| Backend | Java 21, Spring Boot 3.4.5, Spring MVC |
| Security | Spring Security, BCrypt password hashing |
| Database access | Spring Data JPA, Hibernate |
| Frontend | HTML5, CSS3, Thymeleaf, Vanilla JavaScript |
| Local database | H2 file database |
| Deployment database | MySQL 8 (optional profile) |
| Build tool | Maven Wrapper |

## Requirements

- Java Development Kit (JDK) 21
- Internet connection for the first Maven dependency download

## Run the Project

Open **PowerShell** in the project folder and run:

```powershell
cd C:\Users\vkbhu\Documents\JobPortalJava
.\mvnw.cmd spring-boot:run
```

Keep PowerShell open. When the console shows that CareerConnect has started, open:

```text
http://localhost:8080
```

> In PowerShell, `./mvnw.cmd` will not work. Use `./` only as `.` followed by a backslash: `./` is not the Windows syntax. The correct command is `.\mvnw.cmd spring-boot:run`.

## Default Administrator Login

| Field | Value |
| --- | --- |
| Username | `admin` |
| Password | `admin123` |

Use the administrator dashboard at:

```text
http://localhost:8080/admin/jobs
```

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/v1/jobs` | List active jobs. Optional: `query` and `location`. |
| GET | `/api/v1/jobs/{id}` | Get one job by its ID. |

Example:

```text
http://localhost:8080/api/v1/jobs?query=developer&location=Bengaluru
```

## MySQL Profile (Optional)

The app uses H2 by default. To run with MySQL, create a MySQL database and set these environment variables:

```powershell
$env:MYSQL_URL="jdbc:mysql://localhost:3306/careerconnect?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Kolkata"
$env:MYSQL_USERNAME="root"
$env:MYSQL_PASSWORD="your-password"
.\mvnw.cmd spring-boot:run "--spring.profiles.active=mysql"
```

## Project Structure

```text
src/main/java/          Spring Boot controllers, services, models, and repositories
src/main/resources/     Thymeleaf pages, CSS, and application configuration
presentation/           Browser-based academic presentation
docs/                   Runbook, API contracts, and Draw.io diagrams
```

## Academic Scope

This project demonstrates a responsive job portal, role-based access, database persistence, job matching, applicant tracking, and notification flow.
