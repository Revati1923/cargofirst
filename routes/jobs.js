

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Job = require('../models/Job');
const auth = require('../middleware/auth');


const jobValidation = [
    check('jobTitle', 'Job title is required').not().isEmpty(),
    check('jobDescription', 'Job description is required').not().isEmpty(),
    check('companyName', 'Company name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('deadline', 'Valid deadline date is required').isISO8601().toDate()
];

// Create a job posting
router.post('/', [auth, jobValidation], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { jobTitle, jobDescription, companyName, location, deadline } = req.body;
        
        const job = new Job({
            jobTitle,
            jobDescription,
            companyName,
            location,
            deadline,
            postedBy: req.user.id
        });

        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a job posting
router.put('/:id', [auth, jobValidation], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Check ownership
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to update this job' });
        }

        const { jobTitle, jobDescription, companyName, location, deadline } = req.body;
        
        job.jobTitle = jobTitle;
        job.jobDescription = jobDescription;
        job.companyName = companyName;
        job.location = location;
        job.deadline = deadline;

        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Job not found' });
        }
        res.status(500).send('Server error');
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

      
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.json({ msg: 'Job removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Job not found' });
        }
        res.status(500).send('Server error');
    }
});


router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/myjobs', auth, async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/analytics', auth, async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments({ postedBy: req.user.id });
        const jobsByMonth = await Job.aggregate([
            {
                $match: { postedBy: req.user.id }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
        
        res.json({ totalJobs, jobsByMonth });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
