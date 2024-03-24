const shortid = require('shortid');
const URL = require('../models/url.mdoel'); // Corrected model import
// const { createShortUrl } = require('shortlnk'); // It seems like you're importing a function createShortUrl from another module. Please ensure this import is correct.

async function createShortUrls(req, res) {
  console.log("hi")
  try {
    const { redirectUrl } = req.body;
    
    if (!redirectUrl) {
      return res.status(400).json({ message: 'URL is not provided to shorten!' });
    }

    const shortId = shortid.generate();

    const result = await URL.create({
      shortId: shortId,
      redirectUrl: redirectUrl,
      visitHistory: []
    });

    if (!result) {
      return res.status(500).json({ message: "Failed to shorten the URL. Please provide a correct URL!" });
    }

    return res.status(201).json({ id: result.shortId, message: "URL is shortened successfully!" }); // Corrected response format
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function redirectToUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    // console.log(shortId);
    const entry = await URL.findOneAndUpdate(
      {shortId} ,
      { $push: { visitHistory:{ timestamp:Date.now()} } },
      { new: true } // to return the updated document
    );

    if (!entry) {
      return res.status(404).json({ message: "Provide the correct shortened URL" });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function analytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId }); // Corrected the typo in 'findOne'

    if (!result) {
      return res.status(404).json({ message: "There are no visits on this URL yet" });
    }

    return res.status(200).json({ totalClicks: result.visitHistory.length }); // Corrected response status code and JSON key
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createShortUrls,
  redirectToUrl,
  analytics
};
