// Main Section Animation
//AUDIO PLAYER
// Elements

const player = document.querySelector(".player");
const audio = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress_filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player_slider");
const tglRotateL = document.querySelector(".leftCircle");
const tglRotateR = document.querySelector(".rightCircle");


// functions

function togglePlay() {

  // ternary op instead of if/else
  const method = audio.paused ? "play" : "pause";
  audio[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  console.log(tglRotateL);
  toggle.textContent = icon;

}

function reelRotate() {
  tglRotateL.classList.toggle("leftCircleRotate");
  tglRotateR.classList.toggle("rightCircleRotate");
}

// Skip Function

function skip() {
  console.log(this.dataset.skip);
  audio.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  audio[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
}

function handleProgress() {
  // updates the flex-basis of .progress_filled
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
  console.log(e);
}
// event listeners

audio.addEventListener("click", togglePlay);
audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);

// listens for timeupdate for the handleProgress fn
audio.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

// jQuery to Vanilla JS

$(".project-option").on("click", function (e) {
  let text = $(this).text();
  let username = "lmh96";
  console.log(text);
  $.get("api/projects/" + text + "/" + username, function (data) {
    $(".player_video").attr("src", data.mainFile);
  });
})

$(function () {
  $(".toggleLogin").click(function () {
    $(".contentAuth").toggleClass("contentAuthUp");
  })
})

$(function () {
  $(".togglePlayer").click(function () {
    $(".main").toggleClass("mainDown");
  });
});

$(function () {
  $(".mainDown").on("transitionend", function () {
    $(".mainDown").css("z-index", -1);
    $(".content").toggleClass("contentUp");
  });
});

$("#signInBtn").on("click", function (e) {
  e.preventDefault();

  let user = $("#signInUser").val();
  let pass = $("#signInPass").val();

  let path = "/api/users/" + user + "/" + pass;

  $.get(path, function (data) {
    console.log(data);
  })
});

$("#signUpBtn").on("click", function (e) {
  e.preventDefault();

  let user = $("#signUpUser").val();
  let pass = $("#signUpPass").val();

  let path = "/api/users/" + user + "/" + pass;

  let newUser = {
    username: user,
    password: pass,
  };

  $.post("/api/users", newUser)
    .then(function (data) {
      console.log(data);
      $.get(path, function () {

      })
    })
});

$(".player_button").click(function () {
  $(".leftCircle").toggleClass("leftCircleRotate");
  $(".rightCircle").toggleClass("rightCircleRotate");
});


