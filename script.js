// Theme toggle feature...!
const themeBtn = document.querySelector("#themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  let Icon = document.querySelector("#icon");

  if (Icon.classList.contains("fa-moon")) {
    Icon.classList.replace("fa-moon", "fa-sun");
  } else {
    Icon.classList.replace("fa-sun", "fa-moon");
  }
});
//Update Stats
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const pendingTasks = document.querySelector("#pendingTasks");

function updateStats() {
  const total = taskArr.length;

  const completed = taskArr.filter((task) => task.completed).length;

  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;
}

const taskInput = document.querySelector(".task-input");
const select = document.querySelector("select");
const addTaskBtn = document.querySelector(".btn-add");
const emptyState = document.querySelector(".empty-state");
const taskList = document.querySelector(".task-list");

let editTaskId = null;
let taskArr = [];
updateStats();

let rendertask = function () {
  taskList.innerHTML = "";
  updateStats();

  if (taskArr.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  taskArr.forEach((taskCard) => {
    taskList.innerHTML += `<div class="task-card" data-id="${taskCard.id}">
            <div class="task-info" >
              <h3 class="${taskCard.completed ? "completed" : ""}">${taskCard.task}</h3>
              <span class="category">${taskCard.category}</span>
            </div>
            <div class="task-actions">
              <button class="complete-btn ${taskCard.completed ? "done" : ""}">
                <i class="fa-solid fa-check"></i>
              </button>
              <button class="edit-btn"${taskCard.completed ? "disabled" : ""}>
              <i class="fa-regular fa-pen-to-square"></i></button>
              <button class="delete-btn">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>`;
  });
};

rendertask();

addTaskBtn.addEventListener("click", () => {
  if (editTaskId !== null) {
    const task = taskArr.find((task) => task.id === editTaskId);
    task.task = taskInput.value.trim();
    task.category = select.value;
    editTaskId = null;
    addTaskBtn.textContent = "Add Task";
    rendertask();
    taskInput.value = "";
    return;
  }

  const task = taskInput.value.trim();
  const category = select.value;

  if (!task) return;
  emptyState.style.display = "none";

  let obj = {
    id: Date.now(),
    task,
    category,
    completed: false,
  };

  taskArr.push(obj);
  rendertask();
  taskInput.value = "";
});

taskList.addEventListener("click", (elem) => {
  // delete feature
  if (elem.target.closest(".delete-btn")) {
    const taskCard = elem.target.closest(".task-card");
    const taskId = Number(taskCard.dataset.id);
    taskArr = taskArr.filter((task) => task.id !== taskId);
    console.log(taskId);
    rendertask();
  }
  // edit feature
  if (elem.target.closest(".edit-btn")) {
    const taskCard = elem.target.closest(".task-card");
    const taskId = Number(taskCard.dataset.id);

    const task = taskArr.find((task) => task.id === taskId);

    taskInput.value = task.task;
    select.value = task.category;
    editTaskId = taskId;
    addTaskBtn.textContent = "Update Task";
  }

  //Complete fature
  if (elem.target.closest(".complete-btn")) {
    const taskCard = elem.target.closest(".task-card");
    const taskId = Number(taskCard.dataset.id);

    const task = taskArr.find((task) => task.id === taskId);

    task.completed = !task.completed;

    rendertask();
  }
  updateStats();
});

const completeClearBtn = document.querySelector(".clear-btn");
completeClearBtn.addEventListener("click", () => {
  taskArr = taskArr.filter((task) => {
    return task.completed === false;
  });
  rendertask();
});
const filter = document.querySelector(".filter-section");

filter.addEventListener("click", (e) => {
  if (e.target.closest("#all-btn")) {
    rendertask();
  }

  if (e.target.closest("#completed-btn")) {
    taskList.innerHTML = "";

    taskArr
      .filter((task) => task.completed)
      .forEach((task) => renderSingleTask(task));
  }

  if (e.target.closest("#pending-btn")) {
    taskList.innerHTML = "";

    taskArr
      .filter((task) => !task.completed)
      .forEach((task) => renderSingleTask(task));
  }
});
function renderSingleTask(task) {
  taskList.innerHTML += `
    <div class="task-card" data-id="${task.id}">
      <div class="task-info">
        <h3 class="${task.completed ? "completed" : ""}">
          ${task.task}
        </h3>

        <span class="category">
          ${task.category}
        </span>
      </div>

      <div class="task-actions">
        <button class="complete-btn ${task.completed ? "done" : ""}">
          <i class="fa-solid fa-check"></i>
        </button>

        <button
          class="edit-btn"
          ${task.completed ? "disabled" : ""}
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </button>

        <button class="delete-btn">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  `;
}

let rendertasks = function () {
  taskList.innerHTML = "";

  if (taskArr.length === 0) {
    emptyState.style.display = "block";
    updateStats();
    return;
  }

  emptyState.style.display = "none";

  taskArr.forEach((task) => {
    renderSingleTask(task);
  });

  updateStats();
};
