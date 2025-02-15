document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('courseForm');
    const days = document.querySelectorAll('.day');
    const scheduleTableContainer = document.querySelector('#scheduleTableContainer');

    try{
        fetch('/groups/get').then(response => response.json()).then(data => {
          console.log(data)
          document.querySelector(".groups-select").innerHTML = `<option value="">Selectionner un groupe</option>`
          data.forEach(group => {
            document.querySelector(".groups-select").innerHTML += ` 
              <option value="${group._id}">${group.name}</option>`
          });
        })
      }catch(err){
        console.error(err)
      }
    

    let selectedDays = [];

    // Function to update day status based on selected sessions
    function updateDayStatus() {
        const sessionsPerWeek = parseInt(document.getElementById('sessions').value);
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
    const btn = document.querySelector(".calc-sessions-btn")
    btn.addEventListener('click', (e) => {
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
        tableHTML += '</table> <button type="submit" onclick="submitSch()" class="save-schedual">Enregistrer</button>';

        scheduleTableContainer.innerHTML = tableHTML;
    });
    

    // Function to submit the schedule
    submitSch = async (e) => {
        const formData = {};
        for (let element of form.elements) {
            // Check if the element has a name attribute and it's not the submit button
            if (element.name && element.type !== 'button') {
                // Add the element's name and value to the formData object
                formData[element.name] = element.value;
            }
        }
        formData.selectedDays = selectedDays;
        // Log the collected data (for demonstration purposes)
        console.log(formData);
    
        // Here you can send the formData to a server using fetch, XMLHttpRequest, etc.
        // Example using fetch:
        fetch('/sessions/save-schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // Listen to number of sessions change
    document.getElementById('sessions').addEventListener('change', () => {
        selectedDays = []; // Reset selected days when session number changes
        days.forEach(day => {
            day.classList.remove('selected', 'inactive');
            day.style.pointerEvents = 'auto';  // Re-enable click events
        });
        updateDayStatus();
    });
});
