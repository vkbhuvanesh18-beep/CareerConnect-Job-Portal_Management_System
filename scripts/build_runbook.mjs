import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "C:/Users/vkbhu/Documents/JobPortalJava/docs/Student_FullStack_Project_Runbook.xlsx";
const font = "Arial";
const navy = "#17365D";
const blue = "#2F75B5";
const paleBlue = "#D9EAF7";
const paleYellow = "#FFF2CC";
const paleGray = "#F3F6F9";
const border = "#D9E2F3";

const wb = Workbook.create();

function addSheet(name, title, subtitle) {
  const sheet = wb.worksheets.add(name);
  sheet.showGridLines = false;
  sheet.getRange("A1:H1").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1:H1").format.font = { name: font, size: 16, bold: true, color: navy };
  sheet.getRange("A1:H1").format.rowHeight = 28;
  sheet.getRange("A2:H2").merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange("A2:H2").format.font = { name: font, size: 10, italic: true, color: "#5B6B7B" };
  sheet.getRange("A3:H3").format.fill = navy;
  sheet.getRange("A3:H3").format.rowHeight = 4;
  sheet.getRange("A1:H70").format.font = { name: font, size: 10, color: "#1F2937" };
  sheet.getRange("A:A").format.columnWidth = 21;
  sheet.getRange("B:B").format.columnWidth = 30;
  sheet.getRange("C:C").format.columnWidth = 26;
  sheet.getRange("D:D").format.columnWidth = 28;
  sheet.getRange("E:E").format.columnWidth = 26;
  sheet.getRange("F:F").format.columnWidth = 25;
  sheet.getRange("G:G").format.columnWidth = 22;
  sheet.getRange("H:H").format.columnWidth = 22;
  return sheet;
}

function section(sheet, row, text, end = "H") {
  sheet.mergeCells(`A${row}:${end}${row}`);
  const r = sheet.getRange(`A${row}:${end}${row}`);
  r.values = [[text]];
  r.format.fill = paleBlue;
  r.format.font = { name: font, size: 11, bold: true, color: navy };
  r.format.rowHeight = 22;
}

function header(sheet, range) {
  const r = sheet.getRange(range);
  r.format.fill = blue;
  r.format.font = { name: font, size: 10, bold: true, color: "#FFFFFF" };
  r.format.horizontalAlignment = "center";
  r.format.verticalAlignment = "center";
  r.format.wrapText = true;
  r.format.borders = { preset: "all", style: "thin", color: "#FFFFFF" };
}

function table(sheet, start, rows, headerRow = true) {
  const cols = rows[0].length;
  const startRow = Number(start.match(/\d+/)[0]);
  const startCol = start.match(/[A-Z]+/)[0];
  const endCol = String.fromCharCode(startCol.charCodeAt(0) + cols - 1);
  const range = `${start}:${endCol}${startRow + rows.length - 1}`;
  sheet.getRange(range).values = rows;
  const bodyStart = headerRow ? startRow + 1 : startRow;
  if (headerRow) header(sheet, `${startCol}${startRow}:${endCol}${startRow}`);
  const body = sheet.getRange(`${startCol}${bodyStart}:${endCol}${startRow + rows.length - 1}`);
  body.format.wrapText = true;
  body.format.verticalAlignment = "top";
  body.format.borders = { preset: "all", style: "thin", color: border };
  return range;
}

