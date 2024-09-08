
const incomeTab = document.querySelector(".income-details-cover");
const table1 = document.querySelector(".income-details-cover table");
const expenseTab = document.querySelector(".expense-details-cover");
const table2 = document.querySelector(".expense-details-cover table");


async function fetchFinanceData(endpoint) {
  try {
      const response = await fetch('/finance/' + endpoint);
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(`Fetched ${endpoint} data:`, data);
      return data;
  } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return []; // Return an empty array on error
  }
}

const chartOptions = {
  responsive: true,
  scales: {
      x: {
          display: true,
          title: {
              display: true,
              text: 'Date'
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

function displayData(data, tab) {
  console.log(`Processing ${tab} data:`, data);
  data = processFinanceData(data);
  console.log(`Processed ${tab} data:`, data);

  const chartData = {
      labels: data.dates.map(date => date.slice(-2)),
      datasets: [{
          label: tab === "income" ? 'Income' : tab === "expense" ? 'Expense' : 'Profit',
          backgroundColor: tab === "income" ? 'rgba(54, 162, 235, 0.2)' : tab === "expense" ? 'rgba(222, 51, 51, 0.2)' : 'rgba(75, 192, 192, 0.2)',
          borderColor: tab === "income" ? 'rgba(54, 162, 235, 1)' : tab === "expense" ? 'rgba(222, 51, 51, 1)' : '#40B958',
          cubicInterpolationMode: 'monotone',
          borderWidth: 2,
          data: data.values,
          fill: true
      }]
  };

  const ctx = document.getElementById(tab === "income" ? 'myChart' : tab === "expense" ? 'outChart' : 'profitChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
  });
}

async function displayProfitChart() {
  const incomeData = await fetchFinanceData('income');
  const expenseData = await fetchFinanceData('expense');

  const processedIncomeData = processFinanceData(incomeData);
  const processedExpenseData = processFinanceData(expenseData);

  const profitData = calculateProfit(processedIncomeData, processedExpenseData);
  console.log('Processed profit data:', profitData);
  displayData(profitData, 'profit');
}

function getLastFourDates() {
  const dates = [];
  for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.unshift(date.toISOString().split('T')[0]);
  }
  return dates;
}

function processFinanceData(data) {
  if (!Array.isArray(data)) {
      console.error('Expected an array but got:', data);
      return { dates: [], values: [] };
  }

  const lastFourDates = getLastFourDates();
  const processedData = {};

  lastFourDates.forEach(date => {
      processedData[date] = { date: date, totalValue: 0 };
  });

  data.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      if (processedData[date]) {
          processedData[date].totalValue += item.value;
      }
  });

  const dates = lastFourDates;
  const values = dates.map(date => processedData[date].totalValue);

  return { dates, values };
}

function calculateProfit(incomeProcessed, expenseProcessed) {
  const dates = incomeProcessed.dates;
  const incomeValues = incomeProcessed.values;
  const expenseValues = expenseProcessed.values;

  const profitValues = dates.map((date, index) => {
      const incomeIndex = incomeProcessed.dates.indexOf(date);
      const expenseIndex = expenseProcessed.dates.indexOf(date);
      const income = incomeIndex !== -1 ? incomeProcessed.values[incomeIndex] : 0;
      const expense = expenseIndex !== -1 ? expenseProcessed.values[expenseIndex] : 0;
      return income - expense;
  });
  let fourlastdates = getLastFourDates()
  let arr = []
  for (let i = 0; i < fourlastdates.length; i++) {
    arr.push({date: fourlastdates[i], value: profitValues[i]})
  }
  // arr.push()
  return arr;
  // return { dates, values: profitValues };
  // return { dates, values: profitValues };
}

fetchFinanceData("income").then(data => displayData(data, "income"));
fetchFinanceData("expense").then(data => displayData(data, "expense"));
displayProfitChart();


function viewIncomes() {
  incomeTab.classList.add("active");
  table1.innerHTML = ` <tr>
                        <th>Libellé</th>
                        <th>Date</th>
                        <th>Somme</th>
                        <th>Notes</th>
                    </tr>`
  try {
      fetch('/finance/income').then(response => response.json()).then(data => {
          console.log(data);
          if (data.length > 0) {
              data.forEach(element => {
                  table1.innerHTML += `<td>${element.name}</td>
                                       <td>${element.date.split("T")[0]}</td>
                                       <td>${element.value}</td>
                                       <td>${element.notes}</td>`;
              });
          }
      });
  } catch (error) {
      console.log(error);
  }
}

