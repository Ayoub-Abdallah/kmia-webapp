const tab1 = document.querySelector(".add-expenses-cover")
const tab2 = document.querySelector(".editGroup")
const tab3 = document.querySelector(".deleteGroup")

let selected = []
const tabList = [tab1, tab2, tab3]

const groupName = document.querySelector(".groupName")
const schoolYear = document.querySelector(".schoolYear")
const teachers = document.querySelector(".teachers")
const notes = document.querySelector(".notes")


function activateTab(num){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    tabList[num].classList.add("active")
    if(num == 0){
      try{
        fetch('/teachers/get').then(response => response.json()).then(data => {
          console.log(data)
          document.querySelector(".add-group-teacher-select").innerHTML = `<option value="">Selectionner un Enseignant</option>`
          data.forEach(teacher => {
            document.querySelector(".add-group-teacher-select").innerHTML += ` 
               <option value="${teacher._id}" data-id="${teacher._id}">${teacher.firstname + " " + teacher.lastname }</option>`
          });
        })
      }catch(err){
        console.error(err)
      }
    }
    else if(num == 1){
      try{
        fetch('/teachers/get').then(response => response.json()).then(data => {
          console.log(data)
          // document.querySelector(".edit-student-group-select").innerHTML = `<option value="">Selectionner un Enseignant</option>`
          document.querySelector(".edit-group-teacher-select").innerHTML = `<option value="">Selectionner un Enseignant</option>`
          data.forEach(teacher => {
            document.querySelector(".edit-group-teacher-select").innerHTML += ` 
              <option value="${teacher._id}" data-id="${teacher._id}">${teacher.firstname + " " + teacher.lastname }</option>`
          });
        })
      }catch(err){
        console.error(err)
      }
}
}

function deactivateTabs(num){
    console.log("heheheheheee")
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
    window.location.href = '/groups';

}
//======================================================================
tab1.addEventListener('submit', handleAddGroup);

function handleAddGroup(event){
  console.log("handled... ")
  event.preventDefault();

    const formData = new FormData(event.target);
    
    const groupData = {};
    formData.forEach((value, key) => {
        if(groupData[key] == "teachers"){
            groupData[key] = [value];
            
        }else{
            groupData[key] = value;
        }
    });

    // console.log(studentData);!

    fetch('/groups/add-group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(groupData)
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
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
  console.log("groups selected: ");
  console.log( selected);
}


async function editGroup(){
  if(selected.length != 1) return
  activateTab(1)
  try {
    // Fetch group data
    const groupResponse = await fetch(`/groups/${selected[0]}`);
    if (!groupResponse.ok) throw new Error('Failed to fetch group');
    
    const groupData = await groupResponse.json();
    if (!groupData.length) throw new Error('Group not found');
  
    const group = groupData[0];
    
    // Update group info
    groupName.value = group.name;
    schoolYear.value = group.schoolyear;
    notes.innerHTML = group.notes;
  
    // Handle teachers
    if (group.teachers?.length) {
      const teacherId = group.teachers[0];
      
      // Fetch teacher data
      const teacherResponse = await fetch(`/teachers/${teacherId}`);
      if (!teacherResponse.ok) throw new Error('Failed to fetch teacher');
      
      const teacherData = await teacherResponse.json();
      if (teacherData.length) {
        const teacher = teacherData[0];
        document.querySelector(".current-teacher").textContent = 
          `${teacher.firstname} ${teacher.lastname}`;
        teachers.value = teacherId;
      } else {
        console.warn('Teacher not found');
        document.querySelector(".current-teacher").textContent = 'No teacher assigned';
      }
    } else {
      document.querySelector(".current-teacher").textContent = 'No teacher assigned';
    }
  
  } catch (err) {
    console.error('Error:', err);
    // Show error to user
    alert('Failed to load group data. Please try again.');
  }
 
}
tab2.addEventListener("submit", (event) =>{
  handleEdit()
})
function handleEdit(){
  console.log("handled: ")
    const objectData = {
      name : groupName.value,
      teachers : [teachers.value],
      schoolyear : schoolYear.value,
      notes : notes.value,
    };
    
console.log(objectData)
  
    fetch("/groups/edit/" + selected[0], {
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
      // console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
function deleteGroup(){
  if(selected.length != 1) return
  activateTab(2)
}
async function handleDelete(){
  fetch( "/groups/" + selected[0], { method: 'delete' } )
  .then(response => response.json())
  .then(data => {
    // console.log('Success:', data);
    if(data.status){
      document.querySelector(".success-message-cover h2").innerHTML = data.message
      document.querySelector(".success-message-cover").classList.add("active")
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}
