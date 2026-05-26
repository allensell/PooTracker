from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'poo_data.json')

BLOOD_OPTIONS = ["No Blood", "Little Blood", "Blood", "Flood of Blood"]
POO_TYPES = [
    "Type 1 - Separate Hard Lumps",
    "Type 2 - Lumpy, Sausage-Shaped",
    "Type 3 - Sausage Shape with Cracks (N)",
    "Type 4 - Smooth, Soft Sausage (N)",
    "Type 5 - Soft Blobs",
    "Type 6 - Mild Diarrhea",
    "Type 7 - Diarrhea",
]


def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_data(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.route("/")
def index():
    return render_template("index.html", blood_options=BLOOD_OPTIONS, poo_types=POO_TYPES)


@app.route("/history")
def history():
    return render_template("history.html")


@app.route("/api/entry", methods=["POST"])
def add_entry():
    body = request.json
    date = body.get("date", "").strip()
    blood = body.get("blood", "").strip()
    poo_type = body.get("poo_type", "").strip()

    if not date or blood not in BLOOD_OPTIONS or poo_type not in POO_TYPES:
        return jsonify({"error": "Invalid input"}), 400

    data = load_data()
    entry = {
        "id": len(data) + 1,
        "date": date,
        "blood": blood,
        "poo_type": poo_type,
        "recorded_at": datetime.now().isoformat(),
    }
    data.append(entry)
    save_data(data)
    return jsonify({"success": True, "entry": entry})


@app.route("/api/entry/<int:entry_id>", methods=["DELETE"])
def delete_entry(entry_id):
    data = load_data()
    data = [e for e in data if e.get("id") != entry_id]
    save_data(data)
    return jsonify({"success": True})


@app.route("/api/data", methods=["GET"])
def get_data():
    data = load_data()
    data.sort(key=lambda e: e.get("date", ""), reverse=True)
    return jsonify(data)


@app.route("/api/stats", methods=["GET"])
def get_stats():
    data = load_data()

    blood_counts = {opt: 0 for opt in BLOOD_OPTIONS}
    type_counts = {t: 0 for t in POO_TYPES}

    for entry in data:
        b = entry.get("blood", "")
        t = entry.get("poo_type", "")
        if b in blood_counts:
            blood_counts[b] += 1
        if t in type_counts:
            type_counts[t] += 1

    return jsonify({"blood": blood_counts, "types": type_counts, "total": len(data)})


if __name__ == "__main__":
    app.run(debug=True, port=5050)
