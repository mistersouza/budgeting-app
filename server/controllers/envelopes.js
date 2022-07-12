const mongoose = require('mongoose')

const Envelope = require('../models/envelope.js'); 

const getEnvelopes = async (req, res) => {
    try {
        const envelopes = await Envelope.find(); 
        res.status(200).json(envelopes); 

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

const getEnvelope = async (req, res) => {
    const { id } = req.params; 

    try {
        const envelope = await Envelope.findById(id); 
        res.status(200).json({ envelope }); 
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }

};

const createEnvelope = async (req, res) => {
    const { name, budget } = req.body; 

    const newEnvelope = new Envelope({ name, budget }); 

    try {
        await newEnvelope.save(); 
        res.status(201).json(newEnvelope); 
    } catch (error) {
        res.status(409).json({ message: error.message }); 
    }
}; 

const updateEnvelope = async (req, res) => {
    const { id } = req.params; 
    const { name, budget } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Envelope with id: ${id} couldn't be found :/`); 

    const updatedEnvelope = { name, budget, _id: id }; 

    await Envelope.findByIdAndUpdate(id, updatedEnvelope, { new: true });

    res.json(updatedEnvelope);
};

const deleteEnvelope = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Envelope with id: ${id} couldn't be found :/`);

    await Envelope.findByIdAndRemove(id); 

    res.json({message: 'Envelope dropped!'});

};

const transferFunds = async (req, res) => {
    const fromId = req.params.fromId;
    const toId = req.params.toId;
    const amount = +req.query.amount; 

    const fromEnvelope = { _id: fromId }; 
    const fromBudget = { budget: budget - amount}; 
    const toEnvelope = { _id: toId }
    const toBudget = { budget: budget + amount }; 

    await Envelope.findOneAndUpdate(fromEnvelope, fromBudget, {
        new: true
    }); 

    await Envelope.findByIdAndUpdate(toEnvelope, toBudget, {
        new: true 
    }); 
};


module.exports = {
    getEnvelopes,
    getEnvelope,
    createEnvelope, 
    updateEnvelope,
    deleteEnvelope,
    transferFunds
}