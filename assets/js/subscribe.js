// Code that runs on the subscribe page.
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("outreach");
  const fieldset = document.getElementById("outreach-details");
  const handleChange = () => {
    fieldset.hidden = !checkbox.checked;
    fieldset.disabled = !checkbox.checked; // skip validation and submission while hidden
  };
  checkbox.addEventListener("change", handleChange);

  // Hide the fieldset on page load. Everything shows when js is disabled.
  fieldset.hidden = true;
  fieldset.disabled = true;
});
