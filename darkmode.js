/**
 * @file darkmode.js
 * @author Andrew Gieraltowski
 * @date 12/05/2023
 */

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const darkMode = getCookie('darkMode');
    if (darkMode === "on") {
        document.body.classList.add('dark-mode');
        main.classList.add('dark');
        toggleSwitch.checked = true;
    }
})

window.onload = function() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const main = document.getElementById('main');

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            main.classList.add('dark');
            setCookie("darkMode", "on", 365);
        } else {
            document.body.classList.remove('dark-mode');
            main.classList.remove('dark');
            setCookie("darkMode", "off", 365);
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

    // Get dark mode cookie
    const darkMode = getCookie('darkMode');
    if (darkMode === "on") {
        document.body.classList.add('dark-mode');
        main.classList.add('dark');
        toggleSwitch.checked = true;
    }
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