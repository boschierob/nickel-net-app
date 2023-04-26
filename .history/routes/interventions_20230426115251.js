const express = require('express');
const router = express.Router();
const Intervention = require('../models/intervention');

router.post('/interventions', (req, res) => {
  const interventionData = req.body;

  const intervention = new Intervention(interventionData);
  intervention.save((err, newIntervention) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(newIntervention);
    }
  });
});

module.exports = router;
