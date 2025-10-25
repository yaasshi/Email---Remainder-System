// script.js code

document.getElementById('reminderForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const date = document.getElementById('date').value;

  try {
    const res = await fetch('http://localhost:5000/set-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, subject, message, date })
    });

    const data = await res.json();
    document.getElementById('status').textContent = data.message;

  } catch (err) {
    document.getElementById('status').textContent = "Error connecting to server";
    console.error(err);
  }
});
