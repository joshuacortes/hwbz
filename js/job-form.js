function generateJSON() {
  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const type = document.getElementById("type").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !company || !location || !type || !description) {
    alert("Please complete all fields.");
    return;
  }

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const jobJSON = {
    title,
    company,
    location,
    type,
    description,
    posted: today
  };

  document.getElementById("output-box").textContent =
    JSON.stringify(jobJSON, null, 2);
}