// 1. Student information
{
  const s = addSheet("1. Student Info & Instructions", "CareerConnect Job Portal Management System", "Official SIST engineering portfolio runbook. Complete the highlighted team fields before submission.");
  section(s, 5, "Project and team information");
  table(s, "A6", [
    ["Field", "Current value", "Status"],
    ["Project title", "CareerConnect Job Portal Management System", "Verified from implemented project"],
    ["Department", "Pending team information", "To be provided"],
    ["Team ID", "Pending team information", "To be provided"],
    ["Academic year", "Pending team information", "To be provided"],
    ["Student 1 - Lead Architect", "Pending name and register number", "To be provided"],
    ["Student 2 - Frontend Specialist", "Pending name and register number", "To be provided"],
    ["Student 3 - Backend Specialist", "Pending name and register number", "To be provided"],
    ["Student 4 - Database and QA Engineer", "Pending name and register number", "To be provided"],
    ["Runbook preparation date", new Date("2026-09-18"), "Prepared from current codebase"],
  ]);
  s.getRange("B8:B14").format.fill = paleYellow;
  s.getRange("B15").format.numberFormat = "dd-mmm-yyyy";
  section(s, 18, "Submission checklist");
  table(s, "A19", [
    ["Item", "Evidence in this runbook", "Action before submission"],
    ["Define", "Problem, personas, MoSCoW priorities and user stories", "Review with team"],
    ["Design", "Architecture, data dictionary and API contracts", "Open Draw.io diagrams and add screenshots if required"],
    ["Develop and integrate", "Frontend, backend, database and Fetch API wiring", "Demonstrate the live portal"],
    ["Deploy", "Local startup, bug log and viva script", "Add active GitHub and cloud URLs when published"],
  ]);
  s.freezePanes.freezeRows(6);
}

// 2. Problem definition
{
  const s = addSheet("2. Phase 1 - Problem", "Phase 1 - Define: Problem and scope", "Content reflects the implemented CareerConnect portal and the approved college problem statement.");
  section(s, 5, "Problem statement");
  s.mergeCells("A6:H8");
  s.getRange("A6").values = [["Job seekers face generic boards with outdated or irrelevant listings. Recruiters spend time comparing resumes against job skill and experience requirements. CareerConnect provides structured candidate profiles, transparent compatibility scores, job posting controls, and a simple application pipeline."]];
  s.getRange("A6:H8").format.wrapText = true;
  s.getRange("A6:H8").format.verticalAlignment = "top";
  s.getRange("A6:H8").format.borders = { preset: "all", style: "thin", color: border };
  section(s, 10, "Target personas");
  table(s, "A11", [
    ["Persona", "Need", "Implemented actions"],
    ["Job seeker", "Find relevant jobs and track progress", "Register, maintain skills and profile, apply, view match score, applications and notifications"],
    ["Recruiter / administrator", "Find suitable candidates quickly", "Create job posts, set skills and experience requirement, filter by match score, change pipeline stage and schedule interviews"],
  ]);
  section(s, 15, "MoSCoW priorities");
  table(s, "A16", [
    ["Priority", "Requirement", "Implementation status"],
    ["Must have", "Secure registration, login, structured profile and job application", "Implemented"],
    ["Must have", "Compatibility score and application pipeline", "Implemented"],
    ["Should have", "Admin minimum-match filter and interview scheduling", "Implemented"],
    ["Could have", "Email delivery in addition to portal notifications", "Not implemented; portal notifications are implemented"],
    ["Won't have in current local release", "External AI resume parsing and production cloud email service", "Outside current scope"],
  ]);
  section(s, 23, "Non-functional requirements");
  table(s, "A24", [
    ["NFR", "Requirement", "Evidence"],
    ["Security", "Passwords must not be stored as plain text", "Spring Security with BCrypt hashing"],
    ["Usability", "Pages must be responsive and readable", "HTML5 templates with CSS Grid and Flexbox"],
    ["Performance", "Job listing filter should work quickly for local demonstration data", "Repository query filters active jobs"],
    ["Reliability", "Duplicate applications must be prevented", "Unique constraint on job and applicant"],
  ]);
  s.freezePanes.freezeRows(5);
}

