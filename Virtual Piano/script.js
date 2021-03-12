"use strict";

const pianoKeys = ["A", "S", "D", "F", "G", "H", "J", "W", "E", "T", "Y", "U"];
let sounds = {};

function initSounds() {
    let audio = null;
    for (let i = 0; i < pianoKeys.length; i++) {
        audio = document.createElement("AUDIO");
        audio.src = `./assets/${pianoKeys[i]}.mp3`;
        audio.class = "sound";
        sounds[pianoKeys[i]] = audio;
    }
}

function isPianoKey(key) {
    for (let i = 0; i < pianoKeys.length; i++) {
        if (pianoKeys[i] === key) {
            return true;
        }
    }
    return false;
}

function playSound(key) {
    sounds[key].play();
}

function playSoundTest(key) {
    let audio = document.createElement("AUDIO");
    audio.src = `./assets/${key}.mp3`;
    audio.play();
}

function setListeners() {
    document.addEventListener("keypress", function(e) {
        let key = e.key.toUpperCase();
        if (isPianoKey(key)) {
            playSoundTest(key);
        } else {
            console.log(`Warning!`);
        }
    });
}

function init() {
    initSounds();
    setListeners();
}

init();
