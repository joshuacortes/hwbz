// Generates JSON for a job listing
function generateJSON() {
  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const type = document.getElementById("type").value.trim();
  const description = document.getElementById("description").value.trim();

  // Validate all fields are filled
  if (!title || !company || !location || !type || !description) {
    alert("Please complete all fields.");
    return;
  }

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Construct the job object
  const jobData = {
    title: title,
    company: company,
    location: location,
    type: type,
    description: description.replace(/\r?\n/g, "\\n"), // Preserve multiple lines
    posted: today,
    apply_url: "/apply" // Auto-added Apply Now link
  };

  // Output JSON to the page
  document.getElementById("output-box").textContent =
    JSON.stringify(jobData, null, 2);
}
