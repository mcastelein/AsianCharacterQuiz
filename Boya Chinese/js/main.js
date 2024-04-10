console.log("main.js is loaded and running.");

document.addEventListener("DOMContentLoaded", (event) => {
  let audioPlayers = document.querySelectorAll(".audio-player");

  audioPlayers.forEach((player) => {
    player.onplay = (event) => {
      // Pause and reset other players
      audioPlayers.forEach((otherPlayer) => {
        if (otherPlayer !== player) {
          otherPlayer.pause();
          otherPlayer.currentTime = 0; // Reset playback position
        }
      });
    };
  });
});
