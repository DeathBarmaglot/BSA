import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import {
ADD_POST,
DELETE_POST,
UPDATE_POST,
LOAD_MORE_POSTS,
SET_ALL_POSTS,
SET_EXPANDED_POST
} from './actionTypes';

const setPostsAction = posts => ({
type: SET_ALL_POSTS,
posts
});

const addMorePostsAction = posts => ({
type: LOAD_MORE_POSTS,
posts
});

const addPostAction = post => ({
type: ADD_POST,
post
});

const deletePostAction = post => ({
type: DELETE_POST,
post
});

const updatePostAction = post => ({
type: UPDATE_POST,
post
});

const setExpandedPostAction = post => ({
type: SET_EXPANDED_POST,
post
});

export const loadPosts = filter => async dispatch => {
const posts = await postService.getAllPosts(filter);
dispatch(setPostsAction(posts));
};

export const loadMorePosts = filter => async (dispatch, getRootState) => {
const { posts: { posts } } = getRootState();
const loadedPosts = await postService.getAllPosts(filter);
const filteredPosts = loadedPosts
.filter(post => !(posts && posts.some(loadedPost => post.id === loadedPost.id)));
dispatch(addMorePostsAction(filteredPosts));
};

export const applyPost = postId => async dispatch => {
const post = await postService.getPost(postId);
dispatch(addPostAction(post));
};


export const updatePost = post => async dispatch => {
const {id} = await postService.updatePost(post);
const updatedPost = await postService.getPost(Id);
dispatch(updatePostAction(updatedPost));
};

export const addPost = post => async dispatch => {
const { id } = await postService.addPost(post);
const newPost = await postService.getPost(id);
dispatch(addPostAction(newPost));
};

export const toggleExpandedPost = postId => async dispatch => {
const post = postId ? await postService.getPost(postId) : undefined;
dispatch(setExpandedPostAction(post));
};

export const likePost = postId => async (dispatch, getRootState) => {
const { id } = await postService.likePost(postId);
const diff = id ? 1 : -1; 
const mapLikes = post => ({...post,likeCount: Number(post.likeCount) + diff });
const updated = posts.map(post => (post.id !== postId ? post : mapLikes(post)));
dispatch(setPostsAction(updated));
if (expandedPost && expandedPost.id === postId) {
dispatch(setExpandedPostAction(mapLikes(expandedPost)));}};

export const dislikePost = postId => async (dispatch, getRootState) => {
const { id } = await postService.dislikePost(postId);
const diff = id ? 1 : -1; 
const mapdisLikes = post => ({...post,
dislikeCount: Number(post.dislikeCount) + diff });
const { posts: { posts, expandedPost } } = getRootState();
const updated = posts.map(post => (post.id !== postId ? post : mapdisLikes(post)));
dispatch(setPostsAction(updated));
if (expandedPost && expandedPost.id === postId) {
dispatch(setExpandedPostAction(mapdisLikes(expandedPost)));}};

export const deletePost = postId => async (dispatch) => {
const post = await postService.deletePost(postId);
dispatch(deletePostAction(post));};

export const addComment = request => async (dispatch, getRootState) => {
const { id } = await commentService.addComment(request);
const comment = await commentService.getComment(id);

const mapComments = post => ({...post,
commentCount: Number(post.commentCount) + 1,
comments: [...(post.comments || []), comment] });

const { posts: { posts, expandedPost } } = getRootState();
const updated = posts.map(post => (
post.id !== comment.postId ? post : mapComments(post)));

dispatch(setPostsAction(updated));

if (expandedPost && expandedPost.id === comment.postId) {
dispatch(setExpandedPostAction(mapComments(expandedPost)));
}};
