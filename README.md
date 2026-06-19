# 🌱 EcoTrack — Sustainable Lifestyle App

**EcoTrack** is a sustainable lifestyle web application designed to help users track eco-friendly challenges, measure their environmental impact, and join a global community of changemakers working toward a greener future.

---

## 🖥️ Live Project Links & Repositories

*   **Frontend Live Site:** [https://ecotrackmuhi.netlify.app](https://ecotrackmuhi.netlify.app)
*   **Backend Live API Deployment:** [https://ass-10-sigma.vercel.app/](https://ass-10-sigma.vercel.app/)
*   **Backend GitHub Repository:** [https://github.com/Muhiuddin2005/ecoTrackBackend](https://github.com/Muhiuddin2005/ecoTrackBackend)

---

## ✨ Features

*   **Track Green Challenges**: Join, complete, and monitor progress in eco-friendly challenges (e.g. tree planting, plastic reduction, or water conservation).
*   **Eco Impact Dashboard**: Beautifully visualize community impact stats (CO₂ reduction, water saved, total participants) using real-time data charts.
*   **ImgBB Image Uploads**: Upload profile and challenge pictures dynamically using modern file upload inputs and ImgBB's API.
*   **Smooth Custom Spinner & Transitions**: Interactive custom-made CSS spinners and page-load transitions aligned with dark/light themes.
*   **Firebase Authentication**: Secure client-side registration and log in with protected routing, including seamless Google OAuth integration.
*   **Flexible Challenges Page**: Filter challenges dynamically based on category and participant parameters.

---

## 🛠️ Technology Stack

### Frontend (Client-side)
*   **React (v19)** — Modern UI design and Component-driven architecture
*   **Vite (v7)** — Ultra-fast frontend build tool and dev server
*   **React Router (v7)** — Dynamic client-side routing & page navigation
*   **Tailwind CSS (v4)** — Modern utility-first styling layer
*   **DaisyUI (v5)** — Premium tailwind-compiled UI components and themes
*   **Firebase SDK** — Seamless user authentication and OAuth provider
*   **Recharts** — Dynamic, responsive charts for visualizing green statistics
*   **Swiper.js** — Premium slider carousels for active challenges
*   **SweetAlert2 & React Toastify** — Elegant feedback alerts & notifications

### Backend (Server-side)
*   **Node.js** — Asynchronous event-driven JavaScript runtime
*   **Express.js** — Minimalist web application router framework
*   **MongoDB & MongoDB Atlas** — Cloud-hosted NoSQL database for challenge, event, and participant tracking
*   **Dotenv** — Environment variables manager
*   **CORS** — Cross-Origin Resource Sharing handling
*   **Vercel Serverless** — Host platform and serverless functions engine

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "daisyui": "^5.4.7",
    "firebase": "^12.5.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-icons": "^5.5.0",
    "react-loading-skeleton": "^3.5.0",
    "react-router": "^7.9.5",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5",
    "recharts": "^3.4.1",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  }
}
```

---

## 🚀 Local Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Muhiuddin2005/ecoTrackFrontend.git
    cd ecoTrackFrontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    Create a `.env` file in the root folder with the following variables:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_IMGBB_API_KEY=your_imgbb_key
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
