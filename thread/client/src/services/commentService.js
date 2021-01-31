import callWebApi from 'src/helpers/webApiHelper';

export const addComment = async request => {
const response = await callWebApi({
endpoint: '/api/comments',
type: 'POST',
request});
return response.json();};

export const getComment = async id => {
const response = await callWebApi({
endpoint: `/api/comments/${id}`, 
type: 'GET'});
return response.json();};

export const upComment = async request => {
const response = await callWebApi({
endpoint: '/api/comments',
type: 'PUT',
request});
return response.json();};

export const delComment = async request => {
const response = await callWebApi({
endpoint: '/api/comments',
type: 'DELETE',
request});
return response.json();};

export const like = async commentId => {
const response = await callWebApi({
endpoint: '/api/comments/react',
type: 'PUT',
request: {commentId,
isLike: true}});
return response.json();};

export const dislike = async commentId => {
const response = await callWebApi({
endpoint: '/api/comments/react',
type: 'PUT',
request: {commentId,
isLike: false}});
return response.json();};

export const getReact = async commentId => {
const response = await callWebApi({
endpoint: '/api/comments/react',
type: 'POST',
request: { commentId }});
return response.json();};