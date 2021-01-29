const { Router } = require('express');
// const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { UserRepository } = require('../repositories/userRepository');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        const user = UserRepository.getOne((item)=>{ return (item.email === req.body.email) });      
        if ((user)&&(user.password === req.body.password)) {
            res.data = user;
        } else {
            res.data = {
                error: true,
                message: "\n Incorrect password or email !",
                status: 400
            }
        }
    } catch (err) {
        res.data = {
            error: true,
            message: "Error while login ...",
            status: 404
        }
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;