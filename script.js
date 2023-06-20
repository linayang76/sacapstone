var localStream;
var isCameraOn = false;
var audioContext;
var audioSource;

function toggleCamera() {
  if (isCameraOn) {
    stopCamera();
  } else {
    startCamera();
  }
}

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      localStream = stream;
      var localVideo = document.getElementById("localVideo");
      localVideo.srcObject = stream;
      isCameraOn = true;
      document.getElementById("toggleCamera").textContent = "Turn Off Camera";
    })
    .catch(function(error) {
      console.error("Error accessing camera:", error);
    });
}

function stopCamera() {
  if (localStream) {
    localStream.getTracks().forEach(function(track) {
      track.stop();
    });
    localStream = null;
  }
  var localVideo = document.getElementById("localVideo");
  localVideo.srcObject = null;
  isCameraOn = false;
  document.getElementById("toggleCamera").textContent = "Turn On Camera";
}

function initializeAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioSource = audioContext.createMediaElementSource(document.getElementById('youtubeAudio'));
  audioSource.connect(audioContext.destination);
}

window.addEventListener('load', initializeAudio);


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  }
  else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}


listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem('data');
}
showTask()


// Pomodoro Timer 
let minutes = 25;
let seconds = 0;
let isTimerRunning = false;
let timerInterval;

function startWorkSession() {
  minutes = 25;
  seconds = 1;
  updateTimer();
}

function startBreakSession() {
  minutes = 5;
  seconds = 1;
  updateTimer();
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;

  if (minutes === 25) {
    startWorkSession();
  } else {
    startBreakSession();
  }
}

function updateTimer() {
  seconds--;
  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }

  if (minutes === 0 && seconds === 0) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    // Perform actions when timer reaches 0 (e.g., play sound, show notification)
  }

  const timerElement = document.getElementById('timer');
  timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

//multiple youtube study with me videos//
(function() {
  var videoIds = ['7JPTlqRRf1w', 'DXT9dF-WK-I', 'grBFMP3HDZA']; // Replace with your YouTube video IDs
  var playerDiv = document.getElementById('video-player');
  var previousButton = document.getElementById('previous-button');
  var nextButton = document.getElementById('next-button');

  var currentIndex = 0;

  previousButton.addEventListener('click', function() {
    playPreviousVideo();
  });

  nextButton.addEventListener('click', function() {
    playNextVideo();
  });

  loadVideo(currentIndex);

  function loadVideo(index) {
    currentIndex = index;
    playerDiv.innerHTML = '<iframe width="580" height="300" src="https://www.youtube.com/embed/' + videoIds[index] + '?rel=0&autoplay=1&mute=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  }

  function playPreviousVideo() {
    currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
    loadVideo(currentIndex);
  }

  function playNextVideo() {
    currentIndex = (currentIndex + 1) % videoIds.length;
    loadVideo(currentIndex);
  }
})();
