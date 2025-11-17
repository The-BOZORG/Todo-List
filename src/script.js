const input = document.querySelector('input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

const BASE_URL = window.location.origin;

// ---------- Load ----------
async function loadTodos() {
  const res = await fetch(BASE_URL + '/');
  const data = await res.json();

  todoList.innerHTML = '';
  data.forEach((item) => addTodoToUI(item));
}

// ---------- UI Add ----------
function addTodoToUI(todo) {
  const li = document.createElement('li');
  li.dataset.id = todo._id;

  li.innerHTML = `
    <span class="title">${todo.title}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">×</button>
  `;

  todoList.appendChild(li);
}

// ---------- Add New ----------
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

// ---------- Delete / Edit Listener ----------
todoList.addEventListener('click', async (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const id = li.dataset.id;

  // ---------- DELETE ----------
  if (e.target.classList.contains('delete-btn')) {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    li.remove();
    return;
  }

  // ---------- EDIT (turn into input) ----------
  if (e.target.classList.contains('edit-btn')) {
    const titleSpan = li.querySelector('.title');

    if (li.querySelector('input')) return;

    const input = document.createElement('input');
    input.value = titleSpan.textContent;

    titleSpan.style.display = 'none';
    li.insertBefore(input, e.target);

    e.target.textContent = 'Add';
    e.target.classList.remove('edit-btn');
    e.target.classList.add('save-btn');

    return;
  }

  // ---------- SAVE ----------
  if (e.target.classList.contains('save-btn')) {
    const inputField = li.querySelector('input');
    const newTitle = inputField.value.trim();

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });

    const updated = await res.json();

    li.querySelector('.title').textContent = updated.title;
    li.querySelector('.title').style.display = 'inline';

    inputField.remove();

    e.target.textContent = 'Edit';
    e.target.classList.remove('save-btn');
    e.target.classList.add('edit-btn');
  }
});

loadTodos();
