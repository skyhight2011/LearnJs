function getAllTodoElement() {
  return document.querySelectorAll('#todo-list > li');
}

function isMatchStatus(liElement, filterStatus) {
  return filterStatus === 'all' || liElement.dataset.status === filterStatus;
}

function isMatchSearch(liElement, searchTerm) {
  const titleElement = liElement.querySelector('p.todo__title');
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function isMatch(liElement, params) {
  return (
    isMatchSearch(liElement, params?.get('searchTerm')) &&
    isMatchStatus(liElement, params?.get('status'))
  );
}

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  window.history.pushState({}, '', url);

  const todoElementList = getAllTodoElement();

  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, url.searchParams);
    todoElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  // find search input
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    handleFilterChange('searchTerm', searchInput.value);
  });
}

function initFilterStatus() {
  const inputFilter = document.getElementById('inputFilter');
  if (!inputFilter) return;
  inputFilter.addEventListener('change', () => {
    handleFilterChange('status', inputFilter.value);
  });
}

(() => {
  initSearchInput();
  initFilterStatus();
})();
