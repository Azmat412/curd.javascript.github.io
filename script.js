var selectedRow = null;

// show alert
function showAlert(message, className){
    const div = document.g("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 1000);
}

// Add Data
function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Get form value
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;

    // Validate
    if(name == "" || email == "" || phone == ""){
        showAlert("Please fill all given field", "danger");
    }else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        }else{
            selectedRow.children[0] = name;
            selectedRow.children[1] = email;
            selectedRow.children[2] = phone;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#name').value = selectedRow.children[0].textContent;
        document.querySelector('#email').value = selectedRow.children[1].textContent;
        document.querySelector('#phone').value = selectedRow.children[2].textContent;
    }
});

// Deleate Data
document.querySelector('#student-list').addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});