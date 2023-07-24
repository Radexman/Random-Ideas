const express = require('express');
const router = express.Router();

const ideas = [
	{
		id: 1,
		text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
		tag: 'Technology',
		username: 'TonyStark',
		date: '2022-01-02',
	},
	{
		id: 2,
		text: 'Milk cartons that turn a different color the older that your milk is getting',
		tag: 'Inventions',
		username: 'SteveRogers',
		date: '2022-01-02',
	},
	{
		id: 3,
		text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
		tag: 'Software',
		username: 'BruceBanner',
		date: '2022-01-02',
	},
];

// Get all ideas
router.get('/', (request, response) => {
	response.json({ success: true, data: ideas });
});

// Get single idea
router.get('/:id', (request, response) => {
	const idea = ideas.find((idea) => idea.id === +request.params.id);

	if (!idea) {
		return response.status(404).json({ success: flase, error: 'Resource not found' });
	}

	response.json({ success: true, data: idea });
});

// Add an idea
router.post('/', (request, response) => {
	const idea = {
		id: ideas.length + 1,
		text: request.body.text,
		tag: request.body.tag,
		username: request.body.username,
		data: new Date().toISOString().slice(0, 10),
	};

	console.log(idea);

	ideas.push(idea);
	response.json({ sucess: true, data: idea });
});

module.exports = router;
