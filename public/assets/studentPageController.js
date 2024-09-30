const tab1 = document.querySelector(".add_student-cover")
const tab2 = document.querySelector(".edit_student-cover")
const tab3 = document.querySelector(".delete_student")
const tab4 = document.querySelector(".presence-cover")
const tab5 = document.querySelector(".add-presence-cover")
let tab6 = document.querySelector(".payment-cover")
let tab7 = document.querySelector(".add-payment-cover")
let tab8 = document.querySelector(".success-message-cover")
let tab9 = document.querySelector(".certification-cover")

let selectedTags = [];

let firstName = document.querySelector(".presenceFirstName")
let paymentFirstName = document.querySelector(".paymentFirstName")
let paymentLastName = document.querySelector(".paymentLastName")
let lastName = document.querySelector(".presenceLastName")
let presenceTable = document.querySelector(".presenceTable")
let presenceSelect = document.querySelector(".presenceSelect")
let paymentSelect = document.querySelector(".paymentSelect")
let paymentTable = document.querySelector(".paymentTable")



const editBtn = document.querySelector(".editBtn").addEventListener("click", (e)=>{
  editStudent()
})
const addPresenceBtn = document.querySelector(".add-presence").addEventListener("click", (e)=>{
  addPresence()
})
const tabList = [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9]

let selected = []
let presenceStudent = ""

