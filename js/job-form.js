function generateJSON() {
  const title = document.getElementById("title").value;
  const company = document.getElementById("company").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;

  const today = new Date().toISOString().split("T")[0];

  const jobData = {
    title: title,
    company: company,
    location: location,
    type: type,
    description: description,
    posted: today,
    apply_url: "/apply"   // 👈 Automatically added!
  };

  document.getElementById("output-box").textContent =
    JSON.stringify(jobData, null, 2);
}
