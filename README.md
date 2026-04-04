# Smart City AI Citizen Dashboard

A beautiful, high-performance, dark-mode glassmorphism dashboard providing live smart city data alongside a context-aware AI chatbot.

## Features
- **Live Data Visualizations:** Weather (Open-Meteo), Currency Rates (Exchange Rate API), Citizen Profiles (DummyJSON), and Random Facts.
- **Embedded AI Chatbot:** Uses Mistral-7B-Instruct via the Hugging Face API to answer questions derived strictly from live dashboard context.
- **Responsive UI:** CSS Grid layout with smooth micro-animations.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Environment Variables:**
   Create a `.env` file in the root directory and add your Hugging Face API token:
   ```env
   VITE_HF_TOKEN=your_token_here
   ```
3. **Run Development Server:**
   ```bash
   npm run dev
   ```

*Deployed via Vercel.*
