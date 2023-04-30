const express = require('express');
const scoresRoutes = require('./../controllers/scores-controller.js');

const router = express.Router();

// GET request '/scores/all'
router.get('/all', scoresRoutes.getAllScores);

// POST request '/scores/create'
router.post('/create', scoresRoutes.createScore);

// PUT request '/scores/delete'
router.put('/delete', scoresRoutes.deleteScore);

// PUT request '/scores/reset'
router.put('/reset', scoresRoutes.deleteAllScores);

module.exports = router;

// Unused routes ==============================================================

// // GET request '/scores/easy'
// router.get('/easy', scoresRoutes.getEasyScores);

// // GET request '/scores/medium'
// router.get('/medium', scoresRoutes.getMediumScores);

// // GET request '/scores/hard'
// router.get('/hard', scoresRoutes.getHardScores);
