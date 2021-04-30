const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

// Register
router.post('/register', async (req, res) => {
	//? lets validate the data before we make a user
	const { errors } = registerValidation(req.body);
	if (errors) return res.status(400).send(`"${errors.path}" ${errors.message}`);

	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	// Hash passwords
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);

	// create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});

	try {
		const savedUser = await user.save();
		res.send({ user: user._id });
	} catch (err) {
		res.status(400).send(err);
	}
});

// Login
router.post('/login', async (req, res) => {
	//? lets validate the data before we make a user
	const { errors } = loginValidation(req.body);
	if (errors) return res.status(400).send(`"${errors.path}" ${errors.message}`);

	// Checking if the email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email is not found');

	// password is correct
	const validPass = bcrypt.compareSync(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid password');

	// Create and assign a token
	const token = jwt.sign(
		{
			_id: user._id,
		},
		process.env.TOKEN_SECRET
	);
	res.header('auth-token', token).send(token);
});

module.exports = router;
