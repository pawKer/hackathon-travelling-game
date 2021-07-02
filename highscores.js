async function submitHighScore(event) {
  event.preventDefault();
  const inputName = document.getElementById("input_name").value;
  if (inputName) {
    const result = await db.collection("highscores").doc().set({
      name: inputName,
      time: secondsSinceStart,
      timestamp: new Date(),
    });
    document.getElementById("high-score-submit").style.display = "none";
    document.getElementById("submit-confirm").style.display = "";
  }
}
async function getHighScores() {
  const results = await db
    .collection("highscores")
    .orderBy("time", "desc")
    .limit(20)
    .get();
  const orderedHighScores = await results.docs.map((doc) => doc.data());
  console.log(orderedHighScores);
  orderedHighScores.forEach((score) => {
    let listItem = document.createElement("LI");
    listItem.innerText = score.name + " - " + score.time + "s";
    document.getElementById("leaderboard-list").appendChild(listItem);
  });
}
function reloadPage(event) {
  event.preventDefault();
  location.reload();
}
