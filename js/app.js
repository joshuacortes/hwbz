async function loadJobs() {
  const res = await fetch("data/jobs.json");
  const jobs = await res.json();
  return jobs;
}

function displayJobs(jobs) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (jobs.length === 0) {
    results.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach(job => {
    results.innerHTML += `
      <div class="job">
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Type:</strong> ${job.type}</p>
        <p>${job.description}</p>
        <p><em>Posted: ${job.posted}</em></p>
      </div>
    `;
  });
}

async function initSearch() {
  const allJobs = await loadJobs();
  displayJobs(allJobs);

  document.getElementById("search").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allJobs.filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.type.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term)
    );
    displayJobs(filtered);
  });
}

initSearch();
