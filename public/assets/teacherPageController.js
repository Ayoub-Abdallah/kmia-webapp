const tab1 = document.querySelector(".add_student-cover")
const tab2 = document.querySelector(".edit_student-cover")
const tab3 = document.querySelector(".delete_student")
const tab4 = document.querySelector(".teacher-payment-cover")
const tab5 = document.querySelector(".add-teacher-payment-cover")
let tab6 = document.querySelector(".success-message-cover")


let selectedTags = [];

let selected = []
let selectedTeacher = ""

const tabList = [tab1, tab2, tab3, tab4, tab5, tab6]

function activateTab(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    tabList[num].classList.add("active")

    if(num == 0){
      try{
        fetch('/groups/get').then(response => response.json()).then(data => {
          console.log(data)
          document.querySelector(".add-teacher-group-select").innerHTML = `<option value="">Selectionner un groupe</option>`
          data.forEach(group => {
            document.querySelector(".add-teacher-group-select").innerHTML += ` 
              <option value="${group._id}">${group.name}</option>`
          });
        })
      }catch(err){
        console.error(err)
      }
    }
    else if(num == 1){
      try{
        fetch('/groups/get').then(response => response.json()).then(data => {
          console.log(data)
          // document.querySelector(".edit-student-group-select").innerHTML = `<option value="">Selectionner un groupe</option>`
          document.querySelector(".edit-student-group-select").innerHTML = ``
          data.forEach(group => {
            document.querySelector(".edit-student-group-select").innerHTML += ` 
              <option value="${group.name}" data-id="${group._id}">${group.name}</option>`
          });
        })
      }catch(err){
        console.error(err)
      }
    }
}

function deactivateTabs(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
}
function refresh(){
  presenceStudent = ''
  window.location.href = '/teachers';
}

  
const firstname = document.querySelector('.edit_student-cover .fname')
const lastname = document.querySelector('.edit_student-cover .lname')
const birthdate = document.querySelector('.edit_student-cover .bd')
const birthplace = document.querySelector('.edit_student-cover .bp')
// const parents = document.querySelector('.edit_student-cover .parents')
const sex = document.querySelector('.edit_student-cover .sex')
const phone = document.querySelector('.edit_student-cover .phone')
const email = document.querySelector('.edit_student-cover .email')
const mobile1 = document.querySelector('.edit_student-cover .mobile1')
const mobile2 = document.querySelector('.edit_student-cover .mobile2')
const group = document.querySelector('.edit_student-cover .group')
// const schoolYear = document.querySelector('.edit_student-cover .schoolYear')
const dateInsc = document.querySelector('.edit_student-cover .dateInsc')
const physicalproblem = document.querySelector('.edit_student-cover .phP')
const mentalproblems = document.querySelector('.edit_student-cover .mnP')
const notes = document.querySelector('.edit_student-cover .notes')



