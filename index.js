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

/* Back to Top Button */
const btn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  btn.style.display = window.scrollY > 300 ? "block" : "none";
});

btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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

// Contact form submission
document.querySelector(".contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const API_URL = "https://portfolio-jk5f.onrender.com/api/contact";
  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  const res = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
  });

  try {
    const res = await fetch("https://portfolio-jk5f.onrender.com/api/contact", {
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
