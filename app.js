'use strict';
// import fetch from 'node-fetch';

// const fetch_btn = document.querySelector('.fetch-api');
// const addData = document.querySelector('.add-data');
const labelWelcome = document.querySelector('.welcome');

//////////

////////////////////////// Calendar

function onClickTheDate(self) { // *** khi click vào 1 ngày (dòng 83)
  let currentMonth = document.querySelector('.date h1').innerHTML
  let currentDay = self.innerHTML
  console.log(currentMonth, currentDay);
  // axios.get(`http://localhost:3000/api/get-viewer?day=${currentMonth}&month=${currentMonth}`)
  // .then(res => { code })
}


const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector('.days');

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  document.querySelector('.date h1').innerHTML = months[date.getMonth()];

  document.querySelector('.date p').innerHTML = new Date().toDateString();


  let days = '';

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div onclick="onClickTheDate(this)" class="ddd">${i}</div>`; // *** this tức là phần tử được click vào
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;
};

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

// axios.get('http://localhost:3000/api/stat?id=1').then(response => {
//   let visitor = document.querySelector('.show_visitor');
//   visitor.innerHTML += ' ' + response.data[0].visitors;
//   let date = document.querySelector('.show_date');
//   date.innerHTML += '<br>' + response.data[0].date;
// });
// document.getElementById("p").textContent
// let test_element = document.querySelector("#test_element")
// test_element.innerHTML = res.data
