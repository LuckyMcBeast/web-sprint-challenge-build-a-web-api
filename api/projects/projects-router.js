// Write your "projects" router here!
const express = require('express');

const router = express.Router();
const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Server Error"
            })
        })
})


router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: "project not found"
                })
            }
            else {
                res.status(200).json(project)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Server Error"
            })
        })
})

router.post('/', (req, res) => {
    const newProject = req.body;

    if (!newProject.name || !newProject.description) {
        res.status(400).json({
            message: "New projects must include project_id, description, and notes"
        })
    }
    else {
        Projects.insert(newProject)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Server Error" })
            })
    }

})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.name || !changes.description) {
        res.status(400).json({
            message: "Projects must include project_id, description, and notes"
        })
    }
    else {
        Projects.update(id, changes)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Server Error" })
            })
    }

})

router.delete('/:id' , async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Projects.remove(id);
        if (project) {
            res.status(200).json({ message: `${id} was deleted.` })
        }
        else {
            res.status(404).json({ message: "Project Not Found" })
        }
    }
    catch (err) {
        res.status(500).json({ message: `Project could not be removed.`, error: err.message })
    }
})

module.exports = router;