// 3. User stories
{
  const s = addSheet("3. Phase 1 - User Stories", "Phase 1 - User stories and acceptance criteria", "Six stories with Given / When / Then checks derived from implemented behaviour.");
  section(s, 5, "User stories");
  table(s, "A6", [
    ["ID", "User story", "Acceptance criterion 1", "Acceptance criterion 2"],
    ["US-01", "As a job seeker, I want to register and log in so that I can use a personal account.", "Given a new visitor, when valid registration details are submitted, then a seeker account is created.", "Given a registered user, when correct credentials are entered, then the user can access seeker pages."],
    ["US-02", "As a job seeker, I want to maintain a structured profile so that jobs can be matched to me.", "Given a signed-in seeker, when phone, qualification, skills, experience and portfolio are saved, then the profile is stored.", "Given an incomplete profile, when the seeker attempts to apply, then the portal redirects them to complete the profile."],
    ["US-03", "As a job seeker, I want to see a compatibility score before applying so that I can judge relevance.", "Given a job with required skills, when the apply page opens, then a score from 0 to 100 is displayed.", "Given matching skills and sufficient experience, when the score is calculated, then skills contribute 80 percent and experience contributes 20 percent."],
    ["US-04", "As a job seeker, I want to apply once and track my application so that I know its status.", "Given an eligible job and complete profile, when an application is submitted, then it is stored with status APPLIED.", "Given a duplicate application for the same job, when it is submitted again, then the portal prevents another application."],
    ["US-05", "As an administrator, I want to create job posts so that candidates can discover opportunities.", "Given an administrator, when all required job fields are submitted, then the job post is saved.", "Given an active job post, when a visitor searches the listing, then matching title, company, category or location results appear."],
    ["US-06", "As an administrator, I want to filter and update candidates so that I can manage recruitment.", "Given a minimum match percentage, when the filter is applied, then candidates below the threshold are hidden.", "Given an application stage change, when it is saved, then the status changes and an in-portal notification is created."],
  ]);
  s.getRange("A7:D12").format.rowHeight = 68;
  s.freezePanes.freezeRows(6);
}

// 4. Architecture
{
  const s = addSheet("4. Phase 2 - Draw.io Arch", "Phase 2 - Three-tier system architecture", "Use the project Draw.io architecture diagram as the visual evidence for this sheet.");
  section(s, 5, "Three-tier component breakdown");
  table(s, "A6", [
    ["Tier", "Components", "Responsibility", "Port / protocol"],
    ["Presentation", "Thymeleaf HTML pages, CSS Grid/Flexbox, JavaScript Fetch API", "Responsive user and administrator pages. Fetch API updates live job information.", "HTTP localhost:8080"],
    ["Application", "Spring Boot MVC controllers, Spring Security, MatchingService, NotificationService", "Authentication, job workflow, scoring, candidate stages, API responses and CORS policy.", "HTTP localhost:8080"],
    ["Persistence", "Spring Data JPA repositories, H2 file database for local demo, MySQL profile for deployment", "Stores users, seeker profiles, jobs, applications and notifications.", "H2 embedded locally; MySQL:3306 when profile is enabled"],
  ]);
  section(s, 12, "Actual port map");
  table(s, "A13", [
    ["Port", "Use in this project", "Status"],
    [":8080", "Spring Boot web application and REST API", "Used"],
    [":3306", "MySQL 8 database when the mysql Spring profile is enabled", "Deployment profile ready; not required for H2 local demo"],
    [":5500", "No separate frontend server. Thymeleaf is rendered by Spring Boot.", "Not used by this architecture"],
  ]);
  section(s, 19, "Data flow");
  table(s, "A20", [
    ["Step", "Flow"],
    ["1", "Browser requests CareerConnect pages from Spring Boot on localhost:8080."],
    ["2", "The home page JavaScript calls GET /api/v1/jobs using Fetch API."],
    ["3", "Spring MVC controllers call services and JPA repositories."],
    ["4", "JPA reads or writes the relational data store. H2 is used locally and MySQL is supported through the mysql profile."],
    ["5", "The response is rendered as Thymeleaf HTML or JSON and returned to the browser."],
  ]);
  s.freezePanes.freezeRows(6);
}

