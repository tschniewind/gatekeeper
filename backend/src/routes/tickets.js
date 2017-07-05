const express = require('express');
const validate = require('express-validation');
const Joi = require('joi');
const router = express.Router();
const ticketService = require('../services/ticketService');


const getTicket = {
    body: {
        queue: Joi.boolean(),
        ticketId: Joi.string()
    }
};

router.put('/:group/:service/:environment', validate(getTicket), (async (req, res) => {
    const {group, service, environment} = req.params;
    const queue = req.body.queue || false;
    const ticketId = req.body.ticketId || false;
    try {
        const result = await ticketService.enterGate(group, service, environment, queue, ticketId);
        if (result === null) {
            res.status(404);
            res.send('Gate not found');
        } else {
            res.status(200);
            res.json(result);
        }
    } catch (error) {
        res.status(500);
    }
}));

module.exports = router;