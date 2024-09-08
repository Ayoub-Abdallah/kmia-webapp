document.querySelector('.add_student-cover').addEventListener('submit', (event) => handleAdd(event, "/students/add-student"));
document.querySelector('.add-income-cover').addEventListener('submit', (event) => handleAdd(event, "/finance/add-income"));
document.querySelector('.add-expenses-cover').addEventListener('submit', (event) => handleAdd(event, "/finance/add-expense"));



function handleAdd(event, endpoint){
  console.log("handled: " + endpoint)
  event.preventDefault();

    const formData = new FormData(event.target);
    
    const objectData = {};
    formData.forEach((value, key) => {
      objectData[key] = value;
    });
    objectData['date'] = new Date().toISOString().slice(0, 10);
  
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.status){
        document.querySelector(".success-message-cover h2").innerHTML = data.message
        document.querySelector(".success-message-cover").classList.add("active")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}




// function handleAddStudent(event){
//   console.log("handled... ")
//   event.preventDefault();

//     const formData = new FormData(event.target);
    
//     const studentData = {};
//     formData.forEach((value, key) => {
//       studentData[key] = value;
//     });

//     // console.log(studentData);!

//     fetch('/students/add-student', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(studentData)
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }
