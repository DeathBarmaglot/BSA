const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    get(req, res, next) {
        try {
            const users = UserRepository.getAll();
            res.data = users;
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            const id = req.params.id;
            const user = UserRepository.getOne((item)=>{ return (item.id === id) });
            if (user) res.data = user
            else res.data = { error:true, message: "No such user ...", status: 404 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete (req, res, next) {
        try {
            const id = req.params.id;
            let user = UserRepository.getOne((item)=>{ return (item.id === id) });
            if (!user) {
                res.data = { error: true, message: "No such user found !", status: 404 };
                next();                
            }
            user = UserRepository.delete(id);
            res.data = user;
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            if (!res.data.error) {
                const newUser = UserRepository.create(req.body);
                res.data = newUser;
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
                const id = res.data.data;
                const updUser = UserRepository.update(id, req.body);
                res.data = updUser;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }
}

module.exports = new UserService();