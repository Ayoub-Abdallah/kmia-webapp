const tab1 = document.querySelector(".add_student-cover")
const tab2 = document.querySelector(".add-promo-student-cover")
const tab3 = document.querySelector(".add-promo-teacher-cover")
const tab4 = document.querySelector(".add-income-cover")
const tab5 = document.querySelector(".add-expenses-cover")

const tabList = [tab1, tab2, tab3, tab4, tab5]

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
}

function deactivateTabs(){
    tabList.forEach(tab => {
        tab.classList.remove("active")
    });
}
function refresh(){
    presenceStudent = ''
    window.location.href = '/admin';
  
}