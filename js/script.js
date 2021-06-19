'use strict';

class ToDo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    this.todoContainer = document.querySelector('.todo-container');
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML(
      'beforeend',
      `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `
    );

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(event) {
    event.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = '';
      this.render();
    } else {
      alert('Пустое поле добавить нельзя!');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(element) {
    const obj = this.todoData.get(element.closest('li').key);
    this.todoData.delete(obj.key);
    this.addToStorage();
    this.render();
  }

  completedItem(element) {
    const obj = this.todoData.get(element.closest('li').key);
    const newObj = {
      value: obj.value,
      completed: !obj.completed,
      key: obj.key,
    };
    this.todoData.set(newObj.key, newObj);
    this.addToStorage();
    this.render();
  }

  changeItem() {}

  handler(event) {
    const target = event.target;
    if (target.classList.contains('todo-complete')) this.completedItem(target);
    if (target.classList.contains('todo-remove')) this.deleteItem(target);
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.todoContainer.addEventListener('click', this.handler.bind(this));
    this.render();
  }
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
