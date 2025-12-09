// Config
const JOBS_JSON = 'data/jobs.json';

// Escape HTML to prevent injection
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Load jobs from JSON
async function loadJobs() {
  try {
    const res = await fetch(JOBS_JSON);
    if (!res.ok) throw new Error("Failed to load jobs.json");
    const jobs = await res.json();
    return jobs;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Display jobs on the page
function displayJobs(jobs) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    results.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach(job => {
    results.innerHTML += `
      <div class="job">
        <h2>${escapeHtml(job.title)}</h2>
        <p><strong>Company:</strong> ${escapeHtml(job.company)}</p>
        <p><strong>Location:</strong> ${escapeHtml(job.location)}</p>
        <p><strong>Type:</strong> ${escapeHtml(job.type)}</p>
        <p>${job.description.replace(/\\n/g, "<br>")}</p>
        <p><a href="${job.apply_url}" class="apply-button">Apply Now</a></p>
        <p><em>Posted: ${escapeHtml(job.posted)}</em></p>
      </div>
    `;
  });
}

// Initialize search functionality
async function initSearch() {
  const allJobs = await loadJobs();
  displayJobs(allJobs);

  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allJobs.filter(job =>
      (job.title || "").toLowerCase().includes(term) ||
      (job.company || "").toLowerCase().includes(term) ||
      (job.location || "").toLowerCase().includes(term) ||
      (job.type || "").toLowerCase().includes(term) ||
      (job.description || "").toLowerCase().includes(term)
    );
    displayJobs(filtered);
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", initSearch);
