async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMsg = input.value;
  if (!userMsg) return;

  chat.innerHTML += `<div class="message user">${userMsg}</div>`;
  input.value = "";

  const res = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });

  const data = await res.json();
  chat.innerHTML += `<div class="message ai"><pre>${data.reply}</pre></div>`;
  chat.scrollTop = chat.scrollHeight;
}
