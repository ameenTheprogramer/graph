document.addEventListener("DOMContentLoaded", function() {
  let earningsData = JSON.parse(localStorage.getItem('earningsData')) || [];

  function updateGraph() {
    document.getElementById('chartContainer').innerHTML = '';

    const ctx = document.createElement('canvas');
    document.getElementById('chartContainer').appendChild(ctx);
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: earningsData.map(data => data.date),
        datasets: [{
          label: 'Earnings',
          data: earningsData.map(data => data.amount),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  function saveEarnings(date, amount) {
    earningsData.push({ date, amount });
    localStorage.setItem('earningsData', JSON.stringify(earningsData));
    updateGraph();
  }

  // Handle form submission
  document.getElementById('earningsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const earningAmount = parseFloat(document.getElementById('earningAmount').value);
    if (!isNaN(earningAmount)) {
      const today = new Date();
      saveEarnings(today, earningAmount);
      document.getElementById('earningAmount').value = ''; // Clear input field after submission
    } else {
      alert('Please enter a valid number for earnings.');
    }
  });

  updateGraph();
});
