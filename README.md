# 💼 Portfolio – Amina Jebari

Personal portfolio website for **Amina Jebari** — final-year ICT engineering student at
SUP'COM, specialized in **NLP, LLMs and Computer Vision**, building end-to-end AI systems
(RAG, multi-agent LLM assistants, real-time vision) and seeking an **international PFE
internship**.

A single-page, responsive site with a dark/light theme, an animated navigation
indicator, scroll-reveal animations and a working contact form (EmailJS).

---

## 👩‍💻 About

- 🎓 Engineering degree in Telecommunications / ICT — SUP'COM (2024–2027)
- 🧠 Focus: retrieval-augmented generation, LLM agents, semantic search, computer vision
- ⚙️ End-to-end: data pipelines → embeddings & hybrid retrieval → LLM orchestration → Dockerized deployment
- 🌍 Languages: Arabic (C2), English (C1), French (C1), Turkish (C1), German (A2)

---

## 📄 Sections

`Home` · `About` · `Skills` · `Projects` · `Experience & Leadership` · `Education & Certifications` · `Contact`

### Featured projects

| Project | Description | Code |
|---|---|---|
| **MultiDocRAG** | Multimodal RAG over technical/normative PDFs (text, tables, figures); hybrid dense + BM25 retrieval; 100% local (Ollama, ChromaDB, BGE-M3); RAGAS evaluation | [repo](https://github.com/aminajebari/MultiDocRAG) |
| **Real-Time Face Detection** | Custom-trained YOLOv11 face detector — full ML lifecycle, real-time webcam inference | [repo](https://github.com/aminajebari/FaceDetection_with-YOLO) |
| **Beanchat** | Multi-agent LLM ordering assistant (guardrails, intent routing, RAG, recommendations) on RunPod serverless | [repo](https://github.com/Eyaiscoding/beanchat-project) |
| **Hematology Chat Bot** | Local RAG assistant over clinical notes and QA datasets | [repo](https://github.com/aminajebari/Hematology_chat_bot) |
| **TrustPay** | AI-assisted on-chain payroll on Solana (Next.js + Anchor/Rust + Groq chat) | [repo](https://github.com/aminajebari/TrustPay) |
| **NextSkill** | Next.js 16 / React 19 learning-platform UI | [repo](https://github.com/aminajebari/nextskil) |
| **WisdomShare** | Full-stack book-sharing platform (Spring Boot, Angular, Keycloak, PostgreSQL) | [repo](https://github.com/ines-jbr/WisdomShare) |

---

## 🛠️ Built with

- **HTML5** — semantic single-page structure
- **CSS3** — custom properties (theming), Flexbox & Grid, keyframe animations, responsive breakpoints
- **Vanilla JavaScript (ES6)** — theme manager, IntersectionObserver scroll animations, project filtering, smooth scroll, scroll-progress bar
- **EmailJS** — contact form delivery
- **Google Fonts** — Inter

No build step — it's static files.

---

## 📁 Structure

```
portfilio/
├── index.html          # All page content and sections
├── style.css           # Full styling + red/pink theme tokens (:root / [data-theme="light"])
├── script.js           # Theme, navigation, animations, project filter, contact form
├── cv_AminaJebari.pdf   # CV (linked from the "Download CV" buttons)
├── Amina.jpg            # Hero photo
└── *.png / *.jpg        # Project, icon and section images
```

---

## ▶️ Run locally

It's a static site — open `index.html` directly in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

---

## 🎨 Theming

Colors are centralized as CSS variables at the top of `style.css`:

- `:root` — dark theme (default), red + pink palette
- `[data-theme="light"]` — light theme overrides

Change the palette by editing those two blocks; the theme toggle is handled in `script.js`.

---

## 📌 Assets to keep updated

- `cv_AminaJebari.pdf` — the downloadable CV
- Project / event images referenced in `index.html` (e.g. `yolo-facedetection.png`, `cisco-italy.jpg`, `code-in-the-dark.jpg`, `space-mission-er.png`, `cs231n.jpg`, `toeic.jpg`, `cybercamp-android.jpg`) — missing files degrade gracefully

---

## 📫 Contact

- 📧 Email: amina.jebari@supcom.tn
- 💼 LinkedIn: https://www.linkedin.com/in/amina-jebari-7822b0347/
- 💻 GitHub: https://github.com/aminajebari

---

© 2026 Amina Jebari
