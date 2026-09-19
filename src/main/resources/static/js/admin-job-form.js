document.addEventListener("DOMContentLoaded", () => {
  const value = (id) => document.getElementById(id)?.value?.trim() || "";
  const output = (id, text) => { document.getElementById(id).textContent = text; };
  const updatePreview = () => {
    output("previewTitle", value("title") || "Your job title");
    output("previewCompany", value("companyName") || "Company name");
    output("previewLocation", value("location") || "Location");
    output("previewCategory", value("category") || "Category");
    output("previewSkills", value("requiredSkills") || "Add required skills");
    output("previewExperience", `${value("minimumExperienceYears") || 0} years minimum experience`);
    const salary = value("salary");
    output("previewSalary", salary ? `₹${Number(salary).toLocaleString("en-IN")} per month` : "Salary not set");
    output("descriptionCount", `${value("description").length} / 3000`);
  };
  document.querySelectorAll("#jobForm input, #jobForm textarea, #jobForm select").forEach((field) => field.addEventListener("input", updatePreview));
  document.getElementById("fillSample")?.addEventListener("click", () => {
    const sample = {title:"Java Backend Developer", companyName:"CareerConnect Pvt. Ltd.", location:"Chennai", category:"Information Technology", requiredSkills:"Java, Spring Boot, MySQL, REST API", minimumExperienceYears:"1", salary:"45000", description:"Build and maintain secure REST APIs for the CareerConnect job portal. Work with Java, Spring Boot, JPA, MySQL, and responsive web interfaces. Candidates should have a strong understanding of Java fundamentals and problem solving."};
    Object.entries(sample).forEach(([id, content]) => { const field = document.getElementById(id); if (field) field.value = content; });
    const date = new Date(); date.setDate(date.getDate() + 30);
    document.getElementById("deadline").value = date.toISOString().slice(0, 10);
    updatePreview();
  });
  updatePreview();
});
