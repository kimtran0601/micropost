const express = require('express');
const Post = require('../../models/postScheme');
const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await Post.find()
	res.send(posts)
})

// Add Post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
    });

    await post.save();
    res.status(201).send(post);
})

// Update Post
router.patch("/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.text) {
			post.text = req.body.text
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

//Delete Post 
router.delete('/:id', async (req, res) => {
    try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})



module.exports = router;