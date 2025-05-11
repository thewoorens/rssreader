const mongoose = require("mongoose");

const rssItemSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: String,
    link: String,
    description: String,
    pubDate: {type: Date, required: false},
    guid: {type: String, required: true, unique: true}
});

module.exports = mongoose.model("RssItem", rssItemSchema);
