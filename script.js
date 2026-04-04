// --- CONFIGURATION ---
// ENVIRONMENT VARIABLES SETUP
// To keep your API keys secure and out of version control:
// 1. Create a file named `.env` in the root of your project directory.
// 2. Add your token inside the file like this:
//    VITE_HF_TOKEN=your_token_here
//
// For Deployment (Vercel/Netlify):
// Ensure you add `VITE_HF_TOKEN` in your hosting platform's Environment Variables settings.
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

// Global Data Variables
let weatherData = null;
let currencyData = null;
let citizenData = null;
let factData = null;

// --- API FETCH FUNCTIONS ---

// 1. Fetch Weather Data
async function fetchWeather() {
    const btn = document.querySelector('#weather-card .refresh-btn svg');
    const content = document.getElementById('weather-content');

    try {
        btn.classList.add('spinning');
        content.innerHTML = '<div class="loader">Loading weather...</div>';

        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&current_weather=true');
        if (!response.ok) throw new Error('Failed to fetch weather');

        const data = await response.json();
        weatherData = data.current_weather;

        content.innerHTML = `
            <div class="weather-data fade-in">
                <div class="data-large">${weatherData.temperature}°C</div>
                <div class="data-row">
                    <span>Wind Speed</span>
                    <span>${weatherData.windspeed} km/h</span>
                </div>
                <div class="data-row">
                    <span>Time</span>
                    <span>${new Date(weatherData.time).toLocaleTimeString()}</span>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        content.innerHTML = `<div class="error-msg">❌ Unable to load weather data.</div>`;
    } finally {
        btn.classList.remove('spinning');
    }
}

// 2. Fetch Currency Data
async function fetchCurrency() {
    const btn = document.querySelector('#currency-card .refresh-btn svg');
    const content = document.getElementById('currency-content');

    try {
        btn.classList.add('spinning');
        content.innerHTML = '<div class="loader">Loading rates...</div>';

        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Failed to fetch currency');

        const data = await response.json();
        currencyData = {
            inr: data.rates.INR,
            eur: data.rates.EUR,
            gbp: data.rates.GBP,
            lastUpdate: data.time_last_update_utc
        };

        content.innerHTML = `
            <div class="currency-data fade-in">
                <div class="data-row">
                    <span>USD to INR</span>
                    <span style="font-weight: 600; color: #fff;">₹${currencyData.inr.toFixed(2)}</span>
                </div>
                <div class="data-row">
                    <span>USD to EUR</span>
                    <span style="font-weight: 600; color: #fff;">€${currencyData.eur.toFixed(2)}</span>
                </div>
                <div class="data-row">
                    <span>USD to GBP</span>
                    <span style="font-weight: 600; color: #fff;">£${currencyData.gbp.toFixed(2)}</span>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        content.innerHTML = `<div class="error-msg">❌ Unable to load exchange rates.</div>`;
    } finally {
        btn.classList.remove('spinning');
    }
}

// 3. Fetch Citizen Profile
async function fetchCitizen() {
    const btn = document.querySelector('#citizen-card .refresh-btn svg');
    const content = document.getElementById('citizen-content');

    try {
        btn.classList.add('spinning');
        content.innerHTML = '<div class="loader">Loading profile...</div>';

        const randomId = Math.floor(Math.random() * 100) + 1;
        const response = await fetch(`https://dummyjson.com/users/${randomId}`);
        if (!response.ok) throw new Error('Failed to fetch citizen');

        const user = await response.json();

        citizenData = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            city: user.address.city,
            country: user.address.country,
            image: user.image
        };

        content.innerHTML = `
            <div class="profile-container fade-in">
                <img src="${citizenData.image}" alt="Profile Picture" class="profile-img">
                <div class="profile-info">
                    <h3>${citizenData.name}</h3>
                    <p>${citizenData.city}, ${citizenData.country}</p>
                    <p style="font-size: 0.8rem; opacity: 0.8;">${citizenData.email}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        content.innerHTML = `<div class="error-msg">❌ Unable to load profile.</div>`;
    } finally {
        btn.classList.remove('spinning');
    }
}

// 4. Fetch City Fact
async function fetchFact() {
    const btn = document.querySelector('#fact-card .refresh-btn svg');
    const content = document.getElementById('fact-content');

    try {
        btn.classList.add('spinning');
        content.innerHTML = '<div class="loader">Loading fact...</div>';

        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        if (!response.ok) throw new Error('Failed to fetch fact');

        const data = await response.json();
        factData = data.text;

        content.innerHTML = `
            <div class="fact-data fade-in">
                <p class="fact-text">"${factData}"</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        content.innerHTML = `<div class="error-msg">❌ Unable to load fact.</div>`;
    } finally {
        btn.classList.remove('spinning');
    }
}

