// Data for the pie chart (example data)
const pieData = {
    labels: ['Outcome', 'Income'],
    datasets: [{
      label: 'My Pie Chart',
      data: [7, 45], // Example data values
      backgroundColor: [
        'rgba(222, 51, 51, 0.6)',
        'rgba(33, 100, 189, 0.6)',
      ],
      borderColor: [
        'rgba(222, 51, 51, 1)',
        'rgba(33, 100, 189, 1)',
      ],
      borderWidth: 1
    }]
  };
  // Configuration options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2); // Format tooltip label
          }
        }
      }
    }
  };
  // Get the canvas element
  const ctx5 = document.getElementById('myPieChart').getContext('2d');
  
  // Create the pie chart instance
  const myPieChart = new Chart(ctx5, {
    type: 'pie',
    data: pieData,
    options: pieOptions
  });
  