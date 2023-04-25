const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const mongoose= require('mongoose');

const port = config.port || 5050;


mongoose
	.connect(`${config.mongodbUrl}`, { useNewUrlParser: true })
	.then(() => {
		app.use(bodyParser.json());
        app.use(cors());

        const posts = require('./routes/api/posts');
        app.use('/api/posts', posts);

        // if (config.env === 'production'){
        //     app.use(express.static(__dirname + '/public/'));

        //     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
        // }

        app.listen(port, () => console.log(`Server run on port ${port}`));
	})

