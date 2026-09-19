# CareerConnect REST API Contracts

Base URL for local testing: `http://localhost:8080`

## Get active jobs

`GET /api/v1/jobs`

Optional query parameters:

| Name | Example | Meaning |
|---|---|---|
| `query` | `Java` | Searches job title, company, or category |
| `location` | `Chennai` | Filters by location |

Example request:

```http
GET /api/v1/jobs?query=Java&location=Chennai
```

Example response:

```json
[
  {
    "id": 1,
    "title": "Java Developer",
    "companyName": "CareerConnect Pvt. Ltd.",
    "location": "Chennai",
    "category": "Information Technology",
    "requiredSkills": "Java, Spring Boot, MySQL",
    "minimumExperienceYears": 1
  }
]
```

## Get one job

`GET /api/v1/jobs/{id}`

Success returns HTTP `200` with one job JSON object. A missing id returns HTTP `404`.

## CORS

Only `http://localhost:8080` is allowed to call `/api/**` through browser JavaScript during the local demonstration. This prevents unrestricted browser-origin access while allowing the CareerConnect frontend to use Fetch API.
