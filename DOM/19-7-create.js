function createElement(todo) {
  if (!todo) return null;
  liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;

  return liElement;
}
function renderUlElement(todoList, UlElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;
  const ulElement = document.getElementById(UlElementId);
  if (!ulElement) return;
  for (todo of todoList) {
    const liElement = createElement(todo);
    ulElement.appendChild(liElement);
  }
}

(() => {
  const todoList = [
    { id: 1, title: 'eat', status: 'active' },
    { id: 2, title: 'code', status: 'active' },
    { id: 3, title: 'sleep', status: 'active' },
  ];
  renderUlElement(todoList, 'todoList');
  console.log('work....');
})();
