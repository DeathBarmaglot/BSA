const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    // OPTIONAL TODO: Implement methods to work with fights

    get(req, res, next) {
        try {
            const fights = FightRepository.getAll();
            res.data = fights;
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            const id = req.params.id;
            const fight = FightRepository.getOne((item)=>{ return (item.id === id) });
            if (fight) res.data = fight
            else res.data = { error:true, message: "No such fight ...", status: 404 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete(req, res, next) {
        try {
            const id = req.params.id;
            let fight = FightRepository.getOne((item)=>{ return (item.id === id) });
            if (!fight) {
                res.data = { error: true, message: "No such fight ...", status: 404 };
                next();                
            } 
            fight = FightRepository.delete(id);
            res.data = fight;
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            if (!res.data.error) {
                const newFight = FightRepository.create(req.body);
                res.data = newFight;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

    put(req, res, next) {
        try {
            if (!res.data.error) {
                const id = req.params.id;
                const updFight = FightRepository.update(id, req.body);
                res.data = updFight;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

}

module.exports = new FightersService();