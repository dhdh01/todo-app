// 获取任务数据（如果有）
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 渲染任务列表
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // 清空任务列表

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleDone(${index})">
      <span style="text-decoration: ${task.done ? 'line-through' : 'none'};">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">Delete</button>
      <button onclick="editTask(${index})">Edit</button>
    `;

    taskList.appendChild(li);
  });
}

// 添加任务
function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();

  if (!taskText) {
    alert('任务不能为空！');
    return;
  }

  const isDuplicate = tasks.some(task => task.text === taskText);
  if (isDuplicate) {
    alert('任务已存在，请勿重复添加！');
    return;
  }

  tasks.push({ text: taskText, done: false });
  input.value = '';
  saveTasks();
  renderTasks();
}


// 删除任务
function deleteTask(index) {
  tasks.splice(index, 1);  // 删除任务
  saveTasks();             // 保存任务
  renderTasks();           // 更新任务列表
}

// 切换任务完成状态
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// 编辑任务
function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);  // 弹出对话框让用户编辑
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();       // 保存更新后的任务
    renderTasks();     // 重新渲染任务列表
  }
}

// 保存任务到 localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 初始化渲染任务
renderTasks();
