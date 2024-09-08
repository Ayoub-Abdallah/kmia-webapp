const tab1 = document.querySelector(".add_student-cover")
const tab2 = document.querySelector(".edit_student-cover")
const tab3 = document.querySelector(".delete_student")

let selected = []

const tabList = [tab1, tab2, tab3]

function activateTab(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    tabList[num].classList.add("active")
}

function deactivateTabs(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
}

  
const firstname = document.querySelector('.edit_student-cover .fname')
const lastname = document.querySelector('.edit_student-cover .lname')
const phone = document.querySelector('.edit_student-cover .phone')
const email = document.querySelector('.edit_student-cover .email')
const password = document.querySelector('.edit_student-cover .password')
const roles = document.querySelector('.edit_student-cover .roles')



function editTeacher(){
  if(selected.length != 1) return
  activateTab(1)
  try{
    fetch('/admins/'+ selected[0]).then(response => response.json()).then(data => {
      console.log(data)
      firstname.value = data[0].firstname
      lastname.value = data[0].lastname
      phone.value = data[0].phone
      email.value = data[0].email
      password.value = data[0].password
      roles.value = data[0].roles
    })
  }catch(err){
    console.error(err)
  }
 
}
//============================================================================
tab1.addEventListener('submit', handleAddStudent);

function handleAddStudent(event){
  console.log("handled... ")
  event.preventDefault();

    const formData = new FormData(event.target);
    
    const studentData = {};
    formData.forEach((value, key) => {
      studentData[key] = value;
    });

    // console.log(studentData);!

    fetch('/admins/add-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
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

function refresh(){
  presenceStudent = ''
  window.location.href = '/admins';
}

function check(event, id) {
  event.target.classList.toggle("active")
  const index = selected.indexOf(id);
  if (index !== -1) {
      // ID exists, remove it
      selected.splice(index, 1);
  } else {
      // ID does not exist, add it
      selected.push(id);
  }
  console.log("admins selected: ");
  console.log( selected);
}

function handleEdit(){
  console.log("handled: ")
  // event.preventDefault();

    // const formData = new FormData(event.target);
    
    const objectData = {
        firstname : firstname.value,
        lastname : lastname.value,
        phone : phone.value,
        email : email.value,
        password : password.value,
        roles : roles.value
    };
    
console.log(objectData)
  
    fetch("/admins/edit/" + selected[0], {
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



function deleteTeacher(){
  if(selected.length != 1) return
  activateTab(2)
}
async function handleDelete(){
  fetch( "/admins/" + selected[0], { method: 'delete' } ).then(response => response.json())
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
