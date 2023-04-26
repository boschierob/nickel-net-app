const express = require('express');
const router = express.Router();
const Intervention = require('../models/intervention');

router.post('/addIntervention', (req, res) => {
    //console.log(req.body)
    const interventionData = req.body;

    const intervention = new Intervention(interventionData);
    intervention.save().then(intervention => {
        console.log('Intervention saved successfully:', intervention);
        // handle successful save
    })
        .catch(error => {
            console.error('Error saving intervention:', error);
            // handle error);
        }); 
});

module.exports = router;