function viewExpenses() {
  expenseTab.classList.add("active");
  table2.innerHTML = ` <tr>
                        <th>Libellé</th>
                        <th>Date</th>
                        <th>Somme</th>
                        <th>Notes</th>
                    </tr>`
  try {
      fetch('/finance/expense').then(response => response.json()).then(data => {
          console.log(data);
          if (data.length > 0) {
              data.forEach(element => {
                  table2.innerHTML += `<td>${element.name}</td>
                                       <td>${element.date.split("T")[0]}</td>
                                       <td>${element.value}</td>
                                       <td>${element.notes}</td>`;
              });
          }
      });
  } catch (error) {
      console.log(error);
  }
}

function closeTab(event) {
  incomeTab.classList.remove("active");
  expenseTab.classList.remove("active");
}























// async function fetchFinanceData(endpoint) {
//   try {
//       const response = await fetch('/finance/' + endpoint);
//       if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//       }
//       const data = await response.json();
//       console.log(`Fetched ${endpoint} data:`, data); // Log the fetched data
//       return data;
//   } catch (error) {
//       console.error('There has been a problem with your fetch operation:', error);
//       return []; // Return an empty array on error
//   }
// }

// const chartOptions = {
//   responsive: true,
//   scales: {
//       x: {
//           display: true,
//           title: {
//               display: true,
//               text: 'Date'
//           }
//       },
//       y: {
//           display: true,
//           title: {
//               display: true,
//               text: 'Value'
//           }
//       }
//   }
// };

// function displayData(data, tab) {
//   console.log(`Processing ${tab} data:`, data);
//   data = processFinanceData(data);
//   console.log(`Processed ${tab} data:`, data);

//   const chartData = {
//       labels: data.dates.map(date => date.slice(-2)),
//       datasets: [{
//           label: tab === "income" ? 'Income' : tab === "expense" ? 'Outcome' : 'Profit',
//           backgroundColor: tab === "income" ? 'rgba(54, 162, 235, 0.2)' : tab === "expense" ? 'rgba(222, 51, 51, 0.2)' : 'rgba(75, 192, 192, 0.2)',
//           borderColor: tab === "income" ? 'rgba(54, 162, 235, 1)' : tab === "expense" ? 'rgba(222, 51, 51, 1)' : 'rgba(75, 192, 192, 1)',
//           cubicInterpolationMode: 'monotone',
//           borderWidth: 2,
//           data: data.values,
//           fill: true
//       }]
//   };

//   const ctx = document.getElementById(tab === "income" ? 'myChart' : tab === "expense" ? 'outChart' : 'profitChart').getContext('2d');
//   const chart = new Chart(ctx, {
//       type: 'line',
//       data: chartData,
//       options: chartOptions
//   });
// }

// async function displayProfitChart() {
//   const incomeData = await fetchFinanceData('income');
//   const expenseData = await fetchFinanceData('expense');

//   const processedIncomeData = processFinanceData(incomeData);
//   const processedExpenseData = processFinanceData(expenseData);

//   const profitData = calculateProfit(processedIncomeData, processedExpenseData);
  
//   displayData(profitData, 'profit');
// }

// function getLastFourDates() {
//   const dates = [];
//   for (let i = 0; i < 4; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       dates.unshift(date.toISOString().split('T')[0]);
//   }
//   return dates;
// }

// function processFinanceData(data) {
//   if (!Array.isArray(data)) {
//       console.error('Expected an array but got:', data);
//       return { dates: [], values: [] }; // Return empty data if not an array
//   }

//   const lastFourDates = getLastFourDates();
//   const processedData = {};

//   lastFourDates.forEach(date => {
//       processedData[date] = { date: date, totalValue: 0 };
//   });

//   data.forEach(item => {
//       const date = new Date(item.date).toISOString().split('T')[0];
//       if (processedData[date]) {
//           processedData[date].totalValue += item.value;
//       }
//   });

//   const dates = lastFourDates;
//   const values = dates.map(date => processedData[date].totalValue);

//   return { dates, values };
// }

// function calculateProfit(incomeProcessed, expenseProcessed) {
//   const lastFourDates = getLastFourDates();

//   const profitValues = lastFourDates.map(date => {
//       const income = incomeProcessed.values[incomeProcessed.dates.indexOf(date)] || 0;
//       const expense = expenseProcessed.values[expenseProcessed.dates.indexOf(date)] || 0;
//       return income - expense;
//   });
//   console.log("profitValues")
//   console.log(profitValues)

//   return { dates: lastFourDates, values: profitValues };
// }

// fetchFinanceData("income").then(data => displayData(data, "income"));
// fetchFinanceData("expense").then(data => displayData(data, "expense"));
// displayProfitChart();