// 5. Schema
{
  const s = addSheet("5. Phase 2 - Database Schema", "Phase 2 - Relational database data dictionary", "3NF design: user identity, seeker profile, job, application and notification are separate entities.");
  section(s, 5, "Data dictionary");
  table(s, "A6", [
    ["Table", "Column", "Type", "Key / constraint", "Description"],
    ["portal_users", "id", "BIGINT", "PK, generated", "User identifier"],
    ["portal_users", "username", "VARCHAR", "NOT NULL, UNIQUE", "Login name"],
    ["portal_users", "password", "VARCHAR", "NOT NULL", "BCrypt password hash"],
    ["portal_users", "full_name", "VARCHAR", "NOT NULL", "Display name"],
    ["portal_users", "email", "VARCHAR", "NOT NULL, UNIQUE", "Email address"],
    ["portal_users", "role", "VARCHAR", "NOT NULL", "SEEKER or ADMIN role"],
    ["job_seeker_profile", "id", "BIGINT", "PK, generated", "Profile identifier"],
    ["job_seeker_profile", "user_id", "BIGINT", "FK to portal_users", "One-to-one profile owner"],
    ["job_seeker_profile", "phone, qualification, skills, experience, experience_years, portfolio_url", "VARCHAR / INTEGER", "Profile fields", "Structured candidate information for matching"],
    ["job", "id", "BIGINT", "PK, generated", "Job identifier"],
    ["job", "title, company_name, location, category", "VARCHAR", "NOT NULL", "Job identity and categorisation"],
    ["job", "description", "VARCHAR(3000)", "NOT NULL", "Job description"],
    ["job", "salary", "DECIMAL", "NOT NULL", "Monthly salary"],
    ["job", "deadline, posted_date", "DATE / TIMESTAMP", "NOT NULL", "Application deadline and post time"],
    ["job", "required_skills, minimum_experience_years", "VARCHAR(1000) / INTEGER", "Optional", "Inputs to compatibility scoring"],
    ["job_application", "id", "BIGINT", "PK, generated", "Application identifier"],
    ["job_application", "job_id", "BIGINT", "FK to job", "Applied job"],
    ["job_application", "applicant_id", "BIGINT", "FK to portal_users", "Applicant account"],
    ["job_application", "cover_letter, status, applied_on, match_score, interview_scheduled_at", "VARCHAR / TIMESTAMP / INTEGER", "UNIQUE(job_id, applicant_id)", "Recruitment pipeline and computed score"],
    ["portal_notification", "id", "BIGINT", "PK, generated", "Notification identifier"],
    ["portal_notification", "recipient_id", "BIGINT", "FK to portal_users", "Notification recipient"],
    ["portal_notification", "message, created_on, read", "VARCHAR(1000) / TIMESTAMP / BOOLEAN", "NOT NULL message", "In-portal status notification"],
  ]);
  s.getRange("A7:E29").format.rowHeight = 34;
  s.freezePanes.freezeRows(6);
}

// 6. API specs
{
  const s = addSheet("6. Phase 2 - REST API Specs", "Phase 2 - REST API and web workflow specifications", "The JSON endpoints listed below are implemented. Server-rendered form endpoints are documented separately for accuracy.");
  section(s, 5, "Implemented REST endpoints");
  table(s, "A6", [
    ["Method", "URL", "Purpose", "Request", "Success", "Error"],
    ["GET", "/api/v1/jobs?query=&location=", "Return active jobs. Query searches title, company or category. Location filters by location.", "No JSON body. Optional query and location parameters.", "200 JSON array of job records", "200 empty array when no jobs match"],
    ["GET", "/api/v1/jobs/{id}", "Return one job by identifier.", "No JSON body. Path id required.", "200 JSON job object", "404 if job id is absent"],
  ]);
  section(s, 11, "Implemented server-rendered workflows");
  table(s, "A12", [
    ["Method", "Route", "Purpose", "Result"],
    ["POST", "/register", "Create a job seeker account", "Redirects to login on success"],
    ["POST", "/profile", "Save structured seeker profile", "Redirects to profile with saved status"],
    ["POST", "/jobs/{id}/apply", "Create application and store calculated match score", "Redirects to applications"],
    ["POST", "/admin/jobs", "Save a new job post", "Redirects to administrator job list"],
    ["GET", "/admin/applications?minMatch=", "Filter applicants by minimum compatibility score", "Renders filtered admin table"],
    ["POST", "/admin/applications/{id}/status", "Update recruitment stage and optional interview time", "Stores status and creates portal notification"],
  ]);
  section(s, 21, "CORS policy");
  table(s, "A22", [
    ["Area", "Implemented policy"],
    ["Allowed origin", "http://localhost:8080 only"],
    ["API route scope", "/api/**"],
    ["Allowed method", "GET"],
  ]);
  s.freezePanes.freezeRows(6);
}

