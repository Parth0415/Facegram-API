const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction.js")
const moment = require("moment");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      // using moment package to format the date
      get: (date) => moment(date).format("MM/DD/YYYY hh:mm:ss"),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {return this.reactions.length});

const Thought = model("Thought", thoughtSchema)
module.exports = Thought;
