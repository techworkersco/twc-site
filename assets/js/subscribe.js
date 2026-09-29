// Code that runs on the subscribe page.
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("outreach");
  const fieldset = document.getElementById("outreach-details");
  const sync = () => {
    fieldset.hidden = !checkbox.checked;
    fieldset.disabled = !checkbox.checked; // skip validation and submission while hidden
  };
  checkbox.addEventListener("change", sync);
  sync(); // handles the browser restoring the checked state on back/forward
});
