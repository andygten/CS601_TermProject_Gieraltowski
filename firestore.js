/**
 * @file contact.js
 * @author Andrew Gieraltowski
 * @date 12/03/2023
 */


let messageList = null

window.onload = function() {
    messageList = document.querySelector("#messageList");
    document.getElementById("contactForm").addEventListener('submit', e=> {
    e.preventDefault();
    const form = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log(form);
    db.collection("contactData").add({
        name: form.name,
        email: form.email,
        message: form.message
    });
    form.name.value = "";
    form.email.value= "";
    form.message.value = "";
    });

    document.getElementById("requestContactData").addEventListener('submit', event=> {
        messageList.innerHTML = '';
        const email = document.getElementById("requestEmail").value;
        event.preventDefault();
        db.collection("contactData").where("email", "==", email)
        .get()
        .then((snapshot) => {
            snapshot.forEach(doc => {
                console.log(doc.data());
                buildMessageList(doc);
            })
        });
    });
}

function buildMessageList(doc) {

    // Clear existing messages

    let li = document.createElement("li");
    let message = document.createElement("span");
    let cross = document.createElement("div");

    li.setAttribute("data-id", doc.id);
    message.textContent = doc.data().message;
    cross.textContent = "x";

    li.appendChild(message);
    messageList.appendChild(li);

    // deleting data
    cross.addEventListener("click", e => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute("data-id");
      db.collection("contactData")
        .doc(id)
        .delete();
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}