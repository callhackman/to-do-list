document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Get todos from local storage or initialize an empty array
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Function to render todos on the page
  const renderTodos = () => {
    // Clear the current list
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";
      li.innerHTML = `
        <span>${todo.text}</span>
        <div>
          <button class="complete-btn" data-index="${index}">
            ${todo.completed ? "Undo" : "Complete"}
          </button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
    });
    // Save the updated list to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Event listener for adding a new to-do
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text !== "") {
      todos.push({ text: text, completed: false });
      todoInput.value = "";
      renderTodos();
    }
  });

  // Event listener for complete and delete actions using event delegation
  todoList.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("delete-btn")) {
      todos.splice(index, 1);
      renderTodos();
    }
    if (e.target.classList.contains("complete-btn")) {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    }
  });

  // Render todos when page loads
  renderTodos();
});