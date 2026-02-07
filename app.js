// app.js

const root = document.documentElement;
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messagesEl = document.getElementById("messages");
const themeToggle = document.getElementById("theme-toggle");
const newChatBtn = document.getElementById("new-chat-btn");

let currentChatId = null; // manage with your backend / localStorage

function appendMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "bot" ? "AI" : "You";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  // Optional: show a temporary "typing" indicator
  const loader = document.createElement("div");
  loader.className = "message bot";
  loader.innerHTML =
    '<div class="avatar">AI</div><div class="bubble">Thinking...</div>';
  messagesEl.appendChild(loader);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  try {
    const res = await fetch("https://web-production-ba687.up.railway.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: currentChatId,
        message: text,
      }),
    });
    const data = await res.json();
    loader.remove();
    appendMessage("bot", data.reply || "No response.");
    currentChatId = data.chat_id || currentChatId;
  } catch (err) {
    loader.remove();
    appendMessage("bot", "Something went wrong. Please try again.");
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  themeToggle.querySelector("span.icon").textContent =
    next === "dark" ? "🌙" : "☀️";
  themeToggle.lastElementChild.textContent =
    next === "dark" ? "Dark mode" : "Light mode";

  localStorage.setItem("theme", next);
});

// Restore theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

// New chat
newChatBtn.addEventListener("click", () => {
  currentChatId = null;
  messagesEl.innerHTML = "";
  appendMessage("bot", "New chat started. How can I help you?");
});
