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

