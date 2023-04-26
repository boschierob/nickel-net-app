const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/getAll', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

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

router.patch('/updateUser/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}); 

router.delete('/deleteAll', async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.json({ message: `${result.deletedCount} users deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
