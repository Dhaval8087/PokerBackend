const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');
const GameScore = require('../models/gamescore');
/* GET ALL INVENTORY */
router.get('/', function (req, res, next) {
    Inventory.find(function (err, cards) {
        if (err) return next(err);
        const shuffledCards = shuffle(cards)
        shuffledCards.forEach((c, i) => {
           c.index = i;
        })
        return res.json(cards)
    });
});
router.get('/highscore', (req, res, next) => {
    Inventory.find((err, cards) => {
        return res.send("40");
    })
});
router.post('/score/add', (req, res, next) => {
    const totalScore = req.body.details.map(p=>p.score).reduce((prev, next) => prev + next);
    const gamescore = new GameScore({
        totalscore: totalScore,
        iteration: req.body.iteration,
        details:req.body.details
    });
    gamescore.save((err, results) => {
        if (err) return next(err);
        return res.json(results._id);
    });
});
router.get('/score/get',(req,res,next)=>{
    GameScore.find(function (err, scores) {
        if (err) return next(err);
        return res.json(scores)
    });
});

/* Private function */
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
module.exports = router;