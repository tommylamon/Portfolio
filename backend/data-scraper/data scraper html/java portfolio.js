fetch("http://localhost:3000/api/quotes")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("quotes-container");
    container.innerHTML = ""; // clear loading message
    data.forEach(q => {
      const block = document.createElement("blockquote");
      block.textContent = `"${q.text}" — ${q.author || "Unknown"}`;
      container.appendChild(block);
    });
  })
  .catch(err => console.error(err));
