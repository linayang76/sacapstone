
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
