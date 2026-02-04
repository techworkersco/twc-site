const ready = () => {
  document.removeEventListener("DOMContentLoaded", ready);

  document
    .getElementById("navBtn")
    .addEventListener("click", () =>
      document.getElementById("nav").classList.toggle("hide"),
    );
};

if (document.readyState !== "loading") ready();
else document.addEventListener("DOMContentLoaded", ready);
