/**
 * @file contact.js
 * @author Andrew Gieraltowski
 * @date 12/03/2023
 */


let messageList = null
let currentUser = ""
let darkMode = false;

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const darkMode = getCookie('darkMode');
    const main = document.getElementById('app');
    const requests = document.getElementById('requests');
    const responses = document.getElementById('responses');
    console.log("darkMode: " + darkMode);
    if (darkMode === "on") {
        document.body.classList.add('dark-mode');
        main.classList.add('dark');
        requests.classList.add('dark');
        responses.classList.add('dark');
        toggleSwitch.checked = true;
    }
})

window.onload = function() {
    messageList = document.querySelector("#messageList");
    new Vue({
        el: '#app',
        data: {
            formData: {
            name: '',
            email: '',
            message: ''
            }
        },
        methods: {
            submitForm() {
                db.collection("contactData").add({
                    name: this.formData.name,
                    email: this.formData.email,
                    message: this.formData.message
                });
                this.resetForm();
            },
            resetForm() {
                this.formData.name = '';
                this.formData.email = '';
                this.formData.message = '';
            }
        }
    });

    new Vue({
        el: '#requests',
        data: {
            formData: {
            email: '',
            }
        },
        methods: {
            submitForm() {
                messageList.innerHTML='';
                db.collection("contactData").where("email", "==", this.formData.email)
                .get()
                .then((snapshot) => {
                    snapshot.forEach(doc => {
                        console.log(doc.data());
                        buildMessageList(doc);
                    })
                });
                this.resetForm();
            },
            resetForm() {
                this.formData.email = '';
            }
        }
    });

    const toggleSwitch = document.getElementById('darkModeToggle');
    const main = document.getElementById('app');
    const requests = document.getElementById('requests');
    const responses = document.getElementById('responses');

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            main.classList.add('dark');
            requests.classList.add('dark');
            responses.classList.add('dark');
            setCookie("darkMode", "on", 365);
        } else {
            document.body.classList.remove('dark-mode');
            main.classList.remove('dark');
            requests.classList.remove('dark');
            responses.classList.remove('dark');
            setCookie("darkMode", "off", 365);
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);
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

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
        return cookieValue;
        }
    }
    return null;
}