const labels = ["March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [5, 2, 20, 30],
    },
    {
      label: "My Two dataset",
      backgroundColor: "rgb(0, 99, 132)",
      borderColor: "rgb(0, 99, 132)",
      data: [22, 12, 29, 14],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
      responsive: true
  },
};

const myChart = new Chart(document.getElementById("chart"), config);



// show or hide sidebar
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("aside");

menuBtn.addEventListener('click',()=>{
  sidebar.style.display ="block";
})

closeBtn.addEventListener("click", () => {
  sidebar.style.display = "none";
});



// theme-toggle
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark-theme");

  document.querySelector("body nav img.logo").src = "assets/images/Massinissa.png"
  document.querySelector("body.dark-theme nav img.logo").src = "assets/images/Massinissa2.png"
  themeBtn.querySelector("span:first-child").classList.toggle("active");
  themeBtn.querySelector("span:last-child").classList.toggle("active");

});
/*===================================== */
/*===================================== */
/*===================================== */

// Data for the curve (example data)
// const incomeData = {
//   labels: ['April', 'May', 'June', 'July'],
//   datasets: [{
//     label: 'Income',
//     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     borderColor: 'rgba(54, 162, 235, 1)',
//     cubicInterpolationMode: 'monotone',
//     borderWidth: 2,
//     data: [30, 25, 35, 45], // Example data points
//     fill: true
//   }]
// };
const outcomeData = {
  labels: ['April', 'May', 'June', 'July'],
  datasets: [{
      label: 'Outcome',
      backgroundColor: 'rgba(222, 51, 51, 0.2)',
      borderColor: 'rgba(222, 51, 51, 1)',
      cubicInterpolationMode: 'monotone',
      borderWidth: 2,
      data: [10, 5, 10, 7], // Example data points
      fill: true
    }]
};
const profitData = {
  labels: ['April', 'May', 'June', 'July'],
  datasets: [{
      label: 'Outcome',
      backgroundColor: 'rgba(51, 159, 58, 0.2)',
      borderColor: 'rgba(51, 159, 58, 1)',
      cubicInterpolationMode: 'monotone',
      borderWidth: 2,
      data: [20, 20, 25, 38], // Example data points
      fill: true
    }]
};

// Configuration options
const options = {
  responsive: true,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month'
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value'
      }
    }
  }
};

// Get the canvas element
// const ctx = document.getElementById('myChart').getContext('2d');
// const ctx2 = document.getElementById('outChart').getContext('2d');
const ctx3 = document.getElementById('profitChart').getContext('2d');
const ctx4 = document.getElementById('analyseChart').getContext('2d');

// Create the chart instance
// const incomeChart = new Chart(ctx, {
//   type: 'line',
//   data: incomeData,
//   options: options
// });
const outChart = new Chart(ctx2, {
  type: 'line',
  data: outcomeData,
  options: options
});
const profitChart = new Chart(ctx3, {
  type: 'line',
  data: profitData,
  options: options
});


const analyseData = {
  labels: ['April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Income',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      cubicInterpolationMode: 'monotone',
      borderWidth: 2,
      data: [30, 25, 35, 45], // Example data points
      fill: true
    }
    ,
    {
      label: 'Outcome',
      backgroundColor: 'rgba(222, 51, 51, 0.2)',
      borderColor: 'rgba(222, 51, 51, 1)',
      cubicInterpolationMode: 'monotone',
      borderWidth: 2,
      data: [10, 5, 10, 7], // Example data points
      fill: true
    }
    ,
    {
      label: 'Outcome',
      backgroundColor: 'rgba(51, 159, 58, 0.2)',
      borderColor: 'rgba(51, 159, 58, 1)',
      cubicInterpolationMode: 'monotone',
      borderWidth: 2,
      data: [20, 20, 25, 38], // Example data points
      fill: true
    }]
};


const analyseChart = new Chart(ctx4, {
  type: 'line',
  data: analyseData,
  options: options
});




// document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('courseForm');
  const days = document.querySelectorAll('.day');
  const scheduleTableContainer = document.createElement('div');
  scheduleTableContainer.id = 'scheduleTableContainer';
  document.body.appendChild(scheduleTableContainer);

  let selectedDays = [];

  // Function to update day status based on selected sessions
  function updateDayStatus() {
      const sessionsPerWeek = parseInt(document.getElementById('sessions').value);
      console.log("sessionsPerWeek")
      console.log(sessionsPerWeek)
      days.forEach(day => {
          if (selectedDays.length === sessionsPerWeek) {
              if (!day.classList.contains('selected')) {
                  day.classList.add('inactive');
                  day.style.pointerEvents = 'none';  // Disable click events
              }
          } else {
              day.classList.remove('inactive');
              day.style.pointerEvents = 'auto';  // Re-enable click events
          }
      });
  }

  // Toggle day selection
  days.forEach(day => {
      day.addEventListener('click', () => {
          const dayName = day.getAttribute('data-day');
          if (day.classList.contains('selected')) {
              day.classList.remove('selected');
              selectedDays = selectedDays.filter(d => d !== dayName);
              updateDayStatus();
          } else if (selectedDays.length < parseInt(document.getElementById('sessions').value)) {
              day.classList.add('selected');
              selectedDays.push(dayName);
              updateDayStatus();
          }
      });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form data
      const group = document.getElementById('group').value;
      const durationInMonths = parseInt(document.getElementById('duration').value);
      const startDate = new Date(document.getElementById('startDate').value);
      const sessionsPerWeek = parseInt(document.getElementById('sessions').value);
      const sessionDuration = parseInt(document.getElementById('sessionDuration').value);

      if (!group || isNaN(durationInMonths) || !startDate || isNaN(sessionsPerWeek) || isNaN(sessionDuration)) {
          alert('Please fill in all fields correctly.');
          return;
      }

      const schedule = [];
      let currentDate = new Date(startDate);
      const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };

      // Calculate the total number of sessions
      const totalSessions = durationInMonths * 4 * sessionsPerWeek; // 4 weeks per month
      let sessionCount = 0;

      // Generate the schedule
      while (sessionCount < totalSessions) {
          const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
          if (selectedDays.includes(dayName)) {
              schedule.push({
                  dayName: dayName,
                  day: currentDate.getDate(),
                  month: currentDate.getMonth() + 1, // Months are 0-indexed
                  year: currentDate.getFullYear()
              });
              sessionCount++;
          }
          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }

      // Create and display the schedule table
      let tableHTML = '<table border="1"><tr><th>Day Name</th><th>Day</th><th>Month</th><th>Year</th></tr>';
      schedule.forEach(session => {
          tableHTML += `<tr>
              <td>${session.dayName}</td>
              <td>${session.day}</td>
              <td>${session.month}</td>
              <td>${session.year}</td>
          </tr>`;
      });
      tableHTML += '</table>';

      scheduleTableContainer.innerHTML = tableHTML;
  });

  // Listen to number of sessions change
  document.getElementById('sessions').addEventListener('change', () => {
      selectedDays = []; // Reset selected days when session number changes
      days.forEach(day => {
          day.classList.remove('selected', 'inactive');
          day.style.pointerEvents = 'auto';  // Re-enable click events
      });
      updateDayStatus();
  });
// });
