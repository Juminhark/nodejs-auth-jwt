const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
	res.json(req.user);
	// User.findOne({_id:req.user})
});

module.exports = router;
