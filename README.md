# PooTracker 💩

A personal digestive health tracker using the Bristol Stool Scale. Log daily entries with blood level and stool type, visualize totals with bar charts, and track consecutive-day streaks for blood-free and healthy-type days.

## Features

- Log entries with date, blood level, and Bristol Stool Scale type
- Data persisted to a local JSON file
- Bar charts showing totals for blood levels and poo types
- Streak tracking for consecutive blood-free days and healthy type (3 & 4) days
- Separate history page with full entry list and color-coded blood badges
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

Click **Save Entry** — the charts and streaks update immediately.

### Streaks

The **Totals** section displays two streak cards below the charts:

| Streak | What it tracks |
|--------|---------------|
| **Blood-Free Days** | Consecutive logged days where every entry has no blood. Shows current streak, all-time best, and how many days with blood are currently running as a contrast. |
| **Healthy Type Days (3 & 4)** | Consecutive logged days where at least one entry is Type 3 or Type 4. Shows current streak and all-time best. |

Streaks count consecutive **calendar days** with at least one entry — a day with no entries resets the count.

### History

Click the **History** tab in the navigation to view all entries. The entry count is shown in the page heading. Entries can be deleted individually from this page.

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
| `GET` | `/` | Main app page (form, charts, streaks) |
| `GET` | `/history` | History page |
| `GET` | `/api/data` | All entries (newest first) |
| `GET` | `/api/stats` | Aggregated totals by blood level and type |
| `GET` | `/api/trends` | Current and best streaks for blood-free and healthy-type days |
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
│   ├── index.html
│   └── history.html
└── static/
    ├── style.css
    ├── app.js
    ├── history.js
    └── favicon.svg
```
