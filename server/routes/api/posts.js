const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})


// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    });

    res.status(201).send();
})

//Delete Post 
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@micropost.njnitnw.mongodb.net/test`, {
        useNewUrlParser: true
    });

    return client.db('micropost').collection('posts');
}


module.exports = router;