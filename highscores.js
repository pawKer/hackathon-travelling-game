async function submitHighScore(event) {
    event.preventDefault();
  const result = await db.collection("highscores").doc().set({
    name: document.getElementById("input_name").value,
    time: secondsSinceStart,
    timestamp: new Date()
  });
  document.getElementById("high-score-submit").style.display = "none";
  document.getElementById("submit-confirm").style.display = "";
}
function getHighScores() {
  return "Hello score";
}
function reloadPage(event) {
    event.preventDefault();
    location.reload();
  }
  