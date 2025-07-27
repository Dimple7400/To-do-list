let to_do_form = document.getElementById("to-do-form");
let btn = document.getElementById("btn");
let btntext = btn.innerText;
    
let edit_id = null;
let userArray = [];
let objstr = localStorage.getItem("user");
if(objstr != null){
    userArray = JSON.parse(objstr)
}

displayInfo(userArray);
to_do_form.addEventListener("submit",(e)=>{
e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let city = document.getElementById("city").value.trim();
    

    if (name === "" || age === "" || city === "") {
        alert("Please fill all fields");
        return;
    }

    if(edit_id != null){
        userArray.splice(edit_id,1,{'name' : name,'age' : age,'city' : city});
    }
    else{
        userArray.push({'name' : name,'age' : age,'city' : city})
    }
    saveInfo()
    displayInfo(userArray);

    to_do_form.reset()
});

function saveInfo(){
    let str = JSON.stringify(userArray);
    localStorage.setItem("user", str)
    btn.innerText = btntext;
    displayInfo(userArray);
}

function displayInfo(userArray){
    let tableData = document.getElementById("tableData");
    let statement = "";
    userArray.forEach((item,index) => {
        statement += `<tr>
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.city}</td>
                    <td class="tableBtn"><button class="editBtn" onclick="EditInfo(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="deleteBtn" onclick="DeleteInfo(${index})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>`;
        
    });
tableData.innerHTML = statement;
}

function EditInfo(id){
    edit_id = id;
    username = document.getElementById("name");
    username.value = userArray[id].name;
    age.value = userArray[id].age;
    city.value = userArray[id].city;
    btn.innerHTML = "save Changes";
    
}

function DeleteInfo(id){
    userArray.splice(id,1)
    saveInfo();
    displayInfo(userArray);
}