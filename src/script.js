const input = document.querySelector('input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

const BASE_URL = window.location.origin;

async function loadTodos() {
  const res = await fetch(BASE_URL + '/');
  const data = await res.json();

  todoList.innerHTML = '';

  data.forEach((item) => addTodoToUI(item));
}

function addTodoToUI(todo) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${todo.title}
    <button class="delete-btn" data-id="${todo._id}">×</button>
  `;
  todoList.appendChild(li);
}

addBtn.addEventListener('click', async () => {
  const title = input.value.trim();
  if (!title) return;

  const res = await fetch(BASE_URL + '/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  const newTodo = await res.json();
  addTodoToUI(newTodo);

  input.value = '';
});

todoList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;

    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });

    e.target.parentElement.remove();
  }
});

loadTodos();
