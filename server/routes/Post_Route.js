const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const authenticateToken = require('../middleware/middleware');


router.post('/posts', authenticateToken, async (req, res) => {
    console.log("save post");
    try {
        const { body, photo } = req.body;
        // Validate that required fields are present
        if (!body || !photo) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Create a new post
        const newPost = new Post({
            body,
            photo,
            postedBy: req.user._id,
        });
        // Save the post to the database
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getPosts', authenticateToken, async (req, res) => {
    console.log("get post");
    try {
        // Fetch all posts from the database
        const posts = await Post.find().populate('postedBy')
        console.log(posts);
        // Send the posts in reverse order as a JSON response
        res.status(200).json(posts.reverse());
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get('/posts/:userId', authenticateToken, async (req, res) => {
    console.log("/posts/:userId' "+req.params.userId);
    try {
        const userId = req.params.userId;

        // Retrieve posts with images posted by the specified user
        const posts = await Post.find({ postedBy: userId, photo: { $exists: true, $ne: null } })
            .populate('postedBy', '_id name') // Populate the 'postedBy' field with user details
            .exec();
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