function activateTab(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    tabList[num].classList.add("active")
    if(num == 0){
      try{
        fetch('/groups/get').then(response => response.json()).then(data => {
          console.log(data)
          document.querySelector(".add-student-group-select").innerHTML = `<option value="">Selectionner un groupe</option>`
          data.forEach(group => {
            document.querySelector(".add-student-group-select").innerHTML += ` 
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

function deactivateTabs(){
  
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    

}
function refresh(){
  presenceStudent = ''
  window.location.href = '/students';
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
    console.log(selected);
  }
  
  async function exportExcel() {
    const table = document.getElementById('dataTable');
    console.log('selected are: ')
    console.log(selected)
    if (selected.length === 0) {
      console.log("No rows selected to export.");
      return;
    }
  
    try {
      const response = await fetch('/students/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selected)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      // Assuming the server responds with a Blob (Excel file)
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

  
const firstname = document.querySelector('.edit_student-cover .fname')
const lastname = document.querySelector('.edit_student-cover .lname')
const birthdate = document.querySelector('.edit_student-cover .bd')
const birthplace = document.querySelector('.edit_student-cover .bp')
const parents = document.querySelector('.edit_student-cover .parents')
const sex = document.querySelector('.edit_student-cover .sex')
const phone = document.querySelector('.edit_student-cover .phone')
const email = document.querySelector('.edit_student-cover .email')
const mobile1 = document.querySelector('.edit_student-cover .mobile1')
const mobile2 = document.querySelector('.edit_student-cover .mobile2')
const group = document.querySelector('.edit_student-cover .edit-student-group-select')
const schoolYear = document.querySelector('.edit_student-cover .schoolYear')
const dateInsc = document.querySelector('.edit_student-cover .dateInsc')
const physicalproblem = document.querySelector('.edit_student-cover .phP')
const mentalproblems = document.querySelector('.edit_student-cover .mnP')
const notes = document.querySelector('.edit_student-cover .notes')



function editStudent(){
  if(selected.length != 1) return
  activateTab(1)
  try{
    console.log("selectedTags")
    console.log(selectedTags)

    fetch('/students/'+ selected[0]).then(response => response.json()).then(data => {
      console.log(data)
      firstname.value = data[0].firstname
      lastname.value = data[0].lastname
      birthdate.value = data[0].birthdate
      birthplace.value = data[0].birthplace
      parents.value = data[0].parents
      sex.value = data[0].sex
      phone.value = data[0].phone
      email.value = data[0].email
      mobile1.value = data[0].mobile1
      mobile2.value = data[0].mobile2
      // group.value = data[0].group[0]
      console.log("groups of student")
      schoolYear.value = data[0].schoolyear
      dateInsc.value = data[0].inscriptiondate
      physicalproblem.value = data[0].physicalproblem
      mentalproblems.value = data[0].mentalproblems
      notes.value = data[0].notes
      console.log(data[0].group)

      fetch('/students/groups/'+ selected[0]).then(async response => response.json()).then(async data => {
        // console.log(data)
        // paymentFirstName.innerHTML = "Prénom: " + data.student.firstname
        // paymentLastName.innerHTML = "Nom: " + data.student.lastname
        // paymentSelect.innerHTML = `<option value="">Choose group</option>`
        // data.groups.forEach(element => {
        //   const option = document.createElement('option')
        //   option.value = element._id
        //   option.text = element.name
        //   paymentSelect.appendChild(option)
        // });
        console.log(data.groups)

      //   if (selectedTag == "") {
      //     alert('You have to choose a tag.');
      //     return;
      // }
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



// document.querySelector('.edit_student-cover').addEventListener('submit', (event) => handleAdd(event));
document.querySelector('.editStudentForm').addEventListener('submit', (event) => handleEditStudent(event));

function handleEditStudent(event){
  console.log("handled: ")
  event.preventDefault();

    // const formData = new FormData(event.target);
    
    const objectData = {
      firstname : firstname.value, 
      lastname : lastname.value, 
      birthdate : birthdate.value, 
      birthplace : birthplace.value, 
      parents : parents.value, 
      sex : sex.value, 
      phone : phone.value, 
      email : email.value, 
      mobile1 : mobile1.value, 
      mobile2 : mobile2.value, 
      group : selectedTags, 
      schoolyear : schoolYear.value, 
      inscriptiondate : dateInsc.value, 
      physicalproblem : physicalproblem.value, 
      mentalproblems : mentalproblems.value, 
      notes : notes.value
    };
    
console.log(objectData)
  
    fetch("/students/edit/" + selected[0], {
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


function deleteStudent(){
  if(selected.length != 1) return
  activateTab(2)
}
async function handleDelete(){
  fetch( "/students/" + selected[0], { method: 'delete' } )
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

async function setPresence(id){
  activateTab(3)
  presenceStudent = id
  try {
    fetch('/students/groups/'+ presenceStudent).then(async response => response.json()).then(async data => {
      console.log(data)
      firstName.innerHTML = "Prénom: " + data.student.firstname
      lastName.innerHTML = "Nom: " + data.student.lastname

      presenceSelect.innerHTML = `<option value="">Choose group</option>`
      data.groups.forEach(element => {
        const option = document.createElement('option')
        option.value = element._id
        option.text = element.name
        presenceSelect.appendChild(option)
      });

      presenceTable.innerHTML = ``
      const fetchPromises = data.student.presence.map( async element => {
        return fetch(`/groups/${element.groupId}`).then(response => response.json());
      });
      const groupDataArray = await Promise.all(fetchPromises);
      const rows = data.student.presence.map((element, index) => {
        console.log(groupDataArray)
        // console.log(element)
        return `
          <tr key="${index}">
            <td>${groupDataArray[index][0].name}</td>
            <td>${new Date(element.date).toLocaleDateString()}</td>
            <td>${new Date(element.date).toLocaleTimeString()}</td>
          </tr>
        `;
      });
      presenceTable.innerHTML += rows.join('');
      // presenceTable.innerHTML += data.student.presence.map(element =>{
      //   fetch(`/groups/`+ element.groupId).then(response => response.json()).then(data => {
      //     return `
      //     <tr key="">
      //       <td>${data[0].name}</td>
      //       <td>${element.date}</td>
      //       <td>${element.time}</td>
      //     </tr>
      //     `
      //   })
       
      })
  } catch (error) {
  
  }
}
function addPresence(){
  activateTab(4)
}

document.querySelector(".add-presence-container").addEventListener('submit', async event => {
  event.preventDefault()
  const formData = new FormData(event.target);
    
    const objectData = {};
    formData.forEach((value, key) => {
      objectData[key] = value;
    });

    let studentPresnce = { _id : presenceStudent ,presenceData: objectData }

    try {
      fetch('/students/presence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentPresnce)
      }).then( res =>
        res.json()
      ).then(data =>{
        console.log(data)
        if(data.status){
          document.querySelector(".success-message-cover h2").innerHTML = data.message
          document.querySelector(".success-message-cover").classList.add("active")
        }
      })
      
    
    }catch(err){
      console.error(err)
    }
}
)
let paymentStudent = ""

function editPaiment(id){
  activateTab(5)
  paymentStudent = id

  try {
    fetch('/students/groups/'+ id).then(async response => response.json()).then(async data => {
      console.log(data)
      paymentFirstName.innerHTML = "Prénom: " + data.student.firstname
      paymentLastName.innerHTML = "Nom: " + data.student.lastname

      paymentSelect.innerHTML = `<option value="">Choose group</option>`
      data.groups.forEach(element => {
        const option = document.createElement('option')
        option.value = element._id
        option.text = element.name
        paymentSelect.appendChild(option)
      });

      paymentTable.innerHTML = ``
      const fetchPromises = data.student.payment.map( async element => {
        return fetch(`/groups/${element.groupId}`).then(response => response.json());
      });
      const groupDataArray = await Promise.all(fetchPromises);
      // console.log()
      console.log(data.student.payment)
      const rows = data.student.payment.map((element, index) => {
        console.log(groupDataArray)
        console.log(element)
        
        return `
          <span key="${index}" class="payment-details-card">
            <h3>Groupe: ${groupDataArray[index][0].name}</h3>
            <h3>Totale: ${element.total}</h3>
            <table>

            <th>Date</th>
            <th>Somme</th>
            
            ${
              
          element.payed.map((element, index) => {
          return `<tr key="${index}">
              <td>${new Date(element.date).toLocaleDateString()}</td>
              <td>${element.value}</td>
            </tr>`
        })

            }</table>
          </span>
        `;
      });
      // <td>$ {new Date(element.date).toLocaleDateString()}</td>
      //       <td>$ {element.value}</td>
      //       <td>$ {element.total}mùù</td>
      //       <td>$ {element.total}</td>
      //     </tr>
      paymentTable.innerHTML += rows;
       
      })
  } catch (error) {
  
  }
}







  

function openForm(){
  activateTab(6)
  // console.log("setting/editting students paiments: " + id)
}

// document.querySelector(".add-payment-container").addEventListener( "submit" , async event => {
//   event.preventDefault()
//   const formData = new FormData(event.target);
  
//     const objectData = {};
//     formData.forEach((value, key) => {
//       objectData[key] = value;
//     });

//     let studentPayment = { _id : paymentStudent ,paymentData: objectData }

//     try {
//       fetch('/students/payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(studentPayment)
//       }).then(res => res.json()).then(data =>{
//         console.log(data)
//         if(data.status){
//           document.querySelector(".success-message-cover h2").innerHTML = data.message
//           document.querySelector(".success-message-cover").classList.add("active")
//         }
//       })
      
    
//     }catch(err){
//       console.error(err)
//     }

// })
document.querySelector(".add-payment-container").addEventListener("submit", async event => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const objectData = {};
  formData.forEach((value, key) => {
    objectData[key] = value;
  });

  let studentPayment = { _id: paymentStudent, paymentData: objectData };

  try {
    const response = await fetch('/students/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentPayment)
    });

    // If payment was successful, the response should contain a file for download
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payment_proof_${paymentStudent}.docx`; // Set the filename
      document.body.appendChild(a);
      a.click(); // Trigger the download
      a.remove(); // Clean up after download

      // Display success message
      document.querySelector(".success-message-cover h2").innerHTML = "Payment successful! Proof document downloaded.";
      document.querySelector(".success-message-cover").classList.add("active");
    }

  } catch (err) {
    console.error('Error processing payment:', err);
  }
});


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

  const url = `/search/students?${queryParams.toString()}`;

  // fetch(url)
  fetch(url).then(async response => response.json()).then(async students => {
    // console.log(students)
    console.log(studentsTable)
    studentsTable.innerHTML = `
       <tr>
                        <th></th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Sex</th>
                        <th>Année Scolaire</th>
                        <th>Téléphone</th>
                        <th>Groupes</th>
                        <!-- <th>Note</th> -->
                        <th>Frais (DZD)</th>
                        <th>Présence</th>
                        <th></th>
                    </tr>
    `
    students.forEach(student => {
      let groups = ''
      student.groups.map(element => {
        groups += element.name + " , "
      });
      studentsTable.innerHTML += `
          <tr>
                            <td>
                                <button class="checkBox" onclick="check(event, '${ student.student._id }') ">
                                    &#10003;
                                    <!-- &check; -->
                                </button>
                            </td>

                            <td>
                                ${ student.student.firstname }
                            </td>
                            <td>
                                ${ student.student.lastname }
                            </td>
                            <td>
                                ${ student.student.sex  }
                            </td>
                            <td>
                                ${ student.student.schoolyear }
                            </td>
                            <td>
                                ${ student.student.phone  }
                            </td>
                            <td>
                             ${ groups }
                            
                               
                            </td>
                           
                            <td onclick="editPaiment('${ student.student._id }')" class="paimentTD">
                               pay
                            </td>
                            <td>
                                <button onclick="setPresence('${ student.student._id }')">
                                    <span class=" material-icons">calendar_month</span>
                                </button>
                            </td>
                            <td>
                               ${ (student.student.inscription)? `
                                    <span class="material-icons dot green" 
                                    onclick="unsetInscription(${ student.student._id })"
                                    >circle</span>`
                                  :`
                                    <span class="material-icons dot red"
                                    onclick="setInscription(${ student.student._id})"
                                    >circle</span>`
                            }
                            </td>
                        </tr>
      `
    });
  })
}) 












///////////////////////////////////////////////////////////////////////////////////////////
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
function setInscription(id) {
  try {
    fetch('/students/inscription/' + id + '?download=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = res.headers.get('Content-Type');

      if (contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        // Handle file download
        return res.blob().then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `proof_of_subscription_${id}.docx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);

          // Display success message after the download
          document.querySelector(".success-message-cover h2").innerHTML = "Subscription successful! Proof document downloaded.";
          document.querySelector(".success-message-cover").classList.add("active");
        });
      } else if (contentType.includes('application/json')) {
        // Handle JSON response
        return res.json().then(data => {
          console.log(data);
          if (data.status) {
            document.querySelector(".success-message-cover h2").innerHTML = data.message;
            document.querySelector(".success-message-cover").classList.add("active");
          }
        });
      } else {
        throw new Error('Unexpected content type');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

function unsetInscription(id){
  try {
    fetch('/students/uninscription/' + id , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(studentPayment)
    }).then(res => res.json()).then(data =>{
      console.log(data)
      if(data.status){
        document.querySelector(".success-message-cover h2").innerHTML = data.message
        document.querySelector(".success-message-cover").classList.add("active")
      }
    })
  }catch(err){
    console.error(err)
  }
}
function showCertification(){
  if(selected.length == 0) return
  activateTab(8)
}


function handleCertification(event) {
  event.preventDefault(); // Prevent the default form submission
  
  const form = event.target;
  const formData = new FormData(form); // Create a FormData object with the form data
  console.log("selected are those : ")
  console.log(selected)
  formData.append('studentIds', JSON.stringify(selected));
  console.log(formData)
  fetch("/students/upload-template", {
      method: 'POST',
      body: formData, // Send the FormData object as the request body
  })
  .then(response => response.blob()) // Expect a binary response (e.g., file download)
  .then(blob => {
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students_filled.zip'; // Specify a default file name for the download
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
})
}
