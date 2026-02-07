async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMsg = input.value.trim();
  if (!userMsg) return;

  // show user message
  chat.innerHTML += `<div class="message user"><pre>${userMsg}</pre></div>`;
  input.value = "";

  // typing indicator
  const typing = document.createElement("div");
  typing.className = "message ai";
  typing.innerText = "🤖 typing...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch(
      "https://web-production-ba687.up.railway.app/chat", // ✅ FIXED
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      }
    );

    const data = await res.json();

    // ✅ SAFE rendering
    typing.innerHTML = `<pre>${data.reply || data}</pre>`;
  } catch (err) {
    typing.innerText = "❌ Error talking to AI";
    console.error(err);
  }

  chat.scrollTop = chat.scrollHeight;
}
