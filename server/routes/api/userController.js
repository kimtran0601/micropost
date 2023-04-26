const express = require('express');
const User = require('../../models/userScheme');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = [];

// Get User
router.get('/', async (req, res) => {
    const users = await User.find()
	res.send(users);
})

// Add User
router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            password: hashPass,
        });
    
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.log({error});
        res.status(500).send();
    }
    
})

router.post('/login/', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    
    if (user == null){
        return res.send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send('Success');
        }
        else{
            res.send('No Authen');
        }
    } catch (error) {
        console.log({error});
    }
})

// // Update Post
// router.patch("/:id", async (req, res) => {
// 	try {
// 		const post = await Post.findOne({ _id: req.params.id })

// 		if (req.body.title) {
// 			post.title = req.body.title
// 		}

// 		if (req.body.text) {
// 			post.text = req.body.text
// 		}

// 		await post.save()
// 		res.send(post)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Post doesn't exist!" })
// 	}
// })

// //Delete Post 
// router.delete('/:id', async (req, res) => {
//     try {
// 		await Post.deleteOne({ _id: req.params.id })
// 		res.status(204).send()
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Post doesn't exist!" })
// 	}
// })



module.exports = router;