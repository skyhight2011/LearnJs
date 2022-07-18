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
    const alertClass =
      todoElement.dataset.status === 'completed' ? 'alert-success' : 'alert-secondary';
    divElement.classList.add(alertClass);
  }
  //TODO: attach event for button
  //add click event for mask-as-done  button
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    markAsDoneButton.addEventListener('click', () => {
      console.log('mark as done button');
      const currentStatus = todoElement.dataset.status;
      todoElement.dataset.status = currentStatus === 'pending' ? 'completed' : 'pending';

      const newAlertClass = currentStatus === 'pending' ? 'alert-secondary' : 'alert-success';
      divElement.classList.remove('alert-secondary', 'alert-success');
      divElement.classList.add(newAlertClass);
    });
  }

  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      todoElement.remove();
    });
  }
  //add click event for remove button
  return todoElement;
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
  const todoList = [
    { id: 1, title: 'eat', status: 'pending' },
    { id: 2, title: 'code', status: 'pending' },
    { id: 3, title: 'sleep', status: 'completed' },
  ];
  renderUlElement(todoList, 'todo-list');
})();
