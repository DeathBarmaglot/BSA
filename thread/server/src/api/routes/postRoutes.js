import { Router } from 'express';
import * as postService from '../services/postService';
import { getUserById } from '../services/userService';
import { sendEmailLikePost, sendEmailLinkPost } from '../services/emailService';

const router = Router();

router
.get('/', (req, res, next) => postService.getPosts(req.query)
.then(posts => res.send(posts))
.catch(next))
.get('/:id', (req, res, next) => postService.getPostById(req.params.id)
.then(post => res.send(post))
.catch(next))
.post('/', (req, res, next) => postService.create(req.user.id, req.body)
.then(post => {
req.io.emit('new_post', post); // notify all users that a new post was created
return res.send(post);
})
.catch(next))
.put('/', (req, res, next) => postService.update(req.user.id, req.body)
.then(post => {
req.io.emit('update_post', post); // notify all users that the post was updated
return res.send(post);
})
.catch(next))
.delete('/', (req, res, next) => postService.del(req.user.id, req.body.id)
.then(() => {
req.io.emit('delete_post', req.body); // notify all users that the post was deleted
return res.send(req.body);})
.catch(next))
.put('/react', (req, res, next) => postService.setReaction(req.user.id, req.body)
.then(reaction => {
if (reaction.post && (reaction.post.userId !== req.user.id)) {

if (reaction.isLike) {req.io.to(reaction.post.userId).emit('like_post', reaction);
const link = `${req.protocol}://${req.get('host')}/share/${req.body.postId}`;
getUserById(reaction.post.userId)
.then(user => {sendEmailLikePost(user.email, user.username, link);
});} else {req.io.to(reaction.post.userId).emit('dislike_post', reaction);}}
req.io.emit('update_likes_post', { userId: req.user.id, postId: req.body.postId });
return res.send(reaction);})
.catch(next))
.post('/react', (req, res, next) => postService.getPostReactions(req.body)
.then(reactions => res.send(reactions))
.catch(next))
.post('/shared', (req, res, next) => sendEmailLinkPost(
req.body.email,
req.user.username,
req.body.link)
.then(() => {
req.io.to(req.user.id).emit('send_link', true);})
.catch(error => {
req.io.to(req.user.id).emit('send_link', false);
next(error);}));

export default router;