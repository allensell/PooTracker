# PooTracker 💩

A personal digestive health tracker using the Bristol Stool Scale. Log daily entries with blood level and stool type, and visualize trends over time with bar charts.

## Features

- Log entries with date, blood level, and Bristol Stool Scale type
- Data persisted to a local JSON file
- Bar charts showing totals for blood levels and poo types
- Full entry history with color-coded blood badges
- Delete individual entries

## Requirements

- Python 3.8+
- [uv](https://docs.astral.sh/uv/getting-started/installation/)

## Setup

```bash
git clone https://github.com/allensell/PooTracker.git
cd PooTracker

# Install dependencies and create virtual environment
uv sync

# Start the app
uv run python3 app.py
```

Then open [http://localhost:5050](http://localhost:5050) in your browser.

## Usage

### Logging an Entry

Fill in the form at the top of the page:

| Field | Options |
|-------|---------|
| **Date** | Any date (defaults to today) |
| **Blood Level** | No Blood / Little Blood / Blood / Flood of Blood |
| **Poo Type** | Types 1–7 (see Bristol Stool Scale below) |

Click **Save Entry** — the charts and history table update immediately.

### Bristol Stool Scale Reference

| Type | Description | Notes |
|------|-------------|-------|
| Type 1 | Separate Hard Lumps | Constipation |
| Type 2 | Lumpy, Sausage-Shaped | Constipation |
| Type 3 | Sausage Shape with Cracks | Normal |
| Type 4 | Smooth, Soft Sausage | Normal (ideal) |
| Type 5 | Soft Blobs | Lacking fiber |
| Type 6 | Mild Diarrhea | Inflammation |
| Type 7 | Diarrhea | Inflammation |

## Data Storage

Entries are saved to `data/poo_data.json` in the project directory. This file is excluded from git (`.gitignore`) to keep your health data private.

Example entry:

```json
{
  "id": 1,
  "date": "2026-05-26",
  "blood": "No Blood",
  "poo_type": "Type 4 - Smooth, Soft Sausage (N)",
  "recorded_at": "2026-05-26T13:58:36.607461"
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Main app page |
| `GET` | `/api/data` | All entries (newest first) |
| `GET` | `/api/stats` | Aggregated totals by blood level and type |
| `POST` | `/api/entry` | Add a new entry |
| `DELETE` | `/api/entry/<id>` | Delete an entry by ID |

## Project Structure

```
PooTracker/
├── app.py               # Flask backend
├── pyproject.toml
├── uv.lock
├── .gitignore
├── data/
│   └── poo_data.json    # Created automatically (gitignored)
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── app.js
```
