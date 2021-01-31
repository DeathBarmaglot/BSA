import { Router } from 'express';
import * as commentService from '../services/commentService';

const router = Router();

router
.get('/:id', (req, res, next) => commentService.getCommentById(req.params.id)
.then(comment => res.send(comment))
.catch(next))
.post('/', (req, res, next) => commentService.create(req.user.id, req.body)
.then(comment => {
req.io.emit('new_comment', comment);
return res.send(comment);})
.catch(next))
.put('/', (req, res, next) => commentService.update(req.user.id, req.body)
.then(comment => {
req.io.emit('update_comment', comment); // notify all users that the comment was updated
return res.send(comment);})
.catch(next))
.delete('/', (req, res, next) => commentService.del(req.user.id, req.body.id)
.then(() => {
req.io.emit('delete_comment', req.body); // notify all users that the comment was deleted
return res.send(req.body);})
.catch(next))
.put('/react', (req, res, next) => commentService.setReaction(req.user.id, req.body)
.then(reaction => {
if (reaction.comment && (reaction.comment.userId !== req.user.id)) {
if (reaction.isLike) {
req.io.to(reaction.comment.userId).emit('like_comment', reaction);} else {
req.io.to(reaction.comment.userId).emit('dislike_comment', reaction);}}
req.io.emit('update_likes_comment', { userId: req.user.id, commentId: req.body.commentId });
return res.send(reaction);})
.catch(next))
.post('/react', (req, res, next) => commentService.getCommentReactions(req.body)
.then(reactions => res.send(reactions))
.catch(next));

export default router;