// 7 CARE prompts
{
  const s = addSheet("7. Phase 3 - AI Tools Log", "Phase 3 - CARE prompt audit log", "CARE means Context, Action, Result and Example/Clarification. These entries document how AI assistance was constrained to the project scope.");
  section(s, 5, "Prompt audit entries");
  table(s, "A6", [
    ["SDLC phase", "Context", "Action", "Result", "Example / clarification"],
    ["Define", "Build a Java job portal for seekers and recruiters facing irrelevant listings and manual screening.", "Create problem statement, personas and testable acceptance criteria.", "Documented scope for structured profiles, match score, pipeline and notifications.", "Use Given/When/Then and do not promise external email delivery without an email service."],
    ["Design", "Use Spring Boot 3, JPA, responsive HTML/CSS and a relational database.", "Model a 3-tier design and 3NF entities.", "Separated portal users, seeker profiles, jobs, applications and notifications.", "Represent job-application as the relationship between job and applicant with a unique constraint."],
    ["Develop", "Applicants need an explainable compatibility measure.", "Implement a score using required skill tags and experience years.", "MatchingService returns a 0-100 score using 80 percent skills and 20 percent experience.", "Required: Java, Spring Boot, MySQL. Candidate: Java and Spring Boot with enough experience."],
    ["Deploy and QA", "The local demonstration must be easy to start and must avoid common HTTP issues.", "Create startup guidance, CORS restriction and realistic bug evidence.", "The portal runs on localhost:8080 through a one-click batch file and permits same-origin Fetch API access.", "Keep the terminal window open while the application is running."],
  ]);
  s.getRange("A7:E10").format.rowHeight = 72;
  s.freezePanes.freezeRows(6);
}

// 8 Frontend
{
  const s = addSheet("8. Phase 3 - Frontend UI", "Phase 3 - Frontend user interface", "Responsive HTML5/Thymeleaf views with CSS Grid, Flexbox and a small Fetch API enhancement.");
  section(s, 5, "Implemented UI components");
  table(s, "A6", [
    ["Screen", "Main components", "User outcome"],
    ["Home", "Navigation, hero section, latest job cards, job API status", "Browse available opportunities"],
    ["Register and login", "Account form, authentication feedback", "Create account and sign in securely"],
    ["Jobs and job detail", "Search/filter controls, job cards and detail view", "Find eligible active jobs"],
    ["Profile", "Phone, qualification, skills, experience years, portfolio link", "Maintain matchable candidate data"],
    ["Apply and applications", "Match score, cover letter and tracked application cards", "Apply once and view pipeline progress"],
    ["Notifications", "Chronological in-portal notification list", "Read stage-change updates"],
    ["Admin jobs", "Job list, create form, sample-fill support and live preview", "Publish clear job posts"],
    ["Admin applications", "Minimum score filter, stage selector and interview date/time", "Manage candidates in one place"],
  ]);
  section(s, 17, "Responsive design approach");
  table(s, "A18", [
    ["Technology", "Use in implementation"],
    ["HTML5 and Thymeleaf", "Semantic forms, server-side values and conditional content"],
    ["CSS Grid", "Job-card and administrator form layouts"],
    ["Flexbox", "Navigation, actions, badges and aligned form controls"],
    ["JavaScript Fetch API", "Home page reads live job data from the JSON endpoint"],
  ]);
  s.freezePanes.freezeRows(6);
}

