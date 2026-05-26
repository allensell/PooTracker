function bloodBadgeClass(blood) {
  if (blood === "No Blood")       return "badge badge-no-blood";
  if (blood === "Little Blood")   return "badge badge-little";
  if (blood === "Blood")          return "badge badge-blood";
  if (blood === "Flood of Blood") return "badge badge-flood";
  return "badge";
}

async function deleteEntry(id) {
  await fetch(`/api/entry/${id}`, { method: "DELETE" });
  await loadHistory();
}

async function loadHistory() {
  const res = await fetch("/api/data");
  const entries = await res.json();

  const countEl = document.getElementById("entry-count");
  countEl.textContent = entries.length ? `(${entries.length})` : "";

  const container = document.getElementById("entries-container");
  if (!entries.length) {
    container.innerHTML = '<p class="empty-state">No entries yet. <a href="/" class="link">Log one!</a></p>';
    return;
  }

  const rows = entries.map(e => `
    <tr>
      <td>${e.date}</td>
      <td><span class="${bloodBadgeClass(e.blood)}">${e.blood}</span></td>
      <td>${e.poo_type}</td>
      <td><button class="btn-delete" onclick="deleteEntry(${e.id})">Delete</button></td>
    </tr>
  `).join("");

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Blood</th>
          <th>Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

loadHistory();
