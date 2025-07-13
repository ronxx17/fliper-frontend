const backendURL = "https://fliper-1-31le.onrender.com";

fetch(`${backendURL}/api/projects`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("project-list");
    container.innerHTML = data.map(p => `
      <div class="card">
        <img src="${p.image}" alt="Project Image" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <button>Read More</button>
      </div>`).join('');
  });

fetch(`${backendURL}/api/clients`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("client-list");
    container.innerHTML = data.map(c => `
      <div class="client-card">
        <img src="${c.image}" alt="Client Image" />
        <p>"${c.description}"</p>
        <h4>${c.name}</h4>
        <small>${c.designation}</small>
      </div>`).join('');
  });

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  fetch(`${backendURL}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(() => alert("Contact form submitted successfully!"))
  .catch(() => alert("Error submitting form."));
});

document.getElementById("subscribe-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  fetch(`${backendURL}/api/subscribers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(() => alert("Subscribed successfully!"))
  .catch(() => alert("Subscription failed."));
});
