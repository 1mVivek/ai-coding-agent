async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMsg = input.value;
  if (!userMsg) return;

  chat.innerHTML += `<div class="message user">${userMsg}</div>`;
  input.value = "";

  const res = await fetch("https://web-production-ba687.up.railway.app/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });

  const data = await res.json();
  chat.innerHTML += `<div class="message ai"><pre>${data.reply}</pre></div>`;
  chat.scrollTop = chat.scrollHeight;
}
