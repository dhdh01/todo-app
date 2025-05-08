// 获取任务数据（如果有）
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 渲染任务列表
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';  // 清空任务列表

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.text}
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// 添加任务
function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();

  if (taskText) {
    tasks.push({ text: taskText });
    input.value = '';  // 清空输入框
    saveTasks();       // 保存任务
    renderTasks();     // 更新任务列表
  }
}

// 删除任务
function deleteTask(index) {
  tasks.splice(index, 1);  // 删除任务
  saveTasks();             // 保存任务
  renderTasks();           // 更新任务列表
}

// 保存任务到 localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 初始化渲染任务
renderTasks();
