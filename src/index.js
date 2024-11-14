document.addEventListener("DOMContentLoaded", () => {
  const forma = document.getElementById("create-task-form");
  const tasklist = document.getElementById("tasks");
  const input = document.getElementById("new-task-description");

  // Create the priority dropdown
  const dropCol = document.createElement("select");
  dropCol.classList.add("colors");
  dropCol.innerHTML = `
    <option value="" disabled selected>Select Priority</option> 
    <option value='#FF0000' data-priority="1">1</option> 
    <option value='#FFA500' data-priority="2">2</option> 
    <option value='#008000' data-priority="3">3</option> 
    <option value='#0000FF' data-priority="4">4</option>
  `;
  forma.appendChild(dropCol);

  let colorize = '';
  let priorityLevel = 0;

  // Update color and priority level when dropdown changes
  dropCol.addEventListener("change", (e) => {
    colorize = e.target.value;
    priorityLevel = e.target.options[e.target.selectedIndex].dataset.priority;
  });

  // Handle form submission to add a new task
  forma.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskDescription = input.value.trim();
    if (!taskDescription || !colorize) return;

    // Create a new task item
    const newTask = document.createElement("li");
    newTask.style.color = colorize;
    newTask.dataset.priority = priorityLevel;

    // Main task description
    const descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = taskDescription;
    newTask.appendChild(descriptionSpan);

    // Extra information
    const extraInfo = document.querySelectorAll(".extra");
    extraInfo.forEach(info => {
      if (info.value) {
        const extraSpan = document.createElement("span");
        extraSpan.textContent = ` + ${info.placeholder}: ${info.value}`;
        extraSpan.classList.add("extra-info"); // Optional class for styling
        newTask.appendChild(extraSpan);
      }
    });

    // Delete button
    const deleteButton = document.createElement("button");
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit"
    editBtn.classList.add("edit-btns")
    deleteButton.textContent = " X ";
    deleteButton.classList.add("rmv-Btns");
    newTask.appendChild(deleteButton);
    newTask.appendChild(editBtn)

    // Append the task to the list
    tasklist.appendChild(newTask);

    // Reset form fields and variables
    forma.reset();
    extraInfo.forEach(input => input.value = "");
    priorityLevel = 0;
    colorize = "";
    dropCol.selectedIndex = 0;

    // Sort tasks after adding
    sortTasks(tasklist);
  });

  // Handle task removal when clicking delete button
  tasklist.addEventListener("click", (e) => {
    if (e.target.classList.contains("rmv-Btns")) {
      e.target.parentElement.remove();
    }
  });

  tasklist.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-Btns")) {
      e.target.parentElement.remove();
    }
  });


  // Additional input fields for user, duration, date due
  const extra = ["user", "due", "duration"];
  for (const ele of extra) {
    let element = document.createElement("input");
    element.classList.add("extra");
    element.setAttribute("Placeholder", ele);
    element.setAttribute("id", ele);
    element.setAttribute("type", "text");
    forma.appendChild(element);
  }
});

// Function to sort tasks based on priority
function sortTasks(tasklist) {
  const tasks = Array.from(tasklist.children);

  // Sort tasks by 'priority' in ascending order
  tasks.sort((a, b) => parseInt(a.dataset.priority) - parseInt(b.dataset.priority));

  // Clear and re-append sorted tasks
  tasklist.innerHTML = "";
  tasks.forEach((task) => tasklist.appendChild(task));
}
