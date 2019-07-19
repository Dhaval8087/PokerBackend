const express = require('express');
const router = express.Router();
const Cards = require('../models/cards');
const GameScore = require('../models/gamescore');
/* GET ALL CARDS */
router.get('/', function (req, res, next) {
    Cards.find(function (err, cards) {
        if (err) return next(err);
        const shuffledCards = shuffleDeck(cards,getRandomInt(10, 25));
        shuffledCards.forEach((c, i) => {
            c.index = i;
        })
        return res.json(cards)
    });
});

/* ADD SCORE */
router.post('/score/add', (req, res, next) => {
    const totalScore = req.body.details.map(p => p.score).reduce((prev, next) => prev + next);

    const gamescore = new GameScore({
        totalscore: totalScore,
        iteration: req.body.iteration,
        details: req.body.details
    });
    gamescore.save((err, results) => {
        if (err) return next(err);
        return res.json(results._id);
    });
});
/* GET SCORE */
router.get('/score/get', (req, res, next) => {
    GameScore.find(function (err, scores) {
        if (err) return next(err);
        return res.json(scores)
    });
});

/* Private function */
function shuffleDeck(cards,shuffleCnt) {
    for(var i = 0; i < shuffleCnt; i++) {
        var rndNo = getRandomInt(0, 51);
        var card = cards[i];
        cards[i] = cards[rndNo];
        cards[rndNo] = card;
    }
    return cards;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = router;