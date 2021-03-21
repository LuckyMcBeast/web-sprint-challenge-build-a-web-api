// Write your "actions" router here!
const express = require('express');

const router = express.Router();
const Actions = require('./actions-model');

router.get('/', async (req, res) => {
    await Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : "Server Error"
            })
        })
})

module.exports = router;