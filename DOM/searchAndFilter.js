function getAllTodoElement() {
  return document.querySelectorAll('#todo-list > li');
}

function isMatch(liElement, searchTerm) {
  if (!liElement) return;
  if (searchTerm == '') return true;

  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;

  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoElementList = getAllTodoElement();
  if (!todoElementList || todoElementList.length === 0) return;
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, searchTerm);

    todoElement.hidden = !needToShow;
  }
}

function filterInput(filterInput) {
  const todoElementList = getAllTodoElement();
  if (!todoElementList || todoElementList.length === 0) return;
  for (const todoElement of todoElementList) {
    const needToShow = filterInput === 'all' || todoElement.dataset.status === filterInput;
    todoElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  // find search input
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    console.log('input', searchInput.value);
    searchTodo(searchInput.value);
  });
}

function initFilterInput() {
  const inputFilter = document.getElementById('inputFilter');
  if (!inputFilter) return;
  inputFilter.addEventListener('change', () => {
    filterInput(inputFilter.value);
  });
}

(() => {
  initSearchInput();
  initFilterInput();
})();
