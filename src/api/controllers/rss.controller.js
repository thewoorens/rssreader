const axios = require("axios");
const RssItem = require("../models/rssItem.model");
const User = require("../models/user.model");
const {XMLParser} = require('fast-xml-parser');
const Parser = require('rss-parser');
const parser = new Parser();


exports.fetchRSS = async (req, res) => {
    const {url, userId} = req.body;

    if (!userId) return res.status(401).json({error: "Unauthorized", message: "User ID is required"});
    if (!url) return res.status(400).json({error: "RSS URL is required"});

    try {
        const userExists = await User.findById(userId);
        if (!userExists) return res.status(404).json({error: "User not found"});

        const response = await axios.get(url);
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });

        const parsed = parser.parse(response.data);

        const rawItems = parsed?.rss?.channel?.item || parsed?.feed?.entry || [];

        const formattedItems = rawItems.map(item => {
            return {
                title: item.title,
                link: item.link?.["@_href"] || item.link,
                description: item.description || item.summary || "",
                pubDate: item.pubDate || item.updated || new Date().toISOString(),
                guid: item.guid || item.id || (item.link?.["@_href"] || item.link),
            };
        });

        res.status(200).json({items: formattedItems});
    } catch (error) {
        console.error("RSS Fetch Error:", error.message);
        res.status(500).json({error: "Failed to fetch or parse RSS feed"});
    }
};

exports.saveRSSItems = async (req, res) => {
    const {userId, url, subTitle} = req.body;

    if (!userId) return res.status(401).json({error: "Unauthorized"});
    if (!url) return res.status(400).json({error: "URL is required"});
    if (!subTitle) return res.status(400).json({error: "SubTitle is required"});

    try {
        const userExists = await User.findById(userId);
        if (!userExists) return res.status(404).json({error: "User not found"});
        const subTitleExists = await RssItem.findOne({subTitle});
        if (subTitleExists) return res.status(404).json({error: "SubTitle already exists"});

        const feed = await parser.parseURL(url);

        const savedItems = [];

        const existingGuids = await RssItem.find({
            guid: {$in: feed.items.map(item => item.guid)}
        }).distinct("guid");

        const existingGuidsSet = new Set(existingGuids);

        for (const item of feed.items) {
            const guid = item.guid || item.link;

            if (!existingGuidsSet.has(guid)) { // Set'te kontrol et
                const newItem = new RssItem({
                    userId,
                    title: item.title,
                    link: item.link,
                    description: item.contentSnippet || item.content || '',
                    pubDate: new Date(item.pubDate || item.isoDate || Date.now()),
                    guid: guid,
                    subTitle: subTitle || null,
                });

                await newItem.save();
                savedItems.push(newItem);
            }
        }
        res.status(200).json({
            message: `${savedItems.length} new items saved.`,
            saved: savedItems,
        });

    } catch (err) {
        console.error("RSS Save Error:", err.message);
        res.status(500).json({error: "Failed to save RSS items"});
    }
};