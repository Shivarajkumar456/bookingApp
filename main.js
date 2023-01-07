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
        axios.post("https://crudcrud.com/api/69555cc51d6f479c9004d1f601d7d4f1/bookingData", myObj)
        .then((res)=>console.log(res)).catch(err => console.log(err));
        // console.log(myObjDeserialize);
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}

// function removeItem(e){
//     if(e.target.classList.contains('delete')){
//       if(confirm('Are You Sure?')){
//         var li = e.target.parentElement;
//         userList.removeChild(li);
//         let email = li.textContent.split(" - ")[1];
//       // Remove the user from local storage
//       localStorage.removeItem(email);
//       }
//     }
//   }
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      // Get the list item element and the email of the user
      let li = e.target.parentElement;
      let id = li.getAttribute('data-id');
      // Make an HTTP DELETE request to the API with the user's email
      axios.delete(`https://crudcrud.com/api/69555cc51d6f479c9004d1f601d7d4f1/bookingData/${id}`)
        .then(res => {
          // Remove the list item from the user list
          userList.removeChild(li);
        }).catch(err => console.log(err));
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

  function showUserList() {
    axios.get("https://crudcrud.com/api/69555cc51d6f479c9004d1f601d7d4f1/bookingData")
      .then(res => {
        // Iterate through the list of users
        for (let i = 0; i < res.data.length; i++) {
          const user = res.data[i];
          // Create a new list item for each user
          const li = document.createElement('li');
          li.setAttribute('data-id', user._id);
          li.appendChild(document.createTextNode(`${user.name} - ${user.email} - ${user.phone}`));
          // Create Delete button
          let delBtn = document.createElement('button');
          delBtn.className = 'float-right delete';
          delBtn.appendChild(document.createTextNode('Delete'));
          // Create Edit button
          let editBtn = document.createElement('button');
          editBtn.className = 'float-right edit';
          editBtn.appendChild(document.createTextNode('Edit'));
          li.appendChild(editBtn);
          li.appendChild(delBtn);
          // Add the list item to the user list
          userList.appendChild(li);
        }
      }).catch(err => console.log(err));
  }
  