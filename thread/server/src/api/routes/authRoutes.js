import { Router } from 'express';
import * as authService from '../services/authService';
import * as userService from '../services/userService';
import { sendEmailResetPassword } from '../services/emailService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

router
  .post('/login', authenticationMiddleware, (req, res, next) => authService.login(req.user)
    .then(data => res.send(data))
    .catch(next))
  .post('/register', registrationMiddleware, (req, res, next) => authService.register(req.user)
    .then(data => res.send(data))
    .catch(next))
  .get('/user', jwtMiddleware, (req, res, next) => userService.getUserById(req.user.id)
    .then(data => res.send(data))
    .catch(next))
  .put('/user', jwtMiddleware, (req, res, next) => userService.updateUser(req.user.id, req.body)
    .then(data => res.send(data))
    .catch(next))
  .post('/user/', jwtMiddleware, (req, res, next) => userService.getUserByName(req.body.username)
    .then(data => res.send(data))
    .catch(next))
  .post('/reset', (req, res, next) => userService.getUserByEmail(req.body.email)
    .then(user => {
      sendEmailResetPassword(user, req);
      res.send(req.body);
    })
    .catch(next))
  .put('/reset', (req, res, next) => userService.updatePassword(req.body)
    .then(user => {
      res.send(user);
    })
    .catch(next));

export default router;