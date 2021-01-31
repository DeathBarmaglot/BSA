import postRepository from '../../data/repositories/postRepository';
import postReactionRepository from '../../data/repositories/postReactionRepository';

export const getPosts = filter => postRepository.getPosts(filter);

export const getPostById = id => postRepository.getPostById(id);

export const create = (userId, post) => postRepository.create({
  ...post,
  userId
});

export const update = (userId, post) => postRepository.updateById(post.postID, {
  ...post,
  userId
});

export const del = (userId, postID) => postRepository.deleteById(postID);

export const setReaction = async (userId, { postId, isLike = true }) => {
    const updateOrDelete = react => (react.isLike === isLike
    ? postReactionRepository.deleteById(react.id)
    : postReactionRepository.updateById(react.id, { isLike }));

  const reaction = await postReactionRepository.getPostReaction(userId, postId);

  const result = reaction
    ? await updateOrDelete(reaction)
    : await postReactionRepository.create({ userId, postId, isLike });

  
  return Number.isInteger(result) ? {} : postReactionRepository.getPostReaction(userId, postId);
};

export const getPostReactions = filter => postReactionRepository.getPostReactions(filter);
