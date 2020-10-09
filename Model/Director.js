const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectorsSchema = new Schema({
   name:{
      type: String,
   },
   surname: String,
   bio: String,
   createAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("director", DirectorsSchema);
