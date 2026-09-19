document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("apiJobCount");
  if (!status) return;

  try {
    const response = await fetch("/api/v1/jobs");
    if (!response.ok) throw new Error("Jobs API request failed");
    const jobs = await response.json();
    status.textContent = `${jobs.length} active jobs available`;
  } catch (error) {
    status.textContent = "Job availability is loading";
  }
});
