// Write your "actions" router here!
const express = require('express');

const router = express.Router();
const Actions = require('./actions-model');



router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Server Error"
            })
        })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: "Action not found"
                })
            }
            else {
                res.status(200).json(action)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Server Error"
            })
        })
})

router.post('/', async (req, res) => {
    const newAction = req.body;

    console.log(req.body)
    if (!newAction.project_id || !newAction.description || !newAction.notes) {
        res.status(400).json({
            message: "New actions must include project_id, description, and notes"
        })
    }
    else {
        try {
            await Actions.insert(newAction)
                .then(action => {
                    res.status(201).json(action)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "Server Error" })
                })
        }
        catch (err) {
            res.status(400).json(err)
        }
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if(!)
})

module.exports = router;