// const incomeTab = document.querySelector(".income-details-cover");
// const table1 = document.querySelector(".income-details-cover table");
// const expenseTab = document.querySelector(".expense-details-cover");
// const table2 = document.querySelector(".expense-details-cover table");

// function viewIncomes() {
//   incomeTab.classList.add("active");
//   try {
//       fetch('/finance/income').then(response => response.json()).then(data => {
//           console.log(data);
//           if (data.length > 0) {
//               data.forEach(element => {
//                   table1.innerHTML += `<td>${element.name}</td>
//                                        <td>${element.date.split("T")[0]}</td>
//                                        <td>${element.value}</td>
//                                        <td>${element.notes}</td>`;
//               });
//           }
//       });
//   } catch (error) {
//       console.log(error);
//   }
// }

// function viewExpenses() {
//   expenseTab.classList.add("active");
//   try {
//       fetch('/finance/expense').then(response => response.json()).then(data => {
//           console.log(data);
//           if (data.length > 0) {
//               data.forEach(element => {
//                   table2.innerHTML += `<td>${element.name}</td>
//                                        <td>${element.date.split("T")[0]}</td>
//                                        <td>${element.value}</td>
//                                        <td>${element.notes}</td>`;
//               });
//           }
//       });
//   } catch (error) {
//       console.log(error);
//   }
// }

// function closeTab(event) {
//   incomeTab.classList.remove("active");
//   expenseTab.classList.remove("active");
// }



























// async function fetchFinanceData(endpoint) {
//   try {
//       const response = await fetch('/finance/' + endpoint);
//       if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//       }
//       const data = await response.json();
//       displayData(data, endpoint);
//   } catch (error) {
//       console.error('There has been a problem with your fetch operation:', error);
//   }
// }

// const chartOptions = {
//   responsive: true,
//   scales: {
//       x: {
//           display: true,
//           title: {
//               display: true,
//               text: 'Date'
//           }
//       },
//       y: {
//           display: true,
//           title: {
//               display: true,
//               text: 'Value'
//           }
//       }
//   }
// };

// function displayData(data, tab) {
//   data = processFinanceData(data);
//   console.log(data);

//   const chartData = {
//       labels: data.dates.map(date => date.slice(-2)),
//       datasets: [{
//           label: tab === "income" ? 'Income' : 'Outcome',
//           backgroundColor: tab === "income" ? 'rgba(54, 162, 235, 0.2)' : 'rgba(222, 51, 51, 0.2)',
//           borderColor: tab === "income" ? 'rgba(54, 162, 235, 1)' : 'rgba(222, 51, 51, 1)',
//           cubicInterpolationMode: 'monotone',
//           borderWidth: 2,
//           data: data.values,
//           fill: true
//       }]
//   };

//   const ctx = document.getElementById(tab === "income" ? 'myChart' : 'outChart').getContext('2d');
//   const chart = new Chart(ctx, {
//       type: 'line',
//       data: chartData,
//       options: chartOptions
//   });
// }

// fetchFinanceData("income");
// fetchFinanceData("expense");

// function getLastFourDates() {
//   const dates = [];
//   for (let i = 0; i < 4; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       dates.unshift(date.toISOString().split('T')[0]);
//   }
//   return dates;
// }

// function processFinanceData(data) {
//   const lastFourDates = getLastFourDates();
//   const processedData = {};

//   lastFourDates.forEach(date => {
//       processedData[date] = { date: date, totalValue: 0 };
//   });

//   data.forEach(item => {
//       const date = new Date(item.date).toISOString().split('T')[0];
//       if (processedData[date]) {
//           processedData[date].totalValue += item.value;
//       }
//   });

//   const dates = lastFourDates;
//   const values = dates.map(date => processedData[date].totalValue);

//   return { dates, values };
// }

// const incomeTab = document.querySelector(".income-details-cover");
// const table1 = document.querySelector(".income-details-cover table");
// const expenseTab = document.querySelector(".expense-details-cover");
// const table2 = document.querySelector(".expense-details-cover table");

// function viewIncomes() {
//   incomeTab.classList.add("active");
//   try {
//       fetch('/finance/income').then(response => response.json()).then(data => {
//           console.log(data);
//           if (data.length > 0) {
//               data.forEach(element => {
//                   table1.innerHTML += `<td>${element.name}</td>
//                                        <td>${element.date.split("T")[0]}</td>
//                                        <td>${element.value}</td>
//                                        <td>${element.notes}</td>`;
//               });
//           }
//       });
//   } catch (error) {
//       console.log(error);
//   }
// }

