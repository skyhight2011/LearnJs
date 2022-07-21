function createElement(todo) {
  if (!todo) return null;
  //find template;
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;
  // clone template
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  if (!todoElement) return null;
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  //update content where needed
  const titleElement = todoElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  const divElement = todoElement.querySelector('div.todo');
  if (!divElement) return null;
  if (divElement) {
    const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
    divElement.classList.add(alertClass);
  }
  const todoList = getTodoList();
  const isChecked = todoList.find((x) => x.id === todo.id).status === 'pending' ? false : true;

  //TODO: attach event for button
  //add click event for mask-as-done button
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    markAsDoneButton.addEventListener('click', () => {
      const currentStatus = todoElement.dataset.status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

      const todoList = getTodoList();

      const index = todoList.findIndex((x) => x.id === todo.id);
      todoList[index].status = newStatus;

      // save to local storage
      localStorage.setItem('todo_list', JSON.stringify(todoList));

      todoElement.dataset.status = newStatus;
      const newAlertClass = newStatus === 'pending' ? 'alert-secondary' : 'alert-success';
      checkBoxButton.checked = newStatus === 'pending' ? false : true;
      divElement.classList.remove('alert-secondary', 'alert-success');
      divElement.classList.add(newAlertClass);
    });
  }

  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      // remove from dom
      const todoList = getTodoList();
      const newTodoList = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));
      todoElement.remove();
    });
  }

  const editButton = todoElement.querySelector('button.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const latestTodo = todoList.find((x) => x.id === todo.id);
      if (!latestTodo) return;
      populateTodoForm(latestTodo);
    });
  }

  const checkBoxButton = todoElement.querySelector('input.checkbox');
  if (checkBoxButton) {
    checkBoxButton.checked = isChecked;
    checkBoxButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const latestTodo = todoList.find((x) => x.id === todo.id);
      if (!latestTodo) return;
      const index = todoList.findIndex((x) => x.id === todo.id);
      const newCheckboxStatus = latestTodo.status === 'pending' ? 'completed' : 'pending';
      todoList[index].status = newCheckboxStatus;
      localStorage.setItem('todo_list', JSON.stringify(todoList));
      checkBoxButton.checked = newCheckboxStatus === 'pending' ? false : true;
      const newAlertClass = newCheckboxStatus === 'pending' ? 'alert-secondary' : 'alert-success';
      divElement.classList.remove('alert-secondary', 'alert-success');
      divElement.classList.add(newAlertClass);
    });
  }
  //add click event for remove button
  return todoElement;
}

const populateTodoForm = (todo) => {
  const todoForm = document.getElementById('todoFormId');
  todoForm.dataset.id = todo.id;

  const todoInput = todoForm.querySelector('input.todo-input');
  if (todoInput) todoInput.value = todo.title;
};

const handleTodoFormSubmit = (e) => {
  e.preventDefault();

  const todoForm = document.getElementById('todoFormId');
  if (!todoForm) return;
  const todoInput = todoForm.querySelector('input.todo-input');
  if (!todoInput) return;

  const todoList = getTodoList();

  const isEdit = Boolean(todoForm.dataset.id);

  if (isEdit) {
    const index = todoList.findIndex((x) => x.id.toString() === todoForm.dataset.id);
    todoList[index].title = todoInput.value;
    localStorage.setItem('todo_list', JSON.stringify(todoList));

    const liElement = document.querySelector(`ul#todo-list > li[data-id="${todoForm.dataset.id}"]`);
    if (liElement) {
      const titleElement = liElement.querySelector('.todo__title');
      if (titleElement) titleElement.textContent = todoInput.value;
    }
  } else {
    const newTodo = {
      id: Date.now(),
      title: todoInput.value,
      status: 'pending',
    };
    todoList.push(newTodo);
    // save to local storage
    localStorage.setItem('todo_list', JSON.stringify(todoList));

    const newTodoItem = createElement(newTodo);
    const ulElement = document.getElementById('todo-list');
    ulElement.appendChild(newTodoItem);
  }

  delete todoForm.dataset.id;
  todoForm.reset();
};

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}

function renderUlElement(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;
  const ulElement = document.getElementById(ulElementId);
  for (const todo of todoList) {
    const liElement = createElement(todo);
    ulElement.appendChild(liElement);
  }
}

(() => {
  const todoList = getTodoList();
  renderUlElement(todoList, 'todo-list');
  // register submita
  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleTodoFormSubmit);
  }
})();
