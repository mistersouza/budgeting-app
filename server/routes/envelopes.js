const express = require('express');

const { getEnvelopes, getEnvelope, createEnvelope, updateEnvelope, deleteEnvelope, transferFunds } = require('../controllers/envelopes')

const router = express.Router(); 

router.get('/', getEnvelopes); 
router.get('/:id', getEnvelope);
router.post('/', createEnvelope); 
router.post('/:id', updateEnvelope);
router.delete('/:id', deleteEnvelope);
router.post('/amount/:fromId/:toId', transferFunds)

module.exports = router;