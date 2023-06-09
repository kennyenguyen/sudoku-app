const knex = require('./../db');

// Get all scores
exports.getAllScores = async (req, res) => {
    knex.select('*')
        .from('scores')
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving all scores: ${err}` });
        });
};

// Create new score
exports.createScore = async (req, res) => {
    knex('scores')
        .insert({
            'username': req.body.username,
            'time': req.body.time,
            'difficulty': req.body.difficulty
        })
        .then(() => {
            res.json({ message: `Score '${req.body.username} ${req.body.time} ${req.body.difficulty}' created.` });
        })
        .catch(err => {
            res.json({ message: `There was an error creating score: ${err}` });
        });
};

// Delete score by ID
exports.deleteScore = async (req, res) => {
    knex('scores')
        .where('score_id', req.body.score_id)
        .del()
        .then(() => {
            res.json({ message: `Score ${req.body.score_id} deleted.` });
        })
        .catch(err => {
            res.json({ message: `There was an error deleting score: ${err}` });
        });
};

// Delete all scores
exports.deleteAllScores = async (req, res) => {
    knex.select('*')
        .from('scores')
        .truncate()
        .then(() => {
            res.json({ message: 'Scores list cleared.' });
        })
        .catch(err => {
            res.json({ message: `There was an error deleting scores list: ${err}.` });
        });
};

// Unused functions but should work ===========================================

// // Get all easy scores
// exports.getEasyScores = async (req, res) => {
//     knex.select('*')
//         .from('scores')
//         .where('difficulty', 'Easy')
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: `There was an error retrieving all easy scores: ${err}` });
//         });
// };

// // Get all medium scores
// exports.getMediumScores = async (req, res) => {
//     knex.select('*')
//         .from('scores')
//         .where('difficulty', 'Medium')
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: `There was an error retrieving all medium scores: ${err}` });
//         });
// };

// // Get all hard scores
// exports.getHardScores = async (req, res) => {
//     knex.select('*')
//         .from('scores')
//         .where('difficulty', 'Hard')
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: `There was an error retrieving all hard scores: ${err}` });
//         });
// };
