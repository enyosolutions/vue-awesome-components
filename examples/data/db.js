
const tickets = require('./tickets');
const users = require('./users');
const comments = require('./comments');
const posts = require('./posts');
const photos = require('./photos');
const pictureItItems = require('./pictureItItems');

module.exports = () => ({
  tickets,
  users,
  comments,
  posts,
  photos,
  pictureItItems
})