
const tickets = require('./tickets');
const users = require('./users');
const comments = require('./comments');
const posts = require('./posts');
const photos = require('./photos');

module.exports = () => ({
  tickets,
  users,
  comments,
  posts,
  photos,
})