import * as express from 'express';

import DB from './db';

const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `${req.protocol}://ndragunow.nz`); // TODO: Move to a config file.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/tramps', async (req, res) => {
    try {
        let skills = await DB.Tramps.getTramps();
        res.json(skills);
    } catch (e) {
        console.log(e); // Don't send the error to the client, just log it - it might have a password in it or something!
        res.sendStatus(500);
    }
});

router.get('/api/tramps/delete', async (req, res) => {
    try {
        let skills = await DB.Tramps.deleteTramps();
        res.json(skills);
    } catch (e) {
        console.log(e); // Don't send the error to the client, just log it - it might have a password in it or something!
        res.sendStatus(500);
    }
});

export default router;