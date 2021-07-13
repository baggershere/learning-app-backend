const { getCon } = require("../DB/getcon");
const moment = require('moment');

module.exports.submitGameScore = async (req, res) => {
  const childName = req.body.childName;
  const gameName = req.body.gameName;
  const gameScore = req.body.gameScore;
  const email = req.body.email;
  const time = req.body.time

  const pool = getCon();
  try {
    await pool
      .query(
        "INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ($1,$2,$3,$4,$5)",
        [gameName, gameScore, email, childName, time]
      )
      .then((resp) => res.status(200).json({ message: "Inserted" }));
  } catch (error) {
    console.log(error);
  }
};