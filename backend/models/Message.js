const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    messages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true, autoIndex: false }
);

const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, autoIndex: false }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
const conversationModel = mongoose.model("conversations", conversationSchema);
module.exports = {conversationModel,ChatModel};