// Config
const JOBS_JSON = 'data/jobs.json'; // Path to your jobs.json file

// Escape HTML safe function
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Format Posted Date → MM/DD/YYYY
function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

// Load jobs from JSON
async function loadJobs() {
  try {
    const res = await fetch(JOBS_JSON);
    if (!res.ok) throw new Error("Failed to load jobs.json");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Render jobs as accordion
function displayJobs(jobs) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    results.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach((job, index) => {
    const descriptionHtml = job.description
      .replace(/\\n/g, "<br>")
      .replace(/\n/g, "<br>");

    results.innerHTML += `
      <div class="accordion">
        <button class="accordion-header">
          <div><strong>${escapeHtml(job.title)}</strong> — ${escapeHtml(job.company)}</div>
          <div style="font-size:14px; color:#555;">${escapeHtml(job.location)}</div>
        </button>

        <div class="accordion-body">
          <p><strong>Type:</strong> ${escapeHtml(job.type)}</p>
          <p>${descriptionHtml}</p>
          <div class="job-actions">
  <a href="${job.apply_url}" class="apply-button">Apply Now</a>
  <a href="${job.view_all_url}" class="view-all-button">View All Jobs</a>
</div>
          <p><em>Posted: ${formatDate(job.posted)}</em></p>
        </div>
      </div>
    `;
  });

  // Accordion toggle behavior
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      body.classList.toggle("open");
    });
  });
}

// Initialize search functionality
async function initSearch() {
  const jobs = await loadJobs();
  displayJobs(jobs);

  const search = document.getElementById("search");
  if (!search) return;

  search.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = jobs.filter(job =>
      (job.title || "").toLowerCase().includes(term) ||
      (job.company || "").toLowerCase().includes(term) ||
      (job.location || "").toLowerCase().includes(term) ||
      (job.type || "").toLowerCase().includes(term) ||
      (job.description || "").toLowerCase().includes(term)
    );
    displayJobs(filtered);
  });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initSearch);