// 9 Backend
{
  const s = addSheet("9. Phase 3 - Backend & DB", "Phase 3 - Java backend and database persistence", "Spring Boot 3 with Spring MVC, Spring Security and Spring Data JPA.");
  section(s, 5, "Backend implementation");
  table(s, "A6", [
    ["Layer", "Classes / components", "Responsibility"],
    ["Controllers", "AuthController, HomeController, JobController, SeekerController, AdminController, JobApiController", "Render views, process forms and expose job JSON"],
    ["Services", "MatchingService, NotificationService, PortalUserDetailsService", "Compute compatibility, create notifications and integrate user authentication"],
    ["Repositories", "JobRepository, JobApplicationRepository, JobSeekerProfileRepository, PortalUserRepository, PortalNotificationRepository", "JPA persistence and query access"],
    ["Entities", "PortalUser, JobSeekerProfile, Job, JobApplication, PortalNotification", "Map 3NF relational data to Java objects"],
    ["Configuration", "SecurityConfig, WebConfig, DataInitializer", "Security rules, CORS policy and initial demonstration data"],
  ]);
  section(s, 14, "Database configuration");
  table(s, "A15", [
    ["Environment", "Database", "Purpose"],
    ["Default local run", "H2 file database", "Starts the demo without separately installing a database server"],
    ["Deployment profile", "MySQL 8 through mysql Spring profile", "Supports a production-style relational database on port 3306"],
    ["Persistence method", "JPA / Hibernate", "Creates and updates tables based on entity mapping"],
  ]);
  section(s, 21, "Implementation note");
  s.mergeCells("A22:H23");
  s.getRange("A22").values = [["The project uses Spring Data JPA repositories instead of a separate DAO or DBConnection class. The datasource and connection lifecycle are managed by Spring Boot configuration and JPA, which is the implemented architecture."]];
  s.getRange("A22:H23").format.wrapText = true;
  s.getRange("A22:H23").format.borders = { preset: "all", style: "thin", color: border };
  s.freezePanes.freezeRows(6);
}

// 10 integration
{
  const s = addSheet("10. Phase 3 - Integration", "Phase 3 - Full-stack integration", "How the HTML/CSS/JavaScript interface connects to Spring MVC, JPA and the database.");
  section(s, 5, "Integration wiring");
  table(s, "A6", [
    ["Front-end event", "Backend interaction", "Database result", "Visible UI result"],
    ["Home page loads", "JavaScript Fetch API calls GET /api/v1/jobs", "Repository returns active matching jobs", "Job count/status can update without a full page refresh"],
    ["Seeker saves profile", "POST /profile handled by SeekerController", "JobSeekerProfile saved through JPA", "Profile page shows saved status"],
    ["Seeker applies", "POST /jobs/{id}/apply calls MatchingService", "JobApplication stores score and APPLIED stage", "Applications page lists the new application"],
    ["Admin posts job", "POST /admin/jobs binds form to Job", "Job entity saved through repository", "Admin job list displays the post"],
    ["Admin changes status", "POST /admin/applications/{id}/status", "Application updated; notification saved", "Candidate sees a new portal notification"],
  ]);
  section(s, 14, "HTTP and CORS handling");
  table(s, "A15", [
    ["Concern", "Implemented handling"],
    ["CORS", "WebConfig restricts /api/** access to http://localhost:8080 and GET requests"],
    ["Authentication", "Spring Security controls access to seeker and admin workflow pages"],
    ["Duplicate applications", "Controller checks existing job/applicant pair and database has a unique constraint"],
    ["Incomplete profiles", "Apply action redirects a user to the profile page until required fields are completed"],
  ]);
  s.freezePanes.freezeRows(6);
}

// 11 bug log
{
  const s = addSheet("11. Phase 4 - Bug Log", "Phase 4 - Bug log and resolution evidence", "Realistic issues encountered during local development and their resolution.");
  section(s, 5, "Resolved development issues");
  table(s, "A6", [
    ["ID", "Issue", "Root cause", "Resolution", "Verification"],
    ["BUG-01", "Browser showed localhost connection refused.", "Spring Boot application was not running, or the terminal window had been closed.", "Created one-click startup guidance and run the packaged JAR on port 8080. Keep the terminal window open.", "Home page and GET /api/v1/jobs return successfully while the process is running."],
    ["BUG-02", "Application could fail during H2 schema update after new numeric fields were added.", "Existing local database rows had no value for newly introduced primitive fields.", "Changed new numeric fields to nullable Integer values and safely return zero when a legacy row has no value.", "Existing H2 data starts without migration failure and new values save correctly."],
    ["BUG-03", "Admin create-job page returned a server error when rendering a bound category selector.", "A Thymeleaf-bound option lacked an explicit value attribute.", "Added explicit option values in the template and rebuilt the application.", "GET /admin/jobs/new renders successfully after restart."],
  ]);
  s.getRange("A7:E9").format.rowHeight = 78;
  section(s, 13, "Known deployment work remaining");
  table(s, "A14", [
    ["Item", "Current status", "Next action"],
    ["Email notifications", "Only in-portal notifications are implemented", "Add SMTP provider configuration and test delivery"],
    ["MySQL hosting", "MySQL profile is prepared; local demo uses H2", "Set MYSQL_USERNAME and MYSQL_PASSWORD then start with mysql profile"],
    ["GitHub and cloud URL", "Not supplied by team", "Publish project and add the active links before final submission"],
  ]);
  s.freezePanes.freezeRows(6);
}

