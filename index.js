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
