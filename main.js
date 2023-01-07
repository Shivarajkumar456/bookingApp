const btn = document.querySelector('.btn');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const userList = document.querySelector('#users');

btn.addEventListener('click', onSubmit);
userList.addEventListener('click', removeItem);
userList.addEventListener('click', editItem);
window.addEventListener('load', showUserList);

function onSubmit(e) {
    e.preventDefault();
    if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = "Please enter all fields";
        setTimeout(() => msg.remove(), 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} - ${emailInput.value} - ${phoneInput.value}`));
        // lcreate Delete button
        let delBtn = document.createElement('button');
        delBtn.className = 'float-right delete';
        delBtn.appendChild(document.createTextNode('Delete'));
        // create edit button
        let editBtn = document.createElement('button');
        editBtn.className = 'float-right edit';
        editBtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        userList.appendChild(li);
        let myObj = {name: nameInput.value, email: emailInput.value, phone:phoneInput.value};
        // let myObjString = JSON.stringify(myObj);
        // localStorage.setItem(emailInput.value, myObjString);
        // let myObjDeserialize = JSON.parse(localStorage.getItem(emailInput.value));
        axios.post("https://crudcrud.com/api/69555cc51d6f479c9004d1f601d7d4f1/bookingData", myObj);
        // console.log(myObjDeserialize);
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        userList.removeChild(li);
        let email = li.textContent.split(" - ")[1];
      // Remove the user from local storage
      localStorage.removeItem(email);
      }
    }
  }

  function editItem(e) {
    let li = e.target.parentElement;
    let userData = li.textContent.split(" - ");
    nameInput.value = userData[0];
    emailInput.value = userData[1];
    phoneInput.value = userData[2];
    // Remove the list item from the list
    userList.removeChild(li);
    // Update the local storage
    localStorage.removeItem(emailInput.value);
  }