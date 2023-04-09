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
  e.target.classList.toggle('active');
}

// add habit
function addHabit(e) {
  e.preventDefault();
  const name = habitNameInput.value;
  if (!name) return;
  const id = new Date().getTime();
  const habit = {
    id: id,
    name: name,
    progress: {}
  };
  habits.push(habit);
  localStorage.setItem('habits', JSON.stringify(habits));
  habitNameInput.value = '';
  const li = document.createElement('li');
  li.innerHTML = `<span class="habit-name">${habit.name}</span><button class="remove-habit" data-id="${habit.id}">Remove</button>`;
  habitList.appendChild(li);
}

// remove habit
function removeHabit(e) {
  if (!e.target.classList.contains('remove-habit')) return;
  const habitId = e.target.getAttribute('data-id');
  const habitIndex = habits.findIndex(h => h.id == habitId);
  habits.splice(habitIndex, 1);
  localStorage.setItem('habits', JSON.stringify(habits));
  e.target.parentNode.remove();
}

// initialize app
generateCalendar();
loadHabits();

// event listeners
calendar.addEventListener('click', toggleHabit);
addHabitForm.addEventListener('submit', addHabit);
habitList.addEventListener('click', removeHabit);

// set habit progress on calendar
habits.forEach(habit => {
  for (const [day, completed] of Object.entries(habit.progress)) {
    const dayElement = calendar.querySelector(`[data-day="${day}"]`);
    dayElement.classList.add('active');
  }
});
