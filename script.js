// Get references to the necessary HTML elements
let progress = document.getElementById('progress'); // Progress bar for tracking song playback
let song = document.getElementById('song'); // Audio element
let ctrlIcon = document.getElementById('ctrlIcon'); // Play/Pause button icon
let currentTimeDisplay = document.getElementById('currentTime'); // Display for current playback time
let durationDisplay = document.getElementById('duration'); // Display for total duration of the song

// Set max value of progress bar and display song duration once metadata is loaded
song.onloadedmetadata = function () {
    progress.max = song.duration; // Set max value of progress bar to song duration
    progress.value = 0; // Reset progress bar to 0
    durationDisplay.textContent = formatTime(song.duration); // Display total duration of the song
}

// Function to toggle between play and pause states
function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) { // If the song is playing
        song.pause(); // Pause the song
        ctrlIcon.classList.remove("fa-pause"); // Change icon to play
        ctrlIcon.classList.add("fa-play");
    }
    else { // If the song is paused
        song.play(); // Play the song
        ctrlIcon.classList.remove("fa-play"); // Change icon to pause
        ctrlIcon.classList.add("fa-pause");
    }
}

// Update progress bar and current time display every 500ms
setInterval(() => {
    progress.value = song.currentTime; // Update progress bar with current song time
    currentTimeDisplay.textContent = formatTime(song.currentTime); // Update current time display
}, 500);

// Function to allow users to seek through the song using the progress bar
progress.onchange = function () {
    song.currentTime = progress.value; // Set song time to selected progress bar value
    if (ctrlIcon.classList.contains('fa-play')) { // If song was paused, play it when seeking
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

// Function to format time in MM:SS format
function formatTime(time) {
    let minutes = Math.floor(time / 60); // Extract minutes
    let seconds = Math.floor(time % 60); // Extract remaining seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format as MM:SS
}