function editTeacher(){
  if(selected.length != 1) return
  activateTab(1)
  try{
    fetch('/teachers/'+ selected[0]).then(response => response.json()).then(data => {
      console.log(data)
      firstname.value = data[0].firstname
      lastname.value = data[0].lastname
      birthdate.value = data[0].birthdate
      birthplace.value = data[0].birthplace
      // parents.value = data[0].parents
      sex.value = data[0].sex
      phone.value = data[0].phone
      email.value = data[0].email
      mobile1.value = data[0].mobile1
      mobile2.value = data[0].mobile2
      // group.value = data[0].group
      // schoolYear.value = data[0].schoolyear
      dateInsc.value = data[0].inscriptiondate
      physicalproblem.value = data[0].physicalproblem
      mentalproblems.value = data[0].mentalproblems
      notes.value = data[0].notes


      fetch('/teachers/groups/'+ selected[0]).then(async response => response.json()).then(async data => {
        console.log(data.groups)
      if (selectedTags.find(tag => tag.id === element._id)) return
      data.groups.forEach(element => {
        const newTag = document.createElement('div');
        newTag.className = 'tag';
        newTag.textContent = element.name;
        newTag.dataset.id = element._id;
        newTag.addEventListener('click', function() {
        newTag.remove();
        selectedTags = selectedTags.filter(tag => tag !== element._id);
        });
    
        // Append the new tag to the tags container
        document.getElementById('tagsContainer').appendChild(newTag);
    
        // Add the selected tag to the array
        // selectedTags.push({ id: element._id, name: element.name });
        selectedTags.push(element._id);
        });

      })





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

    fetch('/teachers/add-teacher', {
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
  console.log("teachers selected: ");
  console.log( selected);
}

function handleEdit(){
  console.log("handled: ")
  // event.preventDefault();

    // const formData = new FormData(event.target);
    
    const objectData = {
      firstname : firstname.value, 
      lastname : lastname.value, 
      birthdate : birthdate.value, 
      birthplace : birthplace.value, 
      // parents : parents.value, 
      sex : sex.value, 
      phone : phone.value, 
      email : email.value, 
      mobile1 : mobile1.value, 
      mobile2 : mobile2.value, 
      // group : group.value, 
      group : selectedTags, 
      // schoolyear : schoolYear.value, 
      inscriptiondate : dateInsc.value, 
      physicalproblem : physicalproblem.value, 
      mentalproblems : mentalproblems.value, 
      notes : notes.value
    };
    
console.log(objectData)
  
    fetch("/teachers/edit/" + selected[0], {
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
  fetch( "/teachers/" + selected[0], { method: 'delete' } )
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

function findNameById(id, namesTable) {
  const foundObject = namesTable.find(obj => obj._id === id);
  return foundObject ? foundObject.name : 'Name not found';
}

function teacherPayment(id){
  console.log("teacher's payment " + id)
  selectedTeacher = id
  activateTab(3)
 
  try{
    fetch('/teachers/groups/' + selectedTeacher).then(response => response.json()).then(data => {
      const groups = data.groups
      data = [data.teacher]
      // console.log(data[0])
      document.querySelector(".teacher-payment-container .fname").innerHTML = "Prénom: " + data[0].firstname
      document.querySelector(".teacher-payment-container .lname").innerHTML = "Nom: " + data[0].lastname
      // document.querySelector(".teacher-payment-container .salarydate").innerHTML = data[0].salarydate
      let table = document.querySelector(".teacher-payment-container .salariesDetails")
      table.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Groupe</th>
        <th>modalités de paiement</th>
        <th>Versement</th>
      </tr>`

      data[0].salary.forEach(sal => {
        table.innerHTML += 
        `<tr>
            <td>${sal.date.slice(0, 10).replace('T', ' ')}</td>
            <td>${findNameById(sal.groupId, groups)}</td>
            <td>${sal.paymentType}</td>
            <td>${sal.amount}</td>
          </tr>`
      });
      let tpgs = document.querySelector("#teacherPaymentGroupSelect")
      tpgs.innerHTML = ``
      console.log("data.groups: ------->")
      console.log(data)
      groups.forEach(group => {
        tpgs.innerHTML += 
        `<option value="${group._id}">${group.name}</option>`
      });

    })
  }catch(err){
    console.error(err)
}}

function addTeacherPayment(){
  console.log("teacher's payment ")
  activateTab(4)
}
// function handlePayment(event){
//   event.preventDefault()
//   const formData = new FormData(event.target);
    
//   const studentData = {_id: selectedTeacher};
//   formData.forEach((value, key) => {
//     studentData[key] = value;
//   });

//   // console.log(studentData);!

//   fetch('/teachers/add-payment', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(studentData)
//   })
//   .then(response => response.json())
//   .then(data => {
//     if(data.status){
//       document.querySelector(".success-message-cover h2").innerHTML = data.message
//       document.querySelector(".success-message-cover").classList.add("active")
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
// }

//  Excel Exporting  ///////////////////////////////////////////////////////////////////////


async function exportExcel() {
  const table = document.getElementById('dataTable');
  if (selected.length === 0) {
    console.log("No rows selected to export.");
    return;
  }
  try {
    const response = await fetch('/teachers/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selected)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_rows.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////

const searchBtn = document.querySelector('.searchbutton')
const categorySlct = document.getElementById('category-select')
const searchInpt = document.getElementById('search-input')
const studentsTable = document.querySelector('.studentsTable tbody')

searchBtn.addEventListener( "click" , event =>{
  // event.preventDefault()
  const category = categorySlct.value
  const input = searchInpt.value.trim()
  if (input == "") return
  const queryParams = new URLSearchParams({
    category: category,
    query: input
  });

  const url = `/search/teachers?${queryParams.toString()}`;

  // fetch(url)
  fetch(url).then(async response => response.json()).then(async students => {
    console.log(students)
    console.log(studentsTable)
    studentsTable.innerHTML = `
                      <tr>
                        <th></th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Sexe</th>
                        <th>Téléphone</th>
                        <th>Groupes</th>
                        <th>Paiement</th>
                    </tr>
    `
    students.forEach(student => {
      // let groups = ''
      // student.groups.map(element => {
      //   groups += element.name + " , "
      // });
      studentsTable.innerHTML += `
          <tr>
                            <td>
                                <button class="checkBox" onclick="check(event, '${ student._id }') ">
                                    &#10003;
                                    <!-- &check; -->
                                </button>
                            </td>

                            <td>
                                ${ student.firstname }
                            </td>
                            <td>
                                ${ student.lastname }
                            </td>
                            <td>
                                ${ student.sex  }
                            </td>
                           
                            <td>
                                ${ student.phone  }
                            </td>
                            <td>
                             ${ student.groups }
                            
                               
                            </td>
                           
                            <td onclick="teacherPayment('${ student._id }')" class="paimentTD">
                               pay
                            </td>
                      
                        </tr>
      `
    });


  })

}) 


//////////////////////////////////////////////////////////////////////////////////////////
// Tagging system



document.getElementById('addTagButton').addEventListener('click', function() {
  const tagSelect = document.getElementById('tagSelect');
  const selectedTag = tagSelect.value;
  const selectedTagId = tagSelect.options[tagSelect.selectedIndex].getAttribute('data-id');
  // const selectedTagId = tagSelect.options[tagSelect.selectedIndex].value;

  // Check if the tag is already selected
  if (selectedTag == "") {
      alert('You have to choose a tag.');
      return;
  }
  if (selectedTags.find(tag => tag.id === selectedTagId)) {
      alert('This tag is already selected.');
      return;
  }

  // Create a new tag element
  const newTag = document.createElement('div');
  newTag.className = 'tag';
  newTag.textContent = selectedTag;
  newTag.dataset.id = selectedTagId;

  // Add event listener to remove the tag when clicked
  newTag.addEventListener('click', function() {
      newTag.remove();
      selectedTags = selectedTags.filter(tag => tag.id !== selectedTagId);
  });

  // Append the new tag to the tags container
  document.getElementById('tagsContainer').appendChild(newTag);

  // Add the selected tag to the array
  // selectedTags.push({ id: selectedTagId, name: selectedTag });
  selectedTags.push(selectedTagId);
});






//////////////////////////////////////////////////////////////////////////////



async function handlePayment(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const teacherData = { _id: selectedTeacher };  // Corrected variable name
  formData.forEach((value, key) => {
    teacherData[key] = value;
  });

  try {
    const response = await fetch('/teachers/add-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacherData)
    });

    if (response.ok) {
      // If the response is a file, handle it as a blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payment_proof_${selectedTeacher}.docx`; // Set the filename
      document.body.appendChild(a);
      a.click(); // Trigger the download
      a.remove(); // Clean up after download

      // Display success message
      document.querySelector(".success-message-cover h2").innerHTML = "Payment successful! Proof document downloaded.";
      document.querySelector(".success-message-cover").classList.add("active");
    } else {
      // Handle case where response is not OK
      const data = await response.json();
      console.error('Error:', data.message);
    }

  } catch (error) {
    console.error('Error processing payment:', error);
  }
}

document.querySelector(".add-payment-container").addEventListener("submit", handlePayment);
