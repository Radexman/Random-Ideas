const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

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
router.get('/', async (request, response) => {
	try {
		const ideas = await Idea.find();
		response.json({ success: true, data: ideas });
	} catch (error) {
		console.log(error);
		response.status(500).json({ sucess: false, error: 'Something went wrong' });
	}
});

// Get single idea
router.get('/:id', (request, response) => {
	const idea = ideas.find((idea) => idea.id === +request.params.id);

	if (!idea) {
		return response.status(404).json({ success: flase, error: 'Resource not found' });
	}

	response.json({ success: true, data: idea });
});

// Create idea
router.post('/', async (request, response) => {
	const idea = new Idea({
		text: request.body.text,
		tag: request.body.tag,
		username: request.body.username,
	});

	try {
		const savedIdea = await idea.save();
		response.json({ success: true, data: savedIdea });
	} catch (error) {
		console.log(error);
		response.status(500).json({ success: false, error: 'Something went wrong' });
	}
});

// Update idea
router.put('/:id', (request, response) => {
	const idea = ideas.find((idea) => idea.id === +request.params.id);

	if (!idea) {
		return response.status(404).json({ sucess: false, error: 'Resource not found' });
	}

	idea.text = request.body.text || idea.text;
	idea.tag = request.body.tag || idea.tag;

	response.json({ sucess: true, data: idea });
});

// Delete idea
router.delete('/:id', (request, response) => {
	const idea = ideas.find((idea) => idea.id === +request.params.id);

	if (!idea) {
		return response.status(404).json({ sucess: false, error: 'Resource not found' });
	}

	const index = ideas.indexOf(idea);
	ideas.splice(index, 1);

	response.json({ sucess: true, data: {} });
});

module.exports = router;
