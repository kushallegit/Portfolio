/* Filter by Category: Projects*/
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".sticker-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    projects.forEach(project => {
      const projectCategory = project.getAttribute("data-category");
      if (category === "all" || category === projectCategory) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });
  });
});

/* Scroll Progress Bar*/
window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  scrollProgress.style.width = `${scrolled * 100}%`;
});

/* Random Quotes */
// Fetch a random quote from the API and display it
fetch("https://dummyjson.com/quotes/random")
  .then(res => res.json())
  .then(data => {
    document.getElementById("quote").innerText = `"${data.quote}" — ${data.author}`;
  })
  .catch(() => {
    document.getElementById("quote").innerText = "Could not load quote.";
  });

document.querySelector(".contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  try {
    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    alert(data.message);
    form.reset();
  } catch (err) {
    alert("❌ Failed to send message. Please try again.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
