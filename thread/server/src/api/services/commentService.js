import commentRepository from '../../data/repositories/commentRepository';
import commentReactionRepository from '../../data/repositories/commentReactionRepository';

export const create = (userId, comment) => commentRepository.create({
...comment,
userId});

export const getCommentById = id => commentRepository.getCommentById(id);

export const update = (userId, comment) => commentRepository.updateById(comment.commentId, {
...comment,
userId});

export const del = (userId, commentId) => commentRepository.deleteById(commentId);

export const setReaction = async (userId, { commentId, isLike = true }) => {
const updateOrDelete = react => (react.isLike === isLike
? commentReactionRepository.deleteById(react.id)
: commentReactionRepository.updateById(react.id, { isLike }));

const reaction = await commentReactionRepository.getCommentReaction(userId, commentId);

const result = reaction
? await updateOrDelete(reaction)
: await commentReactionRepository.create({ userId, commentId, isLike });

return Number.isInteger(result) ? {} : commentReactionRepository.getCommentReaction(userId, commentId);};

export const getCommentReactions = filter => commentReactionRepository.getCommentReactions(filter);
