# 🚀 AI WhatsApp Invoice Assistant

> AI-powered invoice processing platform with OCR, WhatsApp automation, analytics dashboard, PDF/image support, and modern SaaS UI.

---

# ✨ Features

## 🤖 AI Invoice Extraction

* OCR-based invoice scanning
* AI-powered structured data extraction
* Vendor detection
* Invoice number extraction
* Amount extraction

## 📂 Multi-Format Upload Support

* JPG
* PNG
* WEBP
* PDF invoices

## 📊 Analytics Dashboard

* Revenue analytics
* Processing statistics
* Success rate tracking
* Upload insights
* KPI cards

## 🧠 AI Workflow

* OCR text extraction
* Regex preprocessing
* TinyLlama AI fallback
* Structured JSON generation

## 💬 WhatsApp Integration

* One-click invoice sharing
* Auto-generated invoice summaries
* Dynamic WhatsApp messages

## 📁 Invoice Management

* Invoice history
* Search invoices
* Delete invoices
* Export CSV
* Per-invoice export

## 👀 Invoice Preview Modal

* Image preview
* PDF preview
* AI extracted data panel
* Download invoice
* WhatsApp share

## 🎨 Premium SaaS UI

* Dark enterprise dashboard
* Responsive design
* Glassmorphism UI
* Activity feed
* Smooth animations
* Modern card system

---

# 🖼️ Screenshots

## Dashboard

## Invoice Preview Modal

## Analytics Dashboard

> Replace placeholder screenshots with actual project screenshots later.

---

# ⚡ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* Lucide Icons
* React Hot Toast

## Backend

* FastAPI
* Python
* SQLAlchemy
* PostgreSQL
* Supabase

## AI / OCR

* Ollama
* TinyLlama
* Tesseract OCR
* Regex extraction

---

# 🧩 System Architecture

```text
Upload Invoice
      ↓
OCR Extraction
      ↓
Regex Processing
      ↓
TinyLlama AI Extraction
      ↓
Structured JSON Output
      ↓
Dashboard + Analytics + WhatsApp
```

---

# 📦 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/hetushah2708/ai-whatsapp-invoice-assistant.git
cd ai-whatsapp-invoice-assistant
```

---

# 🔧 Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

## Install Requirements

```bash
pip install -r requirements.txt
```

## Run FastAPI Server

```bash
uvicorn app.main:app --reload
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🧠 Run Ollama

Install Ollama:
https://ollama.com

Run TinyLlama:

```bash
ollama run tinyllama
```

---

# 📂 API Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/upload`          | Upload invoice        |
| GET    | `/invoices`        | Get all invoices      |
| DELETE | `/invoices/{id}`   | Delete invoice        |
| GET    | `/export/csv`      | Export all invoices   |
| GET    | `/export/csv/{id}` | Export single invoice |

---

# 🔥 Current Features Completed

* [x] OCR Invoice Extraction
* [x] AI Invoice Parsing
* [x] Analytics Dashboard
* [x] Invoice Preview Modal
* [x] PDF Upload Support
* [x] WhatsApp Integration
* [x] CSV Export
* [x] Modern SaaS UI
* [x] Activity Feed
* [x] Revenue Analytics

---

# 🚀 Upcoming Features

* [ ] Authentication System
* [ ] Role-Based Access
* [ ] Real WhatsApp API
* [ ] Excel Export
* [ ] Email Automation
* [ ] AI Insights Engine
* [ ] Cloud Deployment
* [ ] Stripe Billing
* [ ] Multi-user Workspaces

---

# 👨‍💻 Author

### Het Shah

* AI + Full Stack Developer
* React | FastAPI | AI Automation | OCR | Analytics

GitHub:
https://github.com/hetushah2708

---

# ⭐ Support

If you like this project:

* Star the repository
* Fork the repo
* Share feedback
* Connect on GitHub

---

# 📜 License

MIT License © 2026 Het Shah
