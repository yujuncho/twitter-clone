const { Types, Schema, model } = require("mongoose");

const tweetSchema = new Schema({
  text: {
    type: String,
    req: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Types.ObjectId,
    ref: "user",
    req: true
  },
  retweetedBy: {
    type: Types.ObjectId,
    ref: "user"
  },
  inReplyToAuthor: {
    type: Types.ObjectId,
    ref: "user"
  },
  inReplyToTweet: this,
  replies: [this]
});

const Tweet = model("tweet", tweetSchema);

module.exports = Tweet;