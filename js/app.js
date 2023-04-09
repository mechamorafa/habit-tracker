const calendar = document.getElementById('calendar');
const habitList = document.querySelector('#habit-list ul');
const addHabitForm = document.getElementById('add-habit-form');
const habitNameInput = document.getElementById('habit-name');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

// generate calendar
function generateCalendar() {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.innerText = i;
    day.setAttribute('data-day', i);
    calendar.appendChild(day);
  }
}

// load habits from local storage
function loadHabits() {
  habitList.innerHTML = '';
  habits.forEach(habit => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="habit-name">${habit.name}</span><button class="remove-habit" data-id="${habit.id}">Remove</button>`;
    habitList.appendChild(li);
  });
}

// toggle habit completion
function toggleHabit(e) {
  const day = e.target.getAttribute('data-day');
  const habitId = e.target.getAttribute('data-id');
  const habit = habits.find(h => h.id == habitId);
  const habitIndex = habits.findIndex(h => h.id == habitId);
  const completed = habit.progress[day] ? false : true;
  habit.progress[day] = completed;
  habits[habitIndex] = habit;
  localStorage.setItem('habits', JSON.stringify(habits));
  e
