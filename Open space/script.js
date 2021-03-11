"use strict";

const correctPass = "TrustNo1";
const inputs = document.getElementsByTagName("input");
//     0           1            2-7          8-12            13
// "text-box", "ok-button", "check-boxN", "sliderN", "launch-button"
let checkboxesOn = false;
let leversOn = false;

function disableInputs() {
    for (let i = 2; i < inputs.length; i++) {
        inputs[i].setAttribute("disabled", "");
    }
}

function enableInputs() {
    for (let i = 2; i < inputs.length - 1; i++) {
        inputs[i].removeAttribute("disabled");
    }
}

function validatePass() {
    let pass = document.getElementById("text-box").value;
    if (pass === correctPass) {
        enableInputs();
    } else {
        console.log("incorrect password");
    }
}

function checkControls() {
    checkboxesOn = !checkboxesOn ? checkTickBoxes() : true;
    leversOn = !leversOn ? checkLevers() : true;
    checkLaunch();
}

function checkTickBoxes() {
    let checkboxes = document.getElementsByClassName("check-box");
    checkboxesOn = true;
    for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            checkboxesOn = false;
            return false;
        }
    }
    return true;
}

function checkLevers() {
    let levers = document.getElementsByClassName("slider");
    for (let i = 0; i < levers.length; i++) {
        if (levers[i].value !== "9") {
            leversOn = false;
            return false;
        }
    }
    return true;
}

function checkLaunch() {
    if (areControlsOn()) {
        enableLaunch();
    } else {
        disableLaunch();
    }
}

function enableLaunch() {
    let launchButton = inputs[13];
    launchButton.removeAttribute("disabled");
}

function disableLaunch() {
    let launchButton = inputs[13];
    launchButton.setAttribute("disabled", "");
}

function areControlsOn() {
    return checkboxesOn && leversOn;
}

function launch() {
    let rocket = document.querySelector(".rocket");
    let x = Number(getComputedStyle(rocket).left
                                        .substr(0, getComputedStyle(rocket).left
                                                                                    .length - 2));
    let y = Number(getComputedStyle(rocket).bottom
                                        .substr(0, getComputedStyle(rocket).bottom
                                                                                    .length - 2));
    let moves = 0;
    let rocketMoving = setInterval(function(dist) {
        // move horizontally
        x += dist - 2;
        rocket.style.left = x + "px";
        // move vertically
        y += dist;
        rocket.style.bottom = y + "px";
        moves++;
        if (moves > 100) {
            clearInterval(rocketMoving);
        }
    }, 25, 5);
}

function initialize() {
    disableInputs();

    // event listener for password input
    document.getElementById("ok-button")
            .addEventListener("click", validatePass);

    // event listener for all checkboxes and levers
    for (let i = 2; i <= 12 ; i++) {
        inputs[i].onchange = checkControls;
        // inputs[i].addEventListener("change", checkControls);
    }

    // event listener for launch button
    let launchButton = inputs[13];
    launchButton.addEventListener("click", launch);
    launchButton.addEventListener("mousedown", function() {launchButton.style.backgroundColor = "blue";});
    launchButton.addEventListener("mouseup", function() {launchButton.style.backgroundColor = "red";});
}

window.addEventListener("load", initialize);
