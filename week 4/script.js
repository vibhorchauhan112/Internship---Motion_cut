document.querySelectorAll(".save-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const taskInput = document.querySelectorAll(".task-input")[index];
    const time = document.querySelectorAll(".time")[index].innerText;
    localStorage.setItem(time, taskInput.value);
    alert("Task saved for " + time);
  });
});

// Load saved tasks from localStorage
document.querySelectorAll(".time").forEach((timeEl, index) => {
  const savedTask = localStorage.getItem(timeEl.innerText);
  if (savedTask) {
    document.querySelectorAll(".task-input")[index].value = savedTask;
  }
});
