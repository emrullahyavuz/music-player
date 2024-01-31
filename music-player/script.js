const music = document.getElementById("music");
const backwardBtn = document.getElementById("backward");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("forward");
const musicImage = document.getElementById("musicImage");
const musicTitle = document.querySelector(".musicTitle");
const singerTitle = document.querySelector(".singerTitle");
const progressBar1 = document.querySelector(".progressBar1");
const currentTimeSpan = document.querySelector(".currentTime");
const totalTimeSpan = document.querySelector(".totalTime");
const progressBars = document.querySelector(".progressBars");

let songIndex = 0;

const songInfo = [
  {
    name: "react",
    title: "React.js",
    creator: "Emrullah Yavuz",
  },
  {
    name: "vue",
    title: "Vue.js",
    creator: "Emrullah Yavuz",
  },
];

let isPlaying = false;

function loadSong(song) {
  musicTitle.textContent = song.title;
  singerTitle.textContent = song.creator;
  musicImage.src = `assets/images/${song.name}.png`;
  music.src = `assets/audios/${song.name}.mp3`;
}

loadSong(songInfo[songIndex]);

function onPlay() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
}

function onPause() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
}

playBtn.addEventListener("click", () => (isPlaying ? onPause() : onPlay()));

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 1;
  }
  loadSong(songInfo[songIndex]);
  onPlay();
}

function nextSong() {
  songIndex++;
  if (songIndex > 1) {
    songIndex = 0;
  }

  loadSong(songInfo[songIndex]);
  onPlay();
}

backwardBtn.addEventListener("click", prevSong);
forwardBtn.addEventListener("click", nextSong);

function getMusicTime(e) {
  if (isPlaying) {
    // const { currentTime,duration } = e.srcElement;
    const totalTime = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    const timePercentage = currentTime / totalTime;
    progressBar1.style.width = `${timePercentage * 100}%`;

    const durationMinutes = Math.floor(e.srcElement.duration / 60);
    let durationSeconds = Math.floor(e.srcElement.duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      totalTimeSpan.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(e.srcElement.currentTime / 60);
    let currentSeconds = Math.floor(e.srcElement.currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    if (durationSeconds) {
      currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

function setProgressTime(e) {
  const { clientWidth } = e.srcElement;
  const { duration } = music;

  const progressXClient = e.offsetX;

  const progressBarX = (progressXClient / clientWidth) * duration;

  music.currentTime = progressBarX;
}

music.addEventListener("timeupdate", getMusicTime);
music.addEventListener("ended", nextSong);
progressBars.addEventListener("click", setProgressTime);

