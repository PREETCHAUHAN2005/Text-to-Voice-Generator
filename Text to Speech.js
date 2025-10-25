const pauseBtn = document.getElementById("pauseBtn");
const speakBtn = document.getElementById("speakBtn");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");
const textInput = document.getElementById("textInput");
let speech= new SpeechSynthesisUtterance();

let voices= [];
let voiceSelect= document.querySelector("select");
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Light Mode";
    } else {
        darkModeToggle.textContent = "Dark Mode";
    }
});

window.speechSynthesis.onvoiceschanged = ()=>{
    voices= window.speechSynthesis.getVoices();
    speech.voice= voices[0];
    voiceSelect.innerHTML = "";
    

    voices.forEach((voice,i)=>{
    //  voiceSelect.options[i]=new Option(voice.name,i);
    const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
});

};
voiceSelect.addEventListener("change",()=>{
    window.speechSynthesis.cancel();
    // speech.voice = voices[voiceSelect.value];
    speech.voice = voices[Number(voiceSelect.value)];

});
rate.addEventListener("input", () => {
    rateValue.textContent = rate.value;
    speech.rate = rate.value;
});

speakBtn.addEventListener("click", () => {
    if (textInput.value.trim() === "") {
        alert("Please enter some text!");
        return;
    }
    speech.text = textInput.value;
    speech.rate = rate.value;
    speech.pitch = pitch.value;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});
pauseBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            pauseBtn.textContent = "Pause";
            pauseBtn.style.backgroundColor = "#f44336";
        } else {
            window.speechSynthesis.pause();
            pauseBtn.textContent = "Resume";
            pauseBtn.style.backgroundColor = "#2196F3"; 
        }
    }

});
