const express = require("express");
const router = express.Router();
const rssController = require("../controllers/rss.controller");

router.post("/fetch", rssController.fetchRSS);
router.post("/save", rssController.saveRSSItems);

module.exports = router;
