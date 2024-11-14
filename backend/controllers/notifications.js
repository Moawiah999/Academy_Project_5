const db = require("../models/db");

const createNotification = (req, res) => {
  //   user id from token
  const { userId, message } = req.body;

  const query = `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`;
  const values = [userId, message];
  db.query(query, values)
    .then(() => {
      console.log("Notification created");
    })
    .catch((err) => {
      console.log("Error creating notification:", err);
    });
};
module.exports = { createNotification };
