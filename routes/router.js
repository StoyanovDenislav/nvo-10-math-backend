const express = require("express");
const router = express.Router();
const mathData = require("./tasks.json");

const mongoose = require("mongoose");

// Define the schema for the math collection
const mathSchema = new mongoose.Schema({
  task: String,
  image: String,
  answers: [String],
  possible_answers: [String],
  open_answer_letters: [String],
  type: String,
  nvoID: Number,
});

const killSwitchSchema = new mongoose.Schema({
  killswitch: Boolean,
});

const MathModel = mongoose.model("Math", mathSchema);

const killswitchModel = mongoose.model("Killswitch", killSwitchSchema);

/*MathModel.insertMany(mathData)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });*/

/*killswitchModel
  .insertMany([{ killswitch: false }])
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  })*/

router.get("/tasks", async (req, res) => {
  try {
    // Fetch data from the math collection
    const userData = await MathModel.find({}).exec();

    res.send(JSON.stringify(userData));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

router.get("/killswitch", async (req, res) => {
  try {
    // Fetch data from the math collection
    const userData = await killswitchModel.find({}).exec();

    res.send(JSON.stringify(userData));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