// 12 deployment and viva pitch
{
  const s = addSheet("12. Phase 4 - Cloud & Pitch", "Phase 4 - Deployment plan and technical viva pitch", "Local deployment is ready. Team-specific identity and publication links remain pending.");
  section(s, 5, "One-click local deployment");
  table(s, "A6", [
    ["Step", "Action", "Expected result"],
    ["1", "Build the project package when code changes are complete.", "Spring Boot executable JAR is available"],
    ["2", "Double-click START-WEBSITE.bat and keep the terminal window open.", "Application starts on localhost:8080"],
    ["3", "Open http://localhost:8080 in a browser.", "CareerConnect home page is visible"],
    ["4", "For MySQL, configure credentials and activate the mysql Spring profile.", "JPA connects to MySQL 8 on port 3306"],
  ]);
  section(s, 13, "Publication status");
  table(s, "A14", [
    ["Deliverable", "Status", "Required team action"],
    ["GitHub repository", "Pending", "Create repository under the team account and enter the real URL"],
    ["Cloud deployment", "Pending", "Deploy after choosing an approved host and enter the live URL"],
    ["Draw.io evidence", "Available in project docs", "Export diagrams or attach screenshots if the evaluator requests them"],
  ]);
  section(s, 20, "Three-minute technical viva pitch");
  table(s, "A21", [
    ["Speaker", "Time", "Script"],
    ["Student 1 - Lead Architect (name pending)", "0:00-0:45", "Our project is CareerConnect, a job portal management system. It addresses generic job boards that show irrelevant jobs and require recruiters to manually screen candidates. We defined two main users: job seekers and recruiters. Our goal is to make candidate data structured and selection more transparent."],
    ["Student 2 - Frontend Specialist (name pending)", "0:45-1:30", "The user interface uses HTML5, Thymeleaf templates, CSS Grid and Flexbox. A seeker can register, build a profile with skills, education, experience and portfolio link, search jobs and apply. The interface is responsive, and JavaScript Fetch API reads live job data from the backend."],
    ["Student 3 - Backend Specialist (name pending)", "1:30-2:15", "The backend is Java 21 with Spring Boot 3, Spring Security and Spring Data JPA. The matching service calculates a transparent score out of 100. Matching skills provide 80 percent and sufficient experience provides 20 percent. The score is stored with every application."],
    ["Student 4 - Database and QA Engineer (name pending)", "2:15-3:00", "The database design is in third normal form. We separate users, profiles, jobs, applications and notifications. Administrators filter candidates by score, update stages and schedule interviews. Every stage update creates a portal notification. The local demo uses H2, while the mysql profile supports MySQL 8 deployment."],
  ]);
  s.getRange("A22:C25").format.rowHeight = 92;
  s.freezePanes.freezeRows(6);
}

for (let i = 0; i < 12; i++) {
  const s = wb.worksheets.getItemAt(i);
  const used = s.getUsedRange();
  used.format.verticalAlignment = "top";
  s.tabColor = i === 0 ? navy : blue;
}

wb.recalculate();
const output = await SpreadsheetFile.exportXlsx(wb);
await fs.mkdir("C:/Users/vkbhu/Documents/JobPortalJava/docs", { recursive: true });
await output.save(outputPath);

const summary = await wb.inspect({ kind: "sheet", include: "id,name", maxChars: 5000 });
console.log(summary.ndjson);
