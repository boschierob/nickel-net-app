const express = require('express');
const router = express.Router();
const Intervention = require('../models/intervention');

router.post('/addIntervention', (req, res) => {
    //console.log(req.body)
    const interventionData = req.body;

    const intervention = new Intervention(interventionData);
    intervention.save().then(intervention => {
        console.log('Intervention saved successfully:', intervention);
        res.status(200).send('intervention saved')
    })
        .catch(error => {
            console.error('Error saving intervention:', error);
            res.status(500).send('error saving intervention'+ error)
        }); 
});


router.get('/getInterventions', async (req, res) => {
    try {
      const interventions = await Intervention.find();
      res.json(interventions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports = router;
