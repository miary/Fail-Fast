
# THE CRUCIBLE // Fail-Fast Assessment Engine

### *Accelerating Innovation through Radical Filtration*

**The Crucible** is a high-fidelity innovation pipeline that operationalizes the "Fail Fast, Fail Often" methodology. By utilizing a weighted scoring engine and a physics-based visualization funnel, it ensures that only technology solutions with the highest "Time-to-Value" (TTV) and lowest risk profiles reach the prototyping stage.

---

#### 1. Functional Features

* **Physics-Based Intake:** A sleek, dark-mode UI where tech submissions are "dropped" into a dynamic funnel.
* **Weighted Scoring Engine:** A strategy-pattern backend that evaluates submissions based on Risk, TTV, and Cost.
* **The Graveyard:** A Bento-style Admin Dashboard for post-mortem analysis of failed technologies.
* **Tuning Fork (Admin Controls):** Real-time adjustment of "Funnel Strictness" via weighted sliders.
* **Real-time Synchronization:** Socket.io updates the dashboard and funnel status across all active sessions.

---

#### 2. Technical Stack

* **Frontend:** React 18, Tailwind CSS (Glassmorphism), Framer Motion (Physics Engine).
* **Backend:** Node.js, Express.js.
* **Real-time:** Socket.io.
* **Database:** MongoDB (indexed for failure metadata).

---

#### 3. Project Structure

```text
the-crucible/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── IntakeForm.jsx      # Submission entry point
│   │   │   ├── CrucibleFunnel.jsx  # SVG Funnel + Framer Motion Particles
│   │   │   ├── AdminDashboard.jsx  # Bento Grid Analytics
│   │   │   └── TuningFork.jsx      # Strategy Weight Controls
│   │   └── App.js                  # Global State & Layout
├── server/                     # Node.js Backend
│   ├── logic/
│   │   └── scoringStrategy.js      # Weighted "Fail-Fast" Algorithm
│   ├── models/
│   │   └── Submission.js           # Mongoose Schema
│   ├── seed.js                     # Test Data Injection Script
│   └── server.js                   # Entry Point & Socket Configuration
├── .env                        # Environment Configuration
└── README.md                   # Technical Manifest

```

---

#### 4. Environment Configuration

Create a `.env` file in the `server/` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/the-crucible
NODE_ENV=development
# Weighted Defaults
DEFAULT_WEIGHT_RISK=1.5
DEFAULT_WEIGHT_TIME=2.0
DEFAULT_THRESHOLD=5.0

```

---

#### 5. Setup & Execution Instructions

###### Step 1: Install Dependencies

Run in both the root and the client directory:

```bash
npm install
cd client && npm install

```

###### Step 2: Seed the Database

To populate the **Graveyard** and **Prototype** views with the initial test dataset (including the Rust Micro-Engine and COBOL cases), run:

```bash
node server/seed.js

```

###### Step 3: Launch the Application

Run the following command from the root to start the backend and frontend concurrently:

```bash
npm run dev

```

---

#### 6. The "Fail-Fast" Test Dataset

The included `seed.js` script validates the following logical branches:

| Solution Name | TTV (Weeks) | Risk (1-10) | Status | Logic Applied |
| --- | --- | --- | --- | --- |
| **Rust Micro-Engine** | 3 | 4 | **PROTOTYPE** | High survival score |
| **Legacy COBOL Wrapper** | 24 | 9 | **FAILED_FAST** | Auto-killed (TTV > 12) |
| **Blockchain Auth** | 14 | 8 | **FAILED_FAST** | Rejected (High Risk/Cost) |

---

#### 7. Developer Notes

* **Funnel Performance:** Ensure the `onAnimationComplete` hook clears the particle array to maintain 60FPS.
* **Scalability:** The `Submission` schema includes indexes on `status` to ensure the Admin Dashboard remains performant as the "Graveyard" grows.

---

#### 8. Docker Deployment
To launch the entire "Crucible" ecosystem in a single command without installing local dependencies:

Build and Start:

```bash
docker-compose up --build
```
Seed the Containerized DB:


```bash
docker-compose exec backend node seed.js
```
Access:

Frontend: http://localhost:3000

API/Socket: http://localhost:5000

#### 9. Clean Slate Recovery
If the build fails due to metadata or cache corruption:

Prune: docker system prune -f

Explicit Build: docker compose build --pull --no-cache

Ignition: docker compose up