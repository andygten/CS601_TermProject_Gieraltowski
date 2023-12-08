/**
 * @file resume.js
 * @author Andrew Gieraltowski
 * @date 12/06/2023
 */

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const darkMode = getCookie('darkMode');
    const main = document.getElementById('main');
    const links = document.getElementsByClassName('link-grid-entry');
    if (darkMode === "on") {
        document.body.classList.add('dark-mode');
        main.classList.add('dark');
        toggleSwitch.checked = true;

        for (const link of links) {
            link.classList.add('dark-link');
        }
    }
})

window.onload = function() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const main = document.getElementById('main');
    const links = document.getElementsByClassName('link-grid-entry');

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            main.classList.add('dark');
            for (const link of links) {
                link.classList.add('dark-link');
            }
            setCookie("darkMode", "on", 365);
        } else {
            document.body.classList.remove('dark-mode');
            main.classList.remove('dark');
            for (const link of links) {
                link.classList.remove('dark-link');
            }
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

        for (const link of links) {
            link.classList.add('dark-link');
        }
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