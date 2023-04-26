const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/addUser', async (req, res) => {
    const userData = req.body;
    const user = new User(userData);

     try {
        await user.save()
        res.status(200).send('user saved')
     } catch (error) {
        console.error('Error saving intervention:', error);
        res.status(500).send('error saving intervention' + error)
     }
});

module.exports = router;