// Initial Load Handler
window.addEventListener('DOMContentLoaded', () => {
    // Load all data parallelly
    Promise.all([
        fetchWeather(),
        fetchCurrency(),
        fetchCitizen(),
        fetchFact()
    ]);
});

// Since script is type="module", expose functions to window for HTML inline onclick
window.fetchWeather = fetchWeather;
window.fetchCurrency = fetchCurrency;
window.fetchCitizen = fetchCitizen;
window.fetchFact = fetchFact;

// --- CHATBOT LOGIC ---

// UI Elements
const chatWindow = document.getElementById('chat-window');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');

function toggleChat() {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        chatInput.focus();
    }
}
window.toggleChat = toggleChat;

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('msg-bubble');
    bubbleDiv.textContent = text;

    msgDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(msgDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Build Context String
function buildContextString() {
    let contextParts = [];

    if (weatherData) {
        contextParts.push(`Current Weather: ${weatherData.temperature}°C, Wind speed: ${weatherData.windspeed} km/h.`);
    }
    if (currencyData) {
        contextParts.push(`Exchange Rates (1 USD): ${currencyData.inr} INR, ${currencyData.eur} EUR, ${currencyData.gbp} GBP.`);
    }
    if (citizenData) {
        contextParts.push(`Current User/Citizen: Name is ${citizenData.name}, living in ${citizenData.city}, ${citizenData.country}. Email: ${citizenData.email}.`);
    }
    if (factData) {
        contextParts.push(`Fact of the day: ${factData}`);
    }

    if (contextParts.length === 0) {
        return "No data is currently available on the dashboard.";
    }

    return "Dashboard Data Context: " + contextParts.join(" ");
}

async function sendToLLM(query) {
    if (!HF_TOKEN) {
        return "API key not configured. Please check environment variables.";
    }

    const context = buildContextString();

    // Strict prompt to ensure model only answers from context
    const systemPrompt = `You are an AI assistant for a Smart City Dashboard. 
Answer the user's question ONLY based on the provided Data Context. 
Do not use any outside knowledge.
If the user's question is completely unrelated to the Data Context provided below, respond exactly with: "I only have information from the dashboard data"

Data Context:
${context}

User Question: ${query}

Answer:`;

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: systemPrompt,
                parameters: {
                    max_new_tokens: 150,
                    return_full_text: false,
                    temperature: 0.1 // Low temp for factual consistency
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const result = await response.json();
        let answer = result[0].generated_text.trim();

        // Clean up any weird generated prefix just in case
        if (!answer) {
            answer = "I'm having trouble processing that right now.";
        }

        return answer;
    } catch (error) {
        console.error("LLM Error:", error);
        return "Sorry, I am unable to connect to the AI service at the moment.";
    }
}

// Handle Form Submit
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = chatInput.value.trim();
    if (!text) return;

    // User message
    appendMessage(text, 'user');
    chatInput.value = '';

    // Disable input while generating
    chatInput.disabled = true;
    sendBtn.disabled = true;

    // Loading indicator
    const loadingId = "msg-" + Date.now();
    const loadingMsg = document.createElement('div');
    loadingMsg.className = "message bot";
    loadingMsg.id = loadingId;
    loadingMsg.innerHTML = `<div class="msg-bubble" style="opacity: 0.7;">Thinking...</div>`;
    chatMessages.appendChild(loadingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Get response
    const aiResponse = await sendToLLM(text);

    // Remove loading
    document.getElementById(loadingId).remove();

    // Bot message
    appendMessage(aiResponse, 'bot');

    // Re-enable
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
});
