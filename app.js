const calendar = document.getElementById('calendar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');



const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function renderCalendar() {
  // Title
  calendar.textContent = monthNames[currentMonth] + ' ' + currentYear;

  // Weekday 
  const weekdaysDiv = document.getElementById('weekdays');
  weekdaysDiv.innerHTML = '';
  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let i = 0; i < weekdayNames.length; i++) {
    const div = document.createElement('div');
    div.textContent = weekdayNames[i];
    weekdaysDiv.appendChild(div);
  }

  // Days grid
  const daysDiv = document.getElementById('days');
  daysDiv.innerHTML = '';

  // how many days in month and prev month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();


  // Monday = 0 offset
  const firstOfMonth = new Date(currentYear, currentMonth, 1);
  const jsIndex = firstOfMonth.getDay();        // 0=Sun..6=Sat
  const offset = (jsIndex + 6) % 7;             // 0=Mon..6=Sun
  const startFrom = daysInPrevMonth - offset + 1;

  // Blanks at start
  for (let i = 0; i < offset; i++) {
    const div = document.createElement('div');
    div.textContent = startFrom + i;
    div.className = 'other-month';
    daysDiv.appendChild(div);
  }

  // normal days
  for (let d = 1; d <= daysInMonth; d++) {
    const div = document.createElement('div');
    div.textContent = d;
    daysDiv.appendChild(div);
  }

  // Blanks at the End 
  const totalCells = offset + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;

  for (let i = 1; i <= trailing; i++) {
    const div = document.createElement('div');
    div.textContent = i;
    div.className = 'other-month';
    daysDiv.appendChild(div);
  }
};


prevBtn.addEventListener('click', () => {
  currentMonth --;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentMonth ++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

renderCalendar();


