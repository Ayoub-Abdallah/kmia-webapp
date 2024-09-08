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


function editGroup(){
  if(selected.length != 1) return
  activateTab(1)
  try{
    fetch('/groups/'+ selected[0]).then(response => response.json()).then(data => {
      console.log(data)
      groupName.value = data[0].name
      teachers.value = data[0].teachers[0]
      schoolYear.value = data[0].schoolyear
      notes.innerHTML = data[0].notes
    })
  }catch(err){
    console.error(err)
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
