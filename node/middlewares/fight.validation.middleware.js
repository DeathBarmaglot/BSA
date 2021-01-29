const { fight } = require('../models/fight');
const { testFieldsList } = require('./helper/fieldListHelper');
const { UserRepository } = require('../repositories/userRepository');
const { FighterRepository } = require('../repositories/fighterRepository');

const testUserValid = (userId) => {
    let errText = "";
    const user = UserRepository.getOne((item)=>{ return (item.id === userId) });
    if (!user) errText += "Gamer not found ... ";
    return errText;
}

const testFightersValid = (fighter1, fighter2) => {
    let errText = "";
    let fighter = FighterRepository.getOne((item)=>{ return (item.id === fighter1) });
    if (!fighter) errText += "First fighter not found";
    fighter = FighterRepository.getOne((item)=>{ return (item.id === fighter2) });
    if (!fighter) {
        if (errText !== "") errText += "\n";
        errText += "Second fighter not found";
    }
    return errText;
}

const createFightValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        if (req.body) {
            let errText= testFieldsList(fight, req.body);
            if (errText !== "") {
                res.data = { error: true, message:errText, status:400 };
                next();
            }
            errText= testUserValid(req.body.log[0]);
            if (errText !== "") {
                res.data = { error: true, message:errText, status:404 };
                next();
            }
            errText = testFightersValid(req.body.fighter1, req.body.fighter2);
            if (errText !== "") {
                res.data = { error: true, message:errText, status:404 };
                next();
            }
            res.data = { error: false, data: "", status: 200 };
        } else res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }
}

const updateFightValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        let id = req.params.id;
        if (req.body) {
            let errText= testFieldsList(fight, req.body);
            if (errText !== "") {
                res.data = { error: true, message:errText, status:400 };
                next();
            }
            errText= testUserValid(req.body.log[0]);
            if (errText !== "") {
                res.data = { error: true, message:errText, status:404 };
                next();
            }
            errText= testFightersValid(req.body.fighter1, req.body.fighter2);
            if (errText !== "") {
                res.data = { error: true, message:errText, status:404 };
                next();
            }
            res.data = { error: false, data: id, status: 200 };
        } else res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }

}

exports.createFightValid = createFightValid;
exports.updateFightValid = updateFightValid;