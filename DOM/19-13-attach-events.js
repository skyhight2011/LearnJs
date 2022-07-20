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

  //TODO: attach event for button
  //add click event for mask-as-done button
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    markAsDoneButton.addEventListener('click', () => {
      const currentStatus = todoElement.dataset.status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

      const index = todoList.findIndex((x) => x.id === todo.id);
      todoList[index].status = newStatus;

      // save to local storage
      localStorage.setItem('todo_list', JSON.stringify(todoList));

      todoElement.dataset.status = newStatus;
      const newAlertClass = newStatus === 'pending' ? 'alert-secondary' : 'alert-success';
      divElement.classList.remove('alert-secondary', 'alert-success');
      divElement.classList.add(newAlertClass);
    });
  }

  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      // remove from dom
      const newTodoList = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));
      todoElement.remove();
    });
  }
  //add click event for remove button
  return todoElement;
}

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
})();
