import express from 'express';
import getNumber from '../core/getNumber';

const router = express.Router();

const roughScale = (x, base) => {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
}

router.post('/start', (_, res) => {
    getNumber(true)
    res.json({ msg: 'The game has started.' })
})
  

router.get('/guess', (req, res) => {
    const number = getNumber();
    const guessed = roughScale(req.query.number, 10);
    if (!guessed || guessed < 1 || guessed > 100){
        res.status(406).send({ msg: 'Not a legal number.'})
    }
    else if (number === guessed){
        res.send({ msg: 'Equal'});
    }
    else if (number > guessed){
        res.send({ msg: 'Bigger'});
    }
    else{
        res.send({ msg: 'Smaller'});
    }
})

router.post('/restart', (_, res) => {
    getNumber(true);
    res.json({ msg: 'The game will be restarted.'})
})

export default router;