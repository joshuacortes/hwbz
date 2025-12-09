// Config
const JOBS_JSON = 'data/jobs.json';

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

// Render jobs WITH DROP-DOWN ACCORDIONS
function displayJobs(jobs) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    results.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach((job, index) => {
    const descriptionHtml = job.description
      .replace(/\\\\n/g, "<br>")
      .replace(/\\n/g, "<br>")
      .replace(/\n/g, "<br>");

    results.innerHTML += `
      <div class="job accordion">
        <button class="accordion-header" data-acc="${index}">
          ${escapeHtml(job.title)} — ${escapeHtml(job.company)}
        </button>

        <div class="accordion-body" id="acc-${index}">
          <p><strong>Location:</strong> ${escapeHtml(job.location)}</p>
          <p><strong>Type:</strong> ${escapeHtml(job.type)}</p>
          <p>${descriptionHtml}</p>
          <p><a href="${job.apply_url}" class="apply-button">Apply Now</a></p>
          <p><em>Posted: ${formatDate(job.posted)}</em></p>
        </div>
      </div>
    `;
  });

  // Accordion toggle behavior
  document.querySelectorAll(".accordion-header").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-acc");
      const panel = document.getElementById(`acc-${id}`);
      panel.classList.toggle("open");
    });
  });
}

// INIT
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

document.addEventListener("DOMContentLoaded", initSearch);
