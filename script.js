let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
let currentTimeDisplay = document.getElementById('currentTime'); // Added: Get reference to currentTime display
let durationDisplay = document.getElementById('duration'); // Added: Get reference to duration display

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = 0;
    durationDisplay.textContent = formatTime(song.duration); // Added: Set initial duration display
}

function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

setInterval(() => {
    progress.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime); // Added: Update currentTime display
}, 500);

progress.onchange = function () {
    song.currentTime = progress.value;
    if (ctrlIcon.classList.contains('fa-play')) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}