// function viewExpenses() {
//   expenseTab.classList.add("active");
//   try {
//       fetch('/finance/expense').then(response => response.json()).then(data => {
//           console.log(data);
//           if (data.length > 0) {
//               data.forEach(element => {
//                   table2.innerHTML += `<td>${element.name}</td>
//                                        <td>${element.date.split("T")[0]}</td>
//                                        <td>${element.value}</td>
//                                        <td>${element.notes}</td>`;
//               });
//           }
//       });
//   } catch (error) {
//       console.log(error);
//   }
// }

// function closeTab(event) {
//   incomeTab.classList.remove("active");
//   expenseTab.classList.remove("active");
// }



























// async function fetchFinanceData(endpoint) {
//     try {
//       const response = await fetch('/finance/'+ endpoint );
//       if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//       }
//       const data = await response.json();
//       displayData(data, endpoint);
//     } catch (error) {
//       console.error('There has been a problem with your fetch operation:', error);
//     }
//   }
// const chartOptions = {
//     responsive: true,
//     scales: {
//       x: {
//         display: true,
//         title: {
//           display: true,
//           text: 'Date'
//         }
//       },
//       y: {
//         display: true,
//         title: {
//           display: true,
//           text: 'Value'
//         }
//       }
//     }
//   };
  
// function  displayData( data, tab ) {
//     // console.log(tab)
//     // console.log(data)
//     data = processFinanceData(data)
//     console.log(data)
//     if(tab == "income"){
//     const incomeData = {
//         labels: data.dates.map(date => date.slice(-2)),
//         datasets: [{
//           label: 'Income',
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           cubicInterpolationMode: 'monotone',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 2,
//           data: data.values, // Example data points
//           fill: true
//         }]
//       };
//     const ctx = document.getElementById('myChart').getContext('2d');
//     const incomeChart = new Chart(ctx, {
//         type: 'line',
//         data: incomeData,
//         options: chartOptions
//       });}
//       else if(tab == "expense"){
//         const outcomeData = {
//             labels: (data.dates).map(date => date.slice(-2)),
//             datasets: [{
//                 label: 'Outcome',
//                 backgroundColor: 'rgba(222, 51, 51, 0.2)',
//                 borderColor: 'rgba(222, 51, 51, 1)',
//                 cubicInterpolationMode: 'monotone',
//                 borderWidth: 2,
//                 data: data.values, // Example data points
//                 fill: true
//               }]
//           };
//         const ctx2 = document.getElementById('outChart').getContext('2d');
//         const outChart = new Chart(ctx2, {
//             type: 'line',
//             data: outcomeData,
//             options: chartOptions
//           });
//       }

// }

// fetchFinanceData("income")
// fetchFinanceData("expense")


// function processFinanceData(data) {
//     const processedData = {};
//     data.forEach(item => {
//       const date = new Date(item.date).toISOString().split('T')[0]; // Extract the date part
//       if (!processedData[date]) {
//         processedData[date] = { date: date, totalValue: 0 };
//       }
//       processedData[date].totalValue += item.value;
//     });
//     // console.log(Object.values(processedData))
//     const dates = Object.keys(processedData);
//     const values = dates.map(date => processedData[date].totalValue);
//     // const values = Object.values(processedData);
//     return {dates, values}
//   }

// const incomeTab = document.querySelector(".income-detials-cover")
// const table1 = document.querySelector(".income-detials-cover table")
// const expenseTab = document.querySelector(".expense-detials-cover")
// const table2 = document.querySelector(".expense-detials-cover table")

// function viewIncomes(){
//   incomeTab.classList.add("active")
//   try {
//     fetch('/finance/income').then(response => response.json()).then(data => {
//       console.log(data)
//       if(data.length > 0){
//       data.forEach(element => {
//         table1.innerHTML += `<td>${element.name}</td>
//                              <td>${element.date.split("T")[0]}</td>
//                              <td>${element.value}</td>
//                              <td>${element.notes}</td>`
//       });
//     }
//     })
    
//   } catch (error) {
//     console.log(error)
//   }
// }  

// function viewExpenses(){
//   expenseTab.classList.add("active")
//   try {
//     fetch('/finance/expense').then(response => response.json()).then(data => {
//       console.log(data)
//       if(data.length > 0){
//       data.forEach(element => {
//         table2.innerHTML += `<td>${element.name}</td>
//                              <td>${element.date.split("T")[0]}</td>
//                              <td>${element.value}</td>
//                              <td>${element.notes}</td>`
//       });
//     }
//     })
    
//   } catch (error) {
//     console.log(error)
//   }
// }  
// function closeTab(event){
//   incomeTab.classList.remove("active")
//   expenseTab.classList.remove("active")
// }