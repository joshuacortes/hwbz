function generateJSON() {
  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value.trim();

  if (!title || !company || !location || !type || !description) {
    alert("Please fill out all fields.");
    return;
  }

  // Format date as YYYY-MM-DD (machine friendly)
  const today = new Date();
  const posted =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  const job = {
    title: title,
    company: company,
    location: location,
    type: type,
    description: description.replace(/\n/g, "\\n"),
    posted: posted,
    apply_url: "/apply",
    view_all_url: "/jobs"
  };

  document.getElementById("output-box").textContent =
    JSON.stringify(job, null, 2);
}
