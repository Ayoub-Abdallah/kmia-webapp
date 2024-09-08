const tab1 = document.querySelector(".add-expenses-cover")
const tab2 = document.querySelector(".updateClass")
const tab3 = document.querySelector(".deleteClass")

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
//======================================================================
tab1.addEventListener('submit', handleAddClassroom);

function handleAddClassroom(event){
  console.log("handled... ")
  event.preventDefault();

    const formData = new FormData(event.target);
    
    const classroomData = {};
    formData.forEach((value, key) => {
        classroomData[key] = value;
    });

    // console.log(studentData);!

    fetch('/classrooms/add-classroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classroomData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
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
  console.log("selected classrooms");
  console.log(selected);
}

const className = document.querySelector('.className')
const notes = document.querySelector('.notes')

function editClassroom(){
  if(selected.length != 1) return
  activateTab(1)
  try{
    fetch('/classrooms/'+ selected[0]).then(response => response.json()).then(data => {
      console.log(data)
      className.value = data[0].name
      notes.value = data[0].notes
      
    })
  }catch(err){
    console.error(err)
  }
 
}

function handleEdit(){
  console.log("handled: ")
    const objectData = {
      name: className.value,
      notes : notes.value
    };
    
console.log(objectData)
  
    fetch("/classrooms/edit/" + selected[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function deleteClass(){
  if(selected.length != 1) return
  activateTab(2)
}
async function handleDelete(){
  fetch( "/classrooms/" + selected[0], { method: 'delete' } )
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
