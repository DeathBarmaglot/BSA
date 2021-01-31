import callWebApi from 'src/helpers/webApiHelper';

export const getAllPosts = async filter => {
const response = await callWebApi({
endpoint: '/api/posts',
type: 'GET',
query: filter});
return response.json();};

export const addPost = async request => {
const response = await callWebApi({
endpoint: '/api/posts',
type: 'POST',
request});
return response.json();};


export const getPost = async id => {
const response = await callWebApi({
endpoint: `/api/posts/${id}`,
type: 'GET'});
const post = await response.json();
const comments = post.comments.map(comment => {
const likeCount = comment.commentReactions.filter(react => react.isLike).length;
const dislikeCount = comment.commentReactions.length - likeCount;
return {...comment,likeCount,dislikeCount};});
return {...post,comments};};

export const updatePost = async request => {
const response = await callWebApi({
endpoint: '/api/posts',
type: 'PUT',
request});
return response.json();};

export const deletePost = async request => {
const response = await callWebApi({
endpoint: '/api/posts',
type: 'DELETE',
request});
return response.json();};

export const likePost = async postId => {
const response = await callWebApi({
endpoint: '/api/posts/react',
type: 'PUT',
request: {
postId,
isLike: true}});
return response.json();};

export const dislikePost = async postId => {
const response = await callWebApi({
endpoint: '/api/posts/react',
type: 'PUT',
request: {
postId,
isLike: false}});
return response.json();};

export const getReact = async postId => {
const response = await callWebApi({
endpoint: '/api/posts/react',
type: 'POST',
request: { postId }});
return response.json();};

export const sharePost = async request => {
const response = await callWebApi({
endpoint: '/api/posts/shared',
type: 'POST',
request});
return response.json();};

export const getPostByHash = async hash => getPost(hash);