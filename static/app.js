let bloodChart = null;
let typeChart = null;

const BLOOD_COLORS = [
  "rgba(76, 175, 106, 0.85)",
  "rgba(232, 132, 58, 0.85)",
  "rgba(232, 80, 80, 0.85)",
  "rgba(255, 60, 60, 0.95)",
];

const TYPE_COLORS = [
  "rgba(120, 80, 30, 0.85)",
  "rgba(150, 100, 40, 0.85)",
  "rgba(180, 130, 60, 0.85)",
  "rgba(200, 160, 80, 0.85)",
  "rgba(210, 180, 100, 0.85)",
  "rgba(180, 140, 90, 0.85)",
  "rgba(140, 90, 50, 0.85)",
];

async function fetchStats() {
  const res = await fetch("/api/stats");
  return res.json();
}

function renderBloodChart(stats) {
  const labels = Object.keys(stats.blood);
  const values = Object.values(stats.blood);
  const ctx = document.getElementById("bloodChart").getContext("2d");

  if (bloodChart) bloodChart.destroy();
  bloodChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Count",
        data: values,
        backgroundColor: BLOOD_COLORS,
        borderColor: BLOOD_COLORS.map(c => c.replace("0.85", "1")),
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#a08060", font: { size: 11 } }, grid: { color: "#3a2c18" } },
        y: { ticks: { color: "#a08060", stepSize: 1 }, grid: { color: "#3a2c18" }, beginAtZero: true },
      },
    },
  });
}

function renderTypeChart(stats) {
  const labels = Object.keys(stats.types).map(t => t.replace(/^(Type \d+) - /, "$1\n"));
  const values = Object.values(stats.types);
  const ctx = document.getElementById("typeChart").getContext("2d");

  if (typeChart) typeChart.destroy();
  typeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Count",
        data: values,
        backgroundColor: TYPE_COLORS,
        borderColor: TYPE_COLORS.map(c => c.replace("0.85", "1")),
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#a08060", font: { size: 10 } }, grid: { color: "#3a2c18" } },
        y: { ticks: { color: "#a08060", stepSize: 1 }, grid: { color: "#3a2c18" }, beginAtZero: true },
      },
    },
  });
}

async function refresh() {
  const stats = await fetchStats();
  renderBloodChart(stats);
  renderTypeChart(stats);
}

document.getElementById("entry-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("form-message");
  const date = document.getElementById("date").value;
  const blood = document.getElementById("blood").value;
  const poo_type = document.getElementById("poo_type").value;

  const res = await fetch("/api/entry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, blood, poo_type }),
  });

  if (res.ok) {
    msg.textContent = "Entry saved!";
    msg.className = "form-message success";
    e.target.reset();
    await refresh();
  } else {
    msg.textContent = "Error saving entry. Please fill all fields.";
    msg.className = "form-message error";
  }

  setTimeout(() => { msg.textContent = ""; }, 3000);
});

// Set today's date as default
document.getElementById("date").valueAsDate = new Date();

refresh();
