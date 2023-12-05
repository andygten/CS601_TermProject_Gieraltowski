/**
 * @file contact.js
 * @author Andrew Gieraltowski
 * @date 12/03/2023
 */


let messageList = null
let currentUser = ""

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
        currentUser = email
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

    let li = document.createElement("li");
    let message = document.createElement("span");
    let cross = document.createElement("div");

    li.setAttribute("data-id", doc.id);
    message.textContent = doc.data().message;
    cross.textContent = "x";

    li.appendChild(message);
    li.appendChild(cross);
    messageList.appendChild(li);

    // deleting data
    cross.addEventListener("click", e => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("contactData")
            .doc(id)
            .delete();

        
        // Listen for real time updates and reflect list
        db.collection("contactData").where("email", "==", currentUser).onSnapshot(snapshot => {
            messageList.innerHTML = '';
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change.doc.data());
                if (change.type == "added") {
                    buildMessageList(change.doc);
                } else if (change.type == "removed") {
                    let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
                    cafeList.removeChild(li);
                }
            });
        })
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}