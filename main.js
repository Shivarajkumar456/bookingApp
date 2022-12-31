const btn = document.querySelector('.btn');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const userList = document.querySelector('#users');

btn.addEventListener('click', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = "Please enter all fields";
        setTimeout(() => msg.remove(), 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} - ${emailInput.value} - ${phoneInput.value}`));
        userList.appendChild(li);
        let myObj = {name: nameInput.value, email: emailInput.value, phone:phoneInput.value};
        let myObjString = JSON.stringify(myObj);
        localStorage.setItem(emailInput.value, myObjString);
        let myObjDeserialize = JSON.parse(localStorage.getItem(emailInput.value));
        console.log(myObjDeserialize);